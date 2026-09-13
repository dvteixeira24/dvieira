const { chromium } = require('C:/Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
 const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page = await browser.newPage({viewport:{width:1440,height:1000}, reducedMotion:'reduce'});
 const errors=[];
 page.on('pageerror', e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4325/',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 const failures=[];
 async function inspect(width,mode){
   const issues=await page.evaluate(()=>{
    const issues=[], box=e=>e.getBoundingClientRect();
    const title=box(document.querySelector('.statement'));
    for(const line of document.querySelectorAll('.statement-line')){
      const l=box(line), r=box(line.querySelector('.width-readout')), w=box(line.querySelector('.statement-word'));
      if(l.right>title.right+1 || w.right>title.right+1) issues.push('word overflow '+line.className);
      if(Math.abs(r.right-l.right)>1 || Math.abs(r.bottom-l.bottom)>1) issues.push('readout detached');
      if(r.left<l.left-1) issues.push('readout extends left');
      if(r.top<w.bottom-1) issues.push('readout overlaps word');
    }
    const visible=[...document.querySelector('.hero').children].filter(e=>box(e).width&&box(e).height);
    for(let i=0;i<visible.length;i++)for(let j=i+1;j<visible.length;j++){
      const a=box(visible[i]),b=box(visible[j]);
      if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>1&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1) issues.push('overlap '+visible[i].className+' / '+visible[j].className);
    }
    for(const b of document.querySelectorAll('.mode-sequencer button')) if(b.scrollWidth>b.clientWidth+1) issues.push('clipped mode');
    return issues;
   });
   if(issues.length) failures.push({width,mode,issues});
 }
 const widths=[320,360,390,520,640,760,761,768,820,860,1024,1100,1200,1201,1280,1440,1800,1920,2560];
 for(const width of widths){
   await page.setViewportSize({width,height:1000});
   for(const mode of ['frontend','backend','qa','reliability']){
     await page.locator('button[data-mode="'+mode+'"]').click();
     await inspect(width,mode);
   }
   if([390,1024,1440].includes(width)) await page.screenshot({fullPage:true,path:'.impeccable/review/hero-'+width+'.png'});
 }
 await page.emulateMedia({reducedMotion:'no-preference'});
 for(const width of [390,761,1201,1440]){
  await page.setViewportSize({width,height:1000});
  for(const mode of ['frontend','backend','qa','reliability']){
   await page.locator('button[data-mode="'+mode+'"]').click();
   for(let i=0;i<5;i++){await page.waitForTimeout(170);await inspect(width,mode+' transition '+i);}
  }
 }
 console.log(JSON.stringify({combinations:widths.length*4,transitionSamples:80,failures,errors},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
