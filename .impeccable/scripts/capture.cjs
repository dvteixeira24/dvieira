const { chromium } = require('playwright')

async function capture() {
    const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
    const page = await browser.newPage({
        viewport: { width: 1586, height: 992 },
        deviceScaleFactor: 1,
    })
    await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.screenshot({
        path: 'C:/Users/daniel/Code/ResumeBuild/dvieira/.impeccable/review/hero-repro.png',
        fullPage: false,
    })
    await browser.close()
}

capture().catch(error => {
    console.error(error)
    process.exit(1)
})
