const { chromium } = require('playwright')
;(async () => {
    const widths = [320, 521, 640, 760, 761, 860]
    const modes = ['frontend', 'backend', 'qa', 'reliability']
    const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
    const results = []
    for (const width of widths) {
        const context = await browser.newContext({ viewport: { width, height: 900 }, isMobile: width <= 760, hasTouch: true })
        const page = await context.newPage()
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' })
        for (const mode of modes) {
            await page.locator('button[data-mode="' + mode + '"]').tap()
            await page.waitForTimeout(30)
            const geometry = await page.evaluate(mode => {
                const lines = [...document.querySelectorAll('.statement-line')].map(el => {
                    const r = el.getBoundingClientRect()
                    return { text: el.textContent.trim(), left: Math.round(r.left * 10) / 10, right: Math.round(r.right * 10) / 10, width: Math.round(r.width * 10) / 10 }
                })
                return { mode, viewport: innerWidth, documentWidth: document.documentElement.scrollWidth, lines, fails: lines.filter(x => x.left < -1 || x.right > innerWidth + 1) }
            }, mode)
            results.push({ width, ...geometry })
        }
        await context.close()
    }
    const failures = results.filter(x => x.fails.length || x.documentWidth > x.viewport + 1)
    console.log(JSON.stringify({ checks: results.length, failures }, null, 2))
    await browser.close()
})().catch(error => { console.error(error); process.exit(1) })
