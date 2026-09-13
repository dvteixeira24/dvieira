const { chromium } = require('playwright')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const origin = process.env.ABOUT_PREVIEW_URL || 'http://127.0.0.1:4322'
const output = path.resolve('.impeccable/review/about')
fs.mkdirSync(output, { recursive: true })

async function verify() {
    const browser = await chromium.launch({
        headless: true,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    })
    const results = { redirects: [], layouts: [], anchors: [], navigation: [], errors: [] }
    try {
        const context = await browser.newContext({ reducedMotion: 'reduce' })
        await context.route('https://al.d99.xyz/**', route => route.abort())
        for (const route of ['/biography', '/biography/', '/experience', '/experience/']) {
            const response = await context.request.get(origin + route, { maxRedirects: 0 })
            const location = response.headers().location
            results.redirects.push({ route, status: response.status(), location })
            assert.equal(response.status(), 301)
            assert.equal(new URL(location, origin).pathname, '/about')
        }
        for (const width of [320, 390, 760, 768, 1024, 1440]) {
            const page = await context.newPage()
            page.on('pageerror', error => results.errors.push(error.message))
            await page.setViewportSize({ width, height: width > 760 ? 1000 : 844 })
            const response = await page.goto(origin + '/about', { waitUntil: 'networkidle' })
            assert.equal(response.status(), 200)
            await page.evaluate(() => document.fonts.ready)
            assert.equal(await page.title(), 'About | Daniel Vieira Teixeira')
            assert.equal(await page.locator('h1').count(), 1)
            assert.equal(await page.locator('.story-copy > p').count(), 3)
            assert.equal(await page.locator('.contributions > li').count(), 18)
            assert.deepEqual(await page.locator('.timeline > li').evaluateAll(items => items.map(item => item.id)),
                ['project-06', 'project-05', 'project-04', 'project-03', 'project-02'])
            assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://dvieira.dev/about')
            assert.match(await page.locator('meta[name="description"]').getAttribute('content'), /Defijn/)
            assert.equal(await page.locator('nav [aria-current="page"]').innerText(), 'About')
            const layout = await page.evaluate(() => {
                const visible = el => el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0
                const outliers = [...document.querySelectorAll('main *, .site-rail a')].filter(visible).filter(el => {
                    const r = el.getBoundingClientRect()
                    return r.left < -1 || r.right > innerWidth + 1
                }).map(el => ({ tag: el.tagName, className: el.className, text: el.textContent.trim().slice(0, 55) }))
                const links = [...document.querySelectorAll('.site-rail nav a')].filter(visible).map(el => el.textContent.trim())
                const smallTargets = [...document.querySelectorAll('a')].filter(visible).filter(el => {
                    const r = el.getBoundingClientRect()
                    return r.width < 44 || r.height < 44
                }).map(el => el.textContent.trim())
                return { width: innerWidth, outliers, links, smallTargets, pageHeight: document.body.scrollHeight }
            })
            results.layouts.push(layout)
            assert.deepEqual(layout.outliers, [], `Overflow at ${width}px`)
            assert.deepEqual(layout.smallTargets, [], `Small targets at ${width}px`)
            assert.deepEqual(layout.links, ['Home', 'About', 'Contact'])
            if ([320, 390, 1440].includes(width)) {
                await page.screenshot({ path: path.join(output, `about-${width}.png`), fullPage: true })
                if (width === 1440) await page.screenshot({ path: path.join(output, 'about-desktop-top.png') })
            }
            await page.close()
        }
        const page = await context.newPage()
        await page.setViewportSize({ width: 390, height: 844 })
        for (const [route, hash] of [
            ['/experience', 'project-03'], ['/biography', 'story-title'],
            ['/about', 'experience'], ['/experience/', 'project-06'],
        ]) {
            await page.goto(`${origin}${route}#${hash}`, { waitUntil: 'networkidle' })
            const actual = new URL(page.url())
            assert.equal(actual.pathname, '/about')
            assert.equal(actual.hash, '#' + hash)
            const y = await page.locator('#' + hash).evaluate(el => el.getBoundingClientRect().top)
            results.anchors.push({ route, hash, y })
            assert.ok(y >= 0 && y < 300, `Anchor obscured or missed: ${route}#${hash} at ${y}`)
        }
        await page.goto(origin + '/about/', { waitUntil: 'networkidle' })
        assert.equal(await page.locator('nav [aria-current="page"]').innerText(), 'About')
        await page.goto(origin, { waitUntil: 'networkidle' })
        await page.evaluate(() => { window.__aboutNavigationMarker = true })
        await page.locator('.thinking-link').click()
        await page.waitForURL('**/about#experience')
        await page.waitForLoadState('networkidle')
        assert.equal(await page.evaluate(() => window.__aboutNavigationMarker), true, 'Home link must use client navigation')
        assert.equal(await page.locator('nav [aria-current="page"]').innerText(), 'About')
        const anchorY = await page.locator('#experience').evaluate(el => el.getBoundingClientRect().top)
        assert.ok(anchorY >= 0 && anchorY < 300)
        results.navigation.push('Home → About#experience: client navigation, current state, anchor clearance')
        await page.locator('nav a[href="/contact"]').click()
        await page.waitForURL('**/contact')
        assert.equal(await page.locator('link[rel="canonical"]').count(), 0)
        assert.equal(await page.locator('meta[name="description"]').count(), 0)
        assert.equal(await page.locator('form').count(), 1)
        await page.locator('nav a[href="/about"]').click()
        await page.waitForURL('**/about')
        assert.equal(await page.locator('.timeline > li').count(), 5)
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://dvieira.dev/about')
        results.navigation.push('About → Contact → About: form present and metadata updated')
        await page.goto(origin + '/about')
        await page.keyboard.press('Tab')
        assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('href')), '#experience')
        const focusStyle = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle)
        assert.notEqual(focusStyle, 'none')
        await page.keyboard.press('Enter')
        await page.waitForURL('**/about#experience')
        results.navigation.push('Keyboard: first content action is focusable and activates Experience')
        const normal = await browser.newContext({ viewport: { width: 390, height: 844 } })
        await normal.route('https://al.d99.xyz/**', route => route.abort())
        const normalPage = await normal.newPage()
        await normalPage.goto(origin + '/about', { waitUntil: 'networkidle' })
        assert.equal(await normalPage.locator('main .reveal-unit').count(), 0)
        await normalPage.locator('.experience-link').click()
        await normalPage.waitForFunction(() => Math.abs(document.getElementById('experience').getBoundingClientRect().top - 32) < 2)
        results.navigation.push('Normal motion: content immediately visible and native anchor scroll settles')
        await normal.close()
        const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
        const noJsPage = await noJs.newPage()
        await noJsPage.goto(origin + '/about')
        assert.equal(await noJsPage.locator('.timeline > li').count(), 5)
        assert.ok(await noJsPage.locator('.story-copy').isVisible())
        assert.ok(await noJsPage.locator('.about-cta a').isVisible())
        await noJsPage.locator('.experience-link').click()
        await noJsPage.waitForURL('**/about#experience')
        results.navigation.push('No JavaScript: description, all assignments, contact link, and Experience anchor present')
        await noJs.close()
        assert.deepEqual(results.errors, [])
        results.passed = true
    } finally {
        fs.writeFileSync(path.join(output, 'verification.json'), JSON.stringify(results, null, 2))
        await browser.close()
    }
    console.log(JSON.stringify(results, null, 2))
}

verify().catch(error => { console.error(error); process.exitCode = 1 })
