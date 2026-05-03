const DISPOSABLE_EMAIL_DOMAINS = [
    '10minutemail.com',
    '20minutemail.com',
    'dispostable.com',
    'dropmail.me',
    'emailondeck.com',
    'fakeinbox.com',
    'getairmail.com',
    'getnada.com',
    'guerrillamail.com',
    'maildrop.cc',
    'mailinator.com',
    'mailnesia.com',
    'mohmal.com',
    'sharklasers.com',
    'temp-mail.org',
    'tempail.com',
    'tempmail.com',
    'tempmailo.com',
    'throwawaymail.com',
    'trashmail.com',
    'yopmail.com',
]

const disposableDomainSet = new Set(DISPOSABLE_EMAIL_DOMAINS)

export function isDisposableEmailDomain(email: string): boolean {
    const normalizedEmail = email.trim().toLowerCase()
    const atIndex = normalizedEmail.lastIndexOf('@')
    if (atIndex === -1) {
        return false
    }

    const domain = normalizedEmail.slice(atIndex + 1)
    return disposableDomainSet.has(domain)
}
