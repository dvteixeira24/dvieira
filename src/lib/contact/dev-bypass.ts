import type { Env } from '../../worker'

export function shouldBypassDevContactGuards(
    runtimeEnv: Partial<Pick<Env, 'CONTACT_ALLOW_DEV_CAPTCHA_BYPASS'>>,
    isDev: boolean,
): boolean {
    return isDev && runtimeEnv.CONTACT_ALLOW_DEV_CAPTCHA_BYPASS === 'true'
}
