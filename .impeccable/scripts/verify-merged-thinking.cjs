const { chromium } = require('playwright')

;(async () => {
    const browser = await chromium.launch({
        headless: true,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    })
    const checks = []
    for (const viewport of [
        { name: 'desktop', width: 1440, height: 900 },
        { name: 'mobile', width: 390, height: 844 },
    ]) {
        const page = await browser.newPage({ viewport })
        await page.goto('http://127.0.0.1:4324/', { waitUntil: 'networkidle' })
        const thinking = page.locator('.thinking')
        const box = await thinking.boundingBox()
        for (
            let y = Math.max(0, box.y - viewport.height * 0.25);
            y < box.y + box.height;
            y += viewport.height * 0.6
        ) {
            await page.evaluate(scrollY => window.scrollTo(0, scrollY), y)
            await page.waitForTimeout(100)
        }
        await page.evaluate(() => document.querySelector('astro-dev-toolbar')?.remove())
        const result = await page.evaluate(() => {
            const section = document.querySelector('.thinking')
            const actions = [...section.querySelectorAll('a')]
            const textNodes = [...section.querySelectorAll('h2,h3,p,strong,a')]
            return {
                workIndexCount: document.querySelectorAll('.work-index').length,
                thinkingCount: document.querySelectorAll('.thinking').length,
                itemCount: section.querySelectorAll('ol > li').length,
                actions: actions.map(action => {
                    const rect = action.getBoundingClientRect()
                    return {
                        className: action.className,
                        href: action.getAttribute('href'),
                        width: Math.round(rect.width),
                        height: Math.round(rect.height),
                    }
                }),
                clippedText: textNodes
                    .filter(node => node.scrollWidth > node.clientWidth + 2)
                    .map(node => ({
                        tag: node.tagName,
                        text: node.textContent.trim().replace(/\s+/g, ' ').slice(0, 60),
                        scrollWidth: node.scrollWidth,
                        clientWidth: node.clientWidth,
                    })),
                documentOverflow:
                    document.documentElement.scrollWidth -
                    document.documentElement.clientWidth,
            }
        })
        await thinking.screenshot({
            path: `.impeccable/mobile-audit/thinking-merged-${viewport.name}.jpg`,
            type: 'jpeg',
            quality: 45,
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
