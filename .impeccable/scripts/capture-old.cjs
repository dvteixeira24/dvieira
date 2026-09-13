const { chromium } = require('playwright')
const routes = [['home','/'],['biography','/biography'],['experience','/experience'],['contact','/contact']]
;(async()=>{
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'})
  for (const [name,path] of routes) {
    const page = await browser.newPage({viewport:{width:1440,height:1000}, deviceScaleFactor:1})
    await page.goto('https://dvieira.dev'+path,{waitUntil:'networkidle',timeout:60000})
    console.log(name, page.url(), await page.title())
    if(name==='home') console.log('styles', JSON.stringify(await page.evaluate(()=>{const b=getComputedStyle(document.body), h=document.querySelector('h1'), a=document.querySelector('a'), hs=h?getComputedStyle(h):null, as=a?getComputedStyle(a):null; return {body:{background:b.backgroundColor,color:b.color,font:b.fontFamily},h1:hs&&{font:hs.fontFamily,size:hs.fontSize,weight:hs.fontWeight,color:hs.color},link:as&&{font:as.fontFamily,color:as.color},text:document.body.innerText.slice(0,1200)}})))
    await page.screenshot({path:`C:/Users/daniel/Code/ResumeBuild/dvieira/.impeccable/review/old-${name}-desktop.png`,fullPage:true})
    await page.close()
  }
  const page = await browser.newPage({viewport:{width:390,height:844}, deviceScaleFactor:1})
  await page.goto('https://dvieira.dev/',{waitUntil:'networkidle',timeout:60000})
  await page.screenshot({path:'C:/Users/daniel/Code/ResumeBuild/dvieira/.impeccable/review/old-home-mobile.png',fullPage:true})
  await browser.close()
})().catch(e=>{console.error(e);process.exit(1)})
