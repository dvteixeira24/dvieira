import { ActionError, defineAction } from 'astro:actions'
import { z } from 'astro/zod'
import { env } from 'cloudflare:workers'
import type { Env } from '../worker'
import { shouldBypassDevContactGuards } from '../lib/contact/dev-bypass'
import { isDisposableEmailDomain } from '../lib/contact/disposable-email-domains'

type RateLimitResult = {
    allowed: boolean
    remaining: number
    retryAfterSec: number
}

const GENERIC_SUBMISSION_ERROR = 'Unable to submit right now. Please try again.'
const HCAPTCHA_VERIFY_URL = 'https://api.hcaptcha.com/siteverify'

const contactFormSchema = z.object({
    email: z.preprocess(
        value => (typeof value === 'string' ? value.trim() : value),
        z.email('Please enter a valid email address.').max(254, 'Email is too long.'),
    ),
    message: z
        .string()
        .trim()
        .min(20, 'Message must be at least 20 characters.')
        .max(2000, 'Message must be 2000 characters or fewer.'),
    website: z
        .string()
        .optional()
        .nullable()
        .transform(value => value?.trim() ?? ''),
    'h-captcha-response': z
        .string()
        .optional()
        .nullable()
        .transform(value => value?.trim() ?? ''),
})

function getClientIp(request: Request): string {
    const cfIp = request.headers.get('CF-Connecting-IP')
    if (cfIp) {
        return cfIp.trim()
    }

    const forwardedFor = request.headers.get('x-forwarded-for')
    if (forwardedFor) {
        return forwardedFor.split(',')[0]?.trim() ?? 'unknown'
    }

    return 'unknown'
}

async function sha256Hex(value: string): Promise<string> {
    const bytes = new TextEncoder().encode(value)
    const digest = await crypto.subtle.digest('SHA-256', bytes)
    return Array.from(new Uint8Array(digest))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('')
}

function maskEmail(email: string): string {
    const [local, domain] = email.split('@')
    if (!local || !domain) {
        return '***'
    }

    const visible = local.slice(0, 2)
    return `${visible}${'*'.repeat(Math.max(1, local.length - 2))}@${domain}`
}

async function enforceRateLimit(
    runtimeEnv: Env,
    key: string,
    limit: number,
    windowSec: number,
): Promise<RateLimitResult> {
    const namespace = runtimeEnv.CONTACT_RATE_LIMITER

    if (!namespace) {
        if (import.meta.env.DEV) {
            console.warn('[contact] CONTACT_RATE_LIMITER binding is missing in dev.')
            return { allowed: true, remaining: limit, retryAfterSec: 0 }
        }

        throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: GENERIC_SUBMISSION_ERROR,
        })
    }

    const id = namespace.idFromName(key)
    const stub = namespace.get(id)
    const response = await stub.fetch('https://contact-rate-limiter/check', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            key,
            limit,
            windowSec,
        }),
    })

    if (!response.ok) {
        throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: GENERIC_SUBMISSION_ERROR,
        })
    }

    return (await response.json()) as RateLimitResult
}

async function verifyHCaptchaToken(
    token: string,
    clientIp: string,
    runtimeEnv: Env,
): Promise<boolean> {
    const params = new URLSearchParams({
        secret: runtimeEnv.HCAPTCHA_SECRET,
        response: token,
    })

    if (clientIp !== 'unknown') {
        params.set('remoteip', clientIp)
    }

    if (runtimeEnv.PUBLIC_HCAPTCHA_SITE_KEY) {
        params.set('sitekey', runtimeEnv.PUBLIC_HCAPTCHA_SITE_KEY)
    }

    const response = await fetch(HCAPTCHA_VERIFY_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
    })

    if (!response.ok) {
        return false
    }

    const body = (await response.json()) as { success?: boolean }
    return body.success === true
}

