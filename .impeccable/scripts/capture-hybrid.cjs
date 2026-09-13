const { chromium } = require('playwright')
const root = 'C:/Users/daniel/Code/ResumeBuild/dvieira/.impeccable/review'
const routes = [
    ['home', '/'],
    ['biography', '/biography'],
    ['experience', '/experience'],
    ['contact', '/contact'],
]

async function capture() {
    const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
    for (const [name, path] of routes) {
        const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await page.goto(`http://127.0.0.1:4322${path}`, { waitUntil: 'networkidle' })
        await page.screenshot({ path: `${root}/${name}-desktop.png`, fullPage: true })
        await page.close()
    }
    for (const [name, path] of routes) {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await page.goto(`http://127.0.0.1:4322${path}`, { waitUntil: 'networkidle' })
        await page.screenshot({ path: `${root}/${name}-mobile.png`, fullPage: true })
        await page.close()
    }
    await browser.close()
}

capture().catch(error => { console.error(error); process.exit(1) })
