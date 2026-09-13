const { chromium } = require('playwright')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const output = '.impeccable/review/about-motion'
fs.mkdirSync(output, { recursive: true })
const origin = process.env.ABOUT_PREVIEW_URL || 'http://localhost:4331'

async function main() {
    const browser = await chromium.launch({
        headless: true,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    })
    const results = []
    const errors = []
    try {
        for (const width of [390, 1440]) {
            const context = await browser.newContext({
                viewport: { width, height: 900 },
            })
            await context.route('https://al.d99.xyz/**', route => route.abort())
            const page = await context.newPage()
            page.on('pageerror', error => errors.push(error.message))
            await page.goto(origin + '/about', { waitUntil: 'networkidle' })
            await page.evaluate(() => document.fonts.ready)
            await page.waitForTimeout(800)
            assert.equal(await page.locator('.story-copy p').count(), 3)
            assert.equal(await page.locator('.timeline-entry').count(), 5)
            assert.equal(
                await page
                    .locator('.name-rule')
                    .evaluate(el => getComputedStyle(el).transform),
                'none',
            )
            await page.screenshot({ path: `${output}/intro-${width}.png` })
            await page.evaluate(() => {
                document.documentElement.style.scrollBehavior = 'auto'
                const entry = document.querySelector('.timeline-entry')
                window.scrollTo(
                    0,
                    entry.getBoundingClientRect().top +
                        scrollY +
                        entry.clientHeight / 2 -
                        innerHeight * 0.65,
                )
            })
            await page.waitForTimeout(350)
            const progress = await page
                .locator('.timeline-trace')
                .first()
                .evaluate(el => new DOMMatrix(getComputedStyle(el).transform).d)
            assert.ok(
                progress > 0.4 && progress < 0.6,
                `Timeline should track halfway reading: ${progress}`,
            )
            const marker = await page
                .locator('.assignment')
                .first()
                .evaluate(el => getComputedStyle(el, '::after').transform)
            assert.equal(marker, 'matrix(1, 0, 0, 1, 0, 0)')
            assert.ok(
                await page
                    .locator('.timeline-entry')
                    .last()
                    .evaluate(
                        el =>
                            Number(
                                el.style.getPropertyValue('--marker-progress'),
                            ) === 0,
                    ),
            )
            await page.screenshot({ path: `${output}/timeline-${width}.png` })
            const overflow = await page.evaluate(
                () => document.documentElement.scrollWidth > innerWidth,
            )
            assert.equal(overflow, false)
            await page.evaluate(() => scrollTo(0, 0))
            await page.waitForTimeout(200)
            const reset = await page
                .locator('.timeline-trace')
                .first()
                .evaluate(el => new DOMMatrix(getComputedStyle(el).transform).d)
            assert.equal(reset, 0)
            await page.locator('.experience-link').focus()
            await page.waitForTimeout(250)
            assert.equal(
                await page
                    .locator('.experience-link svg')
                    .evaluate(
                        el => new DOMMatrix(getComputedStyle(el).transform).f,
                    ),
                4,
            )
            await page.keyboard.press('Enter')
            await page.waitForURL('**/about#experience')
            await page.waitForTimeout(500)
            assert.ok(
                await page
                    .locator('#experience')
                    .evaluate(
                        el => Math.abs(el.getBoundingClientRect().top - 32) < 3,
                    ),
            )
            await page.emulateMedia({ reducedMotion: 'reduce' })
            await page.waitForTimeout(250)
            assert.equal(
                await page
                    .locator('.timeline-trace')
                    .first()
                    .evaluate(el => getComputedStyle(el).transform),
                'none',
            )
            assert.equal(
                await page
                    .locator('.experience-link svg')
                    .evaluate(el => getComputedStyle(el).transform),
                'none',
            )
            await page.emulateMedia({ reducedMotion: 'no-preference' })
            await page.waitForTimeout(250)
            await page.evaluate(() => {
                window.__aboutSessionMarker = true
            })
            for (let i = 0; i < 2; i++) {
                await page.locator('nav a[href="/"]').click()
                await page.waitForURL(origin + '/')
                await page.locator('nav a[href="/about"]').click()
                await page.waitForURL('**/about')
                await page.waitForTimeout(250)
                assert.equal(
                    await page.evaluate(() => window.__aboutSessionMarker),
                    true,
                )
                assert.equal(
                    await page
                        .locator('.name-rule')
                        .evaluate(el => getComputedStyle(el).transform),
                    'none',
                )
            }
            await page.goto(origin + '/about#project-03', {
                waitUntil: 'networkidle',
            })
            await page.waitForFunction(
                () =>
                    Math.abs(
                        document
                            .getElementById('project-03')
                            .getBoundingClientRect().top - 32,
                    ) < 3,
            )
            const filled = await page
                .locator('.timeline-trace')
                .first()
                .evaluate(el => new DOMMatrix(getComputedStyle(el).transform).d)
            assert.equal(filled, 1)
            results.push({
                width,
                progress,
                scrollReversal: true,
                keyboard: true,
                liveReducedMotion: true,
                repeatedClientNavigation: true,
                deepLink: true,
                overflow: false,
            })
            await context.close()
        }
        const noJs = await browser.newContext({
            javaScriptEnabled: false,
            viewport: { width: 320, height: 844 },
        })
        const page = await noJs.newPage()
        await page.goto(origin + '/about')
        assert.equal(await page.locator('.contributions li').count(), 18)
        assert.ok(await page.locator('.story-copy').isVisible())
        assert.ok(await page.locator('.about-cta a').isVisible())
        assert.equal(
            await page.evaluate(
                () => document.documentElement.scrollWidth > innerWidth,
            ),
            false,
        )
        await page.locator('.experience-link').click()
        await page.waitForURL('**/about#experience')
        results.push({
            noJavaScript: true,
            width: 320,
            contentAndAnchors: true,
        })
        assert.deepEqual(errors, [])
        fs.writeFileSync(
            `${output}/verification.json`,
            JSON.stringify({ results, errors, passed: true }, null, 2),
        )
        console.log(JSON.stringify({ results, errors, passed: true }, null, 2))
    } finally {
        await browser.close()
    }
}
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
