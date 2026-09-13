const {chromium}=require('C:/Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
for(const width of [1440,390]){
const page=await browser.newPage({viewport:{width,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://localhost:4332/about',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
await page.locator('.timeline-marker').first().waitFor();
async function scroll(f){await page.evaluate(f=>{const r=document.querySelector('.timeline-marker').getBoundingClientRect();scrollTo(0,scrollY+r.top+r.height/2-innerHeight*f)},f);await page.waitForTimeout(200)}
await scroll(.8);const before=await page.locator('.timeline-marker').first().evaluate(e=>e.getBoundingClientRect().width);
await scroll(.5);const after=await page.locator('.timeline-marker').first().evaluate(e=>e.getBoundingClientRect().width);
const geometry=await page.evaluate(()=>{const entries=[...document.querySelectorAll('.timeline-entry')];return entries.slice(0,-1).map((e,i)=>{const t=e.querySelector('.timeline-track').getBoundingClientRect(),m=e.querySelector('.timeline-marker').getBoundingClientRect(),n=entries[i+1].querySelector('.timeline-marker').getBoundingClientRect();return {start:Math.abs(t.top-(m.top+m.height/2)),end:Math.abs(t.bottom-(n.top+n.height/2))}})});
await page.screenshot({path:'.impeccable/review/about-timeline/'+width+'.png'});
await page.emulateMedia({reducedMotion:'reduce'});const reduced=await page.locator('.timeline-marker').first().evaluate(e=>e.getBoundingClientRect().width);
console.log(JSON.stringify({width,before,after,reduced,geometry,errors}));
if(before>=after || reduced<19 || geometry.some(g=>g.start>1.1||g.end>1.1)||errors.length)throw Error('Timeline check failed');
await page.close();}
await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
