const { chromium } = require('playwright')
;(async () => {
    const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
    const context = await browser.newContext({ viewport: { width: 320, height: 900 }, isMobile: true, hasTouch: true })
    const page = await context.newPage()
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('http://127.0.0.1:4321/contact', { waitUntil: 'networkidle' })
    const result = await page.evaluate(() => {
        const info = el => {
            const r = el.getBoundingClientRect()
            const s = getComputedStyle(el)
            return { tag: el.tagName.toLowerCase(), cls: typeof el.className === 'string' ? el.className : '', text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 50), left: r.left, right: r.right, width: r.width, clientWidth: el.clientWidth, scrollWidth: el.scrollWidth, boxSizing: s.boxSizing, overflowX: s.overflowX, transform: s.transform }
        }
        return {
            document: { client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth },
            key: ['body', '.site-rail', '.contact', '.page-hero', '.page-hero h1', '.page-hero h1 em'].map(sel => info(document.querySelector(sel))),
            scrollWide: [...document.querySelectorAll('*')].filter(el => el.scrollWidth > el.clientWidth + 1).map(info).sort((a,b) => (b.scrollWidth-b.clientWidth)-(a.scrollWidth-a.clientWidth)).slice(0,20),
            rightmost: [...document.querySelectorAll('*')].map(info).filter(x => x.left > -1000).sort((a,b) => b.right-a.right).slice(0,20),
        }
    })
    console.log(JSON.stringify(result, null, 2))
    await browser.close()
})().catch(error => { console.error(error); process.exit(1) })
