const { chromium } = require('playwright')

;(async () => {
    const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
    const checks = []
    for (const viewport of [
        { name: 'desktop', width: 1440, height: 900 },
        { name: 'mobile', width: 390, height: 844 },
    ]) {
        const page = await browser.newPage({ viewport })
        await page.goto('http://127.0.0.1:4323/', { waitUntil: 'networkidle' })
        const result = await page.evaluate(() => {
            const cta = document.querySelector('.thinking-cta')
            const rect = cta?.getBoundingClientRect()
            const thinking = document.querySelector('.thinking')
            return {
                closingSections: document.querySelectorAll('.closing').length,
                ctaCount: document.querySelectorAll('.thinking-cta').length,
                ctaHref: cta?.getAttribute('href'),
                ctaInsideThinking: Boolean(cta && thinking?.contains(cta)),
                ctaWidth: rect?.width,
                ctaHeight: rect?.height,
                documentOverflow:
                    document.documentElement.scrollWidth -
                    document.documentElement.clientWidth,
            }
        })
        await page.locator('.thinking').screenshot({
            path: `.impeccable/mobile-audit/cta-relocated-${viewport.name}.jpg`,
            type: 'jpeg',
            quality: 52,
        })
        checks.push({ viewport, ...result })
        await page.close()
    }
    await browser.close()
    console.log(JSON.stringify(checks, null, 2))
})().catch(error => {
    console.error(error)
    process.exit(1)
})
