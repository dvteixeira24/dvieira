const { chromium } = require('C:/Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const fs = require('node:fs')
;(async () => {
 const browser = await chromium.launch({headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'})
 const results = []
 for (const width of [1440, 390]) {
  const page = await browser.newPage({viewport: {width, height: 900}})
  const errors=[]
  page.on('pageerror', e => errors.push(e.message))
  await page.addInitScript(() => {
   const original = WebGLRenderingContext.prototype.uniform1f
   WebGLRenderingContext.prototype.uniform1f = function(location, value) {
    window.loomUniformWrites = (window.loomUniformWrites || 0) + 1
    return original.call(this, location, value)
   }
  })
  await page.goto('http://127.0.0.1:4321/', {waitUntil: 'networkidle'})
  for (const mode of ['frontend','backend','qa','reliability']) {
   await page.locator('button[data-mode="'+mode+'"]').click()
   await page.waitForTimeout(1400)
   const state = await page.evaluate(() => {
    const c=document.querySelector('.role-loom canvas'), gl=c.getContext('webgl')
    return {unavailable:c.parentElement.dataset.unavailable || false, glError:gl.getError(), overflow:document.documentElement.scrollWidth > innerWidth, writes:window.loomUniformWrites}
   })
   await page.screenshot({path:'.impeccable/review/hero-motion/'+width+'-'+mode+'.png'})
   results.push({width,mode,...state})
  }
  await page.emulateMedia({reducedMotion:'reduce'})
  await page.waitForTimeout(150)
  const first=await page.locator('.role-loom canvas').screenshot()
  await page.waitForTimeout(300)
  const second=await page.locator('.role-loom canvas').screenshot()
  results.push({width,reducedMotionStatic:first.equals(second),errors})
  await page.close()
 }
 fs.writeFileSync('.impeccable/review/hero-motion/results.json',JSON.stringify(results,null,2))
 console.log(JSON.stringify(results,null,2))
 await browser.close()
})().catch(e => {console.error(e);process.exit(1)})
