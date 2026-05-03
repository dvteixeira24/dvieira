import { handle } from '@astrojs/cloudflare/handler'

type RateLimitPayload = {
    key: string
    limit: number
    windowSec: number
}

type RateLimitState = {
    count: number
    resetAt: number
}

type RateLimitResponse = {
    allowed: boolean
    remaining: number
    retryAfterSec: number
}

export interface Env {
    CONTACT_RATE_LIMITER: {
        idFromName(name: string): unknown
        get(id: unknown): {
            fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
        }
    }
    HCAPTCHA_SECRET: string
    TELEGRAM_BOT_TOKEN: string
    TELEGRAM_CHAT_ID: string
    CONTACT_ALLOW_DEV_CAPTCHA_BYPASS?: string
    PUBLIC_HCAPTCHA_SITE_KEY?: string
}

type DurableObjectStorage = {
    get<T>(key: string): Promise<T | undefined>
    put<T>(key: string, value: T): Promise<void>
}

type DurableObjectState = {
    storage: DurableObjectStorage
}

export class ContactRateLimiterDurableObject {
    private readonly state: DurableObjectState

    constructor(state: DurableObjectState) {
        this.state = state
    }

    async fetch(request: Request): Promise<Response> {
        if (request.method !== 'POST') {
            return new Response('Method Not Allowed', { status: 405 })
        }

        let payload: RateLimitPayload
        try {
            payload = (await request.json()) as RateLimitPayload
        } catch {
            return new Response('Bad Request', { status: 400 })
        }

        const { key, limit, windowSec } = payload
        if (!key || limit <= 0 || windowSec <= 0) {
            return new Response('Bad Request', { status: 400 })
        }

        const now = Date.now()
        const windowMs = windowSec * 1000
        const stateKey = `${key}:${windowSec}`
        const currentState =
            (await this.state.storage.get<RateLimitState>(stateKey)) ?? null

        const state: RateLimitState =
            currentState && now < currentState.resetAt
                ? { ...currentState, count: currentState.count + 1 }
                : { count: 1, resetAt: now + windowMs }

        await this.state.storage.put(stateKey, state)

        const allowed = state.count <= limit
        const remaining = allowed ? limit - state.count : 0
        const retryAfterSec = Math.max(0, Math.ceil((state.resetAt - now) / 1000))

        const responseBody: RateLimitResponse = {
            allowed,
            remaining,
            retryAfterSec,
        }

        return Response.json(responseBody)
    }
}

export default {
    async fetch(request: Request, env: Env, ctx: unknown) {
        return handle(request, env, ctx as never)
    },
}
