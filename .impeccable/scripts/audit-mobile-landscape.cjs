const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const root = 'C:/Users/daniel/Code/ResumeBuild/dvieira/.impeccable/mobile-audit/landscape'
const routes = [
    { name: 'home', url: '/', sections: ['.hero', '.method-preview', '.thinking'] },
    { name: 'about', url: '/about', sections: ['.about-intro', '.employment', '.assignments', '.about-cta'] },
    { name: 'contact', url: '/contact', sections: ['.page-hero', '.contact-grid'] },
]
const widths = [1024, 1070, 1099, 1100, 1101, 1180, 1181]
const screenshotWidths = new Set([1024, 1100, 1101, 1180, 1181])

function slugSelector(selector) {
    return selector.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')
}

async function inspect(page, route, width) {
    return page.evaluate(({ route, width }) => {
        const visible = el => {
            const style = getComputedStyle(el)
            const rect = el.getBoundingClientRect()
            return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0
        }
        const withinHorizontalScroller = (el, stop) => {
            let node = el.parentElement
            while (node && node !== stop.parentElement) {
                const style = getComputedStyle(node)
                if ((style.overflowX === 'auto' || style.overflowX === 'scroll') && node.scrollWidth > node.clientWidth + 1) return true
                if (node === stop) break
                node = node.parentElement
            }
            return false
        }
        const textSelector = 'h1,h2,h3,p,li,dt,dd,span,strong,em,b,a,button,label'
        const sectionResults = route.sections.map(selector => {
            const section = document.querySelector(selector)
            if (!section) return { selector, missing: true }
            const sr = section.getBoundingClientRect()
            const outliers = [...section.querySelectorAll('*')].filter(visible).map(el => {
                const r = el.getBoundingClientRect()
                return {
                    tag: el.tagName.toLowerCase(),
                    className: typeof el.className === 'string' ? el.className.slice(0, 80) : '',
                    text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 70),
                    left: Math.round(r.left),
                    right: Math.round(r.right),
                    width: Math.round(r.width),
                    scroller: withinHorizontalScroller(el, section),
                }
            }).filter(item => (item.left < -1 || item.right > innerWidth + 1) && !item.scroller)
            const clippedText = [...section.querySelectorAll(textSelector)].filter(visible).map(el => {
                const style = getComputedStyle(el)
                return {
                    tag: el.tagName.toLowerCase(),
                    className: typeof el.className === 'string' ? el.className.slice(0, 80) : '',
                    text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 70),
                    scrollWidth: el.scrollWidth,
                    clientWidth: el.clientWidth,
                    overflowX: style.overflowX,
                }
            }).filter(item => item.scrollWidth > item.clientWidth + 2 && (item.overflowX === 'hidden' || item.overflowX === 'clip'))
            const headings = [...section.querySelectorAll('h1,h2,h3')].filter(visible).map(el => {
                const r = el.getBoundingClientRect()
                const style = getComputedStyle(el)
                const fontSize = parseFloat(style.fontSize)
                const lineHeight = style.lineHeight === 'normal' ? fontSize * 1.2 : parseFloat(style.lineHeight)
                return {
                    tag: el.tagName.toLowerCase(),
                    text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 90),
                    width: Math.round(r.width),
                    height: Math.round(r.height),
                    lines: Math.max(1, Math.round(r.height / lineHeight)),
                    fontSize: Math.round(fontSize * 10) / 10,
                }
            })
            return {
                selector,
                width: Math.round(sr.width),
                height: Math.round(sr.height),
                left: Math.round(sr.left),
                right: Math.round(sr.right),
                scrollWidth: section.scrollWidth,
                clientWidth: section.clientWidth,
                outliers,
                clippedText,
                headings,
            }
        })

        const targets = [...document.querySelectorAll('a,button,input:not([type="hidden"]),textarea,select')].filter(visible).map(el => {
            const r = el.getBoundingClientRect()
            if (r.right <= 0 || r.left >= innerWidth) return null
            return {
                tag: el.tagName.toLowerCase(),
                className: typeof el.className === 'string' ? el.className.slice(0, 80) : '',
                text: (el.getAttribute('aria-label') || el.textContent || el.getAttribute('placeholder') || '').trim().replace(/\s+/g, ' ').slice(0, 70),
                width: Math.round(r.width),
                height: Math.round(r.height),
                areaMin: Math.round(Math.min(r.width, r.height)),
                inNav: Boolean(el.closest('.site-rail nav')),
            }
        }).filter(Boolean)

        const rail = document.querySelector('.site-rail')
        const nav = document.querySelector('.site-rail nav')
        const rr = rail && visible(rail) ? rail.getBoundingClientRect() : null
        const nr = nav && visible(nav) ? nav.getBoundingClientRect() : null
        const bodyStyle = getComputedStyle(document.body)
        return {
            route: route.name,
            width,
            viewport: { width: innerWidth, height: innerHeight },
            document: {
                clientWidth: document.documentElement.clientWidth,
                scrollWidth: document.documentElement.scrollWidth,
                overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
            },
            bodyPaddingBottom: bodyStyle.paddingBottom,
            rail: rr ? { left: Math.round(rr.left), right: Math.round(rr.right), top: Math.round(rr.top), bottom: Math.round(rr.bottom), width: Math.round(rr.width), height: Math.round(rr.height) } : null,
            nav: nr ? { left: Math.round(nr.left), right: Math.round(nr.right), top: Math.round(nr.top), bottom: Math.round(nr.bottom), width: Math.round(nr.width), height: Math.round(nr.height), writingMode: getComputedStyle(nav).writingMode } : null,
            sections: sectionResults,
            targetsUnder24: targets.filter(t => t.areaMin < 24),
            targetsUnder44: targets.filter(t => t.areaMin >= 24 && t.areaMin < 44),
        }
    }, { route, width })
}