async function sendToTelegram(
    email: string,
    message: string,
    request: Request,
    runtimeEnv: Env,
): Promise<void> {
    const clientIp = getClientIp(request)
    const userAgent = request.headers.get('user-agent') ?? 'unknown'
    const fingerprint = await sha256Hex(`${clientIp}|${userAgent}`)

    const telegramText = [
        'New contact form submission',
        `Email: ${email}`,
        `Message: ${message}`,
        `Timestamp (UTC): ${new Date().toISOString()}`,
        `Fingerprint: ${fingerprint.slice(0, 16)}`,
    ].join('\n')

    const response = await fetch(
        `https://api.telegram.org/bot${runtimeEnv.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                chat_id: runtimeEnv.TELEGRAM_CHAT_ID,
                text: telegramText,
                disable_web_page_preview: true,
            }),
        },
    )

    if (!response.ok) {
        const maskedEmail = maskEmail(email)
        const messagePreview = `${message.slice(0, 120)}${message.length > 120 ? '...' : ''}`
        console.error('[contact] Telegram delivery failed', {
            status: response.status,
            email: maskedEmail,
            messagePreview,
            fingerprint: fingerprint.slice(0, 16),
        })
    }
}

export const server = {
    contact: {
        submit: defineAction({
            accept: 'form',
            input: contactFormSchema,
            handler: async (input, context) => {
                const runtimeEnv = env as Env

                const normalizedEmail = input.email.toLowerCase()
                const emailDomain = normalizedEmail.split('@')[1] ?? ''

                if (input.website) {
                    throw new ActionError({
                        code: 'BAD_REQUEST',
                        message: GENERIC_SUBMISSION_ERROR,
                    })
                }

                if (isDisposableEmailDomain(normalizedEmail)) {
                    throw new ActionError({
                        code: 'BAD_REQUEST',
                        message: GENERIC_SUBMISSION_ERROR,
                    })
                }

                const clientIp = getClientIp(context.request)
                const ipKey = `contact:ip:${clientIp}`
                const emailKey = `contact:email:${await sha256Hex(normalizedEmail)}`
                const allowDevContactBypass = shouldBypassDevContactGuards(
                    runtimeEnv,
                    import.meta.env.DEV,
                )

                if (!allowDevContactBypass) {
                    const ipLongWindow = await enforceRateLimit(
                        runtimeEnv,
                        ipKey,
                        5,
                        15 * 60,
                    )
                    const ipBurstWindow = await enforceRateLimit(
                        runtimeEnv,
                        `${ipKey}:burst`,
                        2,
                        60,
                    )
                    const emailWindow = await enforceRateLimit(
                        runtimeEnv,
                        `${emailKey}:hour`,
                        3,
                        60 * 60,
                    )

                    if (
                        !ipLongWindow.allowed ||
                        !ipBurstWindow.allowed ||
                        !emailWindow.allowed
                    ) {
                        throw new ActionError({
                            code: 'TOO_MANY_REQUESTS',
                            message: GENERIC_SUBMISSION_ERROR,
                        })
                    }
                }

                if (!allowDevContactBypass) {
                    const captchaToken = input['h-captcha-response']
                    if (!captchaToken || !runtimeEnv.HCAPTCHA_SECRET) {
                        throw new ActionError({
                            code: 'BAD_REQUEST',
                            message: GENERIC_SUBMISSION_ERROR,
                        })
                    }

                    const captchaValid = await verifyHCaptchaToken(
                        captchaToken,
                        clientIp,
                        runtimeEnv,
                    )
                    if (!captchaValid) {
                        throw new ActionError({
                            code: 'BAD_REQUEST',
                            message: GENERIC_SUBMISSION_ERROR,
                        })
                    }
                }

                await sendToTelegram(
                    normalizedEmail,
                    input.message,
                    context.request,
                    runtimeEnv,
                )

                return {
                    success: true,
                    acceptedEmailDomain: emailDomain,
                }
            },
        }),
    },
}
