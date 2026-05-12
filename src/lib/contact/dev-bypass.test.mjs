import assert from 'node:assert/strict'
import test from 'node:test'
import { shouldBypassDevContactGuards } from './dev-bypass.ts'

test('bypasses contact guards only in dev when explicitly enabled', () => {
    assert.equal(
        shouldBypassDevContactGuards(
            { CONTACT_ALLOW_DEV_CAPTCHA_BYPASS: 'true' },
            true,
        ),
        true,
    )
    assert.equal(
        shouldBypassDevContactGuards(
            { CONTACT_ALLOW_DEV_CAPTCHA_BYPASS: 'true' },
            false,
        ),
        false,
    )
    assert.equal(
        shouldBypassDevContactGuards(
            { CONTACT_ALLOW_DEV_CAPTCHA_BYPASS: 'false' },
            true,
        ),
        false,
    )
    assert.equal(shouldBypassDevContactGuards({}, true), false)
})
