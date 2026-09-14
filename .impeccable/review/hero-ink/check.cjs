const { chromium } = require('C:/Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const assert = require('node:assert/strict')
const root = 'C:/Users/daniel/Code/ResumeBuild/dvieira/.impeccable/review/hero-ink'
;(async () => {
 const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'})
 const results=[]
 for (const [name,width,height] of [['desktop',1586,992],['mobile',390,844],['narrow',320,740]]) {
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'})
  const errors=[]
  page.on('pageerror',error=>errors.push(error.message))
  await page.addInitScript(()=>{
   window.__draws=0
   const original=WebGLRenderingContext.prototype.drawArrays
   WebGLRenderingContext.prototype.drawArrays=function(...args){window.__draws++;return original.apply(this,args)}
  })
  await page.goto('http://localhost:4323/',{waitUntil:'networkidle'})
  await page.evaluate(()=>document.fonts.ready)
  const states=[]
  for (const mode of ['frontend','backend','qa','reliability']) {
   await page.locator(`button[data-mode="${mode}"]`).click()
   await page.waitForTimeout(150)
   const state=await page.evaluate(()=>({
    mode:document.querySelector('.home').dataset.mode,
    unavailable:document.querySelector('.role-loom').dataset.unavailable,
    glError:document.querySelector('.role-loom canvas').getContext('webgl').getError(),
    overflow:document.documentElement.scrollWidth>innerWidth,
    draws:window.__draws,
    selected:[...document.querySelectorAll('.mode-sequencer button[aria-pressed="true"]')].length,
    paperAnimation:getComputedStyle(document.querySelector('.hero-paper canvas')).animationName,
    selection:getComputedStyle(document.querySelector('.statement')).userSelect
   }))
   assert.equal(state.mode,mode);assert.equal(state.unavailable,undefined);assert.equal(state.glError,0);assert.equal(state.overflow,false);assert.equal(state.selected,1);assert.equal(state.selection,'none')
   await page.waitForTimeout(100)
   assert.equal(await page.evaluate(()=>window.__draws),state.draws,'Reduced motion should not keep drawing')
   if(name!=='narrow') await page.screenshot({path:`${root}/${name}-${mode}.png`})
   states.push(state)
  }
  await page.emulateMedia({reducedMotion:'no-preference'})
  const before=await page.evaluate(()=>window.__draws)
  await page.waitForTimeout(180)
  assert.ok(await page.evaluate(()=>window.__draws)>before,'Animated mode must draw')
  await page.evaluate(()=>scrollTo(0,document.body.scrollHeight))
  await page.waitForTimeout(200)
  const offscreen=await page.evaluate(()=>window.__draws)
  await page.waitForTimeout(180)
  assert.equal(await page.evaluate(()=>window.__draws),offscreen,'Offscreen should not keep drawing')
  await page.locator('nav a[href="/about"]').click()
  await page.waitForURL('**/about')
  await page.locator('nav a[href="/contact"]').click()
  await page.waitForURL('**/contact')
  assert.equal(await page.locator('textarea').evaluate(e=>getComputedStyle(e).userSelect),'text')
  await page.locator('nav a[href="/"]').click()
  await page.waitForURL('http://localhost:4323/')
  await page.waitForTimeout(300)
  assert.equal(await page.locator('.role-loom canvas').count(),1)
  assert.equal(await page.locator('.role-loom').getAttribute('data-unavailable'),null)
  assert.deepEqual(errors,[])
  results.push({name,states,errors,routeRoundTrip:true,offscreenPaused:true})
  await page.close()
 }
 const fallback=await browser.newPage({viewport:{width:390,height:844}})
 await fallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl'?null:original.call(this,type,...args)}})
 await fallback.goto('http://localhost:4323/',{waitUntil:'networkidle'})
 assert.equal(await fallback.locator('.role-loom').getAttribute('data-unavailable'),'true')
 assert.equal(await fallback.locator('.statement').isVisible(),true)
 await fallback.locator('button[data-mode="backend"]').click()
 assert.equal(await fallback.locator('.home').getAttribute('data-mode'),'backend')
 await fallback.close()
 console.log(JSON.stringify({results,noWebGLFallback:true},null,2))
 await browser.close()
})().catch(e=>{console.error(e);process.exit(1)})