async function inspectBottom(page) {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await page.waitForTimeout(50)
    return page.evaluate(() => {
        const nav = document.querySelector('.site-rail nav')
        const nr = nav ? nav.getBoundingClientRect() : null
        const candidates = [...document.querySelectorAll('main a,main button,main input:not([type="hidden"]),main textarea,main [tabindex]')].filter(el => {
            const r = el.getBoundingClientRect()
            const s = getComputedStyle(el)
            return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0
        })
        const last = candidates[candidates.length - 1]
        const lr = last ? last.getBoundingClientRect() : null
        const overlap = nr && lr ? Math.max(0, Math.min(nr.bottom, lr.bottom) - Math.max(nr.top, lr.top)) > 0 && Math.max(0, Math.min(nr.right, lr.right) - Math.max(nr.left, lr.left)) > 0 : false
        return {
            dock: nr ? { top: Math.round(nr.top), bottom: Math.round(nr.bottom) } : null,
            lastTarget: last && lr ? { tag: last.tagName.toLowerCase(), text: (last.textContent || last.getAttribute('placeholder') || '').trim().replace(/\s+/g, ' ').slice(0, 70), top: Math.round(lr.top), bottom: Math.round(lr.bottom) } : null,
            overlap,
        }
    })
}

async function main() {
    fs.mkdirSync(root, { recursive: true })
    const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
    const report = []
    for (const width of widths) {
        for (const route of routes) {
            const context = await browser.newContext({
                viewport: { width, height: 900 },
                deviceScaleFactor: 1,
                isMobile: width <= 760,
                hasTouch: true,
            })
            const page = await context.newPage()
            await page.emulateMedia({ reducedMotion: 'reduce' })
            await page.goto('http://127.0.0.1:4321' + route.url, { waitUntil: 'networkidle' })
            await page.evaluate(() => document.fonts.ready)
            const result = await inspect(page, route, width)
            if (screenshotWidths.has(width)) {
                const file = path.join(root, route.name + '-' + width + '.png')
                await page.screenshot({ path: file, fullPage: true })
                result.screenshot = file
            }
            result.bottom = await inspectBottom(page)
            report.push(result)
            await context.close()
        }
        console.log('completed width', width)
    }
    await browser.close()
    fs.writeFileSync(path.join(root, 'report.json'), JSON.stringify(report, null, 2))

    const issues = []
    for (const item of report) {
        if (item.document.overflow) issues.push({ type: 'page-overflow', route: item.route, width: item.width, detail: item.document })
        for (const section of item.sections) {
            if (section.missing) issues.push({ type: 'missing-section', route: item.route, width: item.width, section: section.selector })
            if (section.outliers && section.outliers.length) issues.push({ type: 'section-outliers', route: item.route, width: item.width, section: section.selector, detail: section.outliers })
            if (section.clippedText && section.clippedText.length) issues.push({ type: 'clipped-text', route: item.route, width: item.width, section: section.selector, detail: section.clippedText })
        }
        if (item.targetsUnder24.length) issues.push({ type: 'target-under-24', route: item.route, width: item.width, detail: item.targetsUnder24 })
        if (item.targetsUnder44.length) issues.push({ type: 'target-under-44', route: item.route, width: item.width, detail: item.targetsUnder44 })
        if (item.bottom.overlap) issues.push({ type: 'dock-overlap', route: item.route, width: item.width, detail: item.bottom })
        if (item.width <= 760 && item.nav && (item.nav.left < 0 || item.nav.right > item.width)) issues.push({ type: 'dock-out-of-bounds', route: item.route, width: item.width, detail: item.nav })
    }
    fs.writeFileSync(path.join(root, 'issues.json'), JSON.stringify(issues, null, 2))
    console.log('report entries', report.length)
    console.log('issue records', issues.length)
    const counts = issues.reduce((acc, issue) => {
        acc[issue.type] = (acc[issue.type] || 0) + 1
        return acc
    }, {})
    console.log(JSON.stringify(counts, null, 2))
}

main().catch(error => {
    console.error(error)
    process.exit(1)
})
