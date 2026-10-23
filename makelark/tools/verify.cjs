const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');
const crypto = require('node:crypto');
const os = require('node:os');

// Serve makelark/ with any static server, then run this script with Node.
// Optional configuration: MAKELARK_URL, MAKELARK_PROOF_DIR,
// PLAYWRIGHT_EXECUTABLE_PATH, CODEX_PRIMARY_RUNTIME_NODE_MODULES.
let playwright;
try {
  playwright = require('playwright');
} catch (error) {
  if (!process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES) {
    throw new Error('Playwright is required. Install it for this environment or set CODEX_PRIMARY_RUNTIME_NODE_MODULES.', { cause: error });
  }
  playwright = require(path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, 'playwright'));
}
const { chromium } = playwright;
const source = path.resolve(__dirname, '..');
const output = path.resolve(process.env.MAKELARK_PROOF_DIR || path.join(os.tmpdir(), 'makelark-proof'));
const base = new URL(process.env.MAKELARK_URL || 'http://127.0.0.1:8765/').href;
fs.mkdirSync(output, { recursive: true });
const result = { checkedAt: new Date().toISOString(), testedUrl: base, sourceHashes: {}, viewports: [], checks: [], consoleErrors: [], requests: [] };
let browser;
for (const file of ['index.html', 'styles.css', 'demo.css', 'demo.js', 'script.js']) {
  const bytes = fs.readFileSync(path.join(source, file));
  result.sourceHashes[file] = crypto.createHash('sha256').update(bytes).digest('hex');
}
const check = async (name, fn) => {
  try { const evidence = await fn(); result.checks.push({ name, passed: true, evidence }); }
  catch (error) { result.checks.push({ name, passed: false, error: error.message }); }
};
(async () => {
  browser = await chromium.launch({ ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : {}), headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  result.browser = browser.version();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  page.on('pageerror', error => result.consoleErrors.push(error.message));
  const watchErrors = (watchedPage) => {
    watchedPage.on('response', response => { if (response.status() >= 400) result.requests.push({ url: response.url(), status: response.status() }); });
    watchedPage.on('requestfailed', request => result.requests.push({ url: request.url(), failure: request.failure()?.errorText || 'Unknown request failure' }));
  };
  watchErrors(page);
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  for (const [width, height] of [[1440,1000],[1024,900],[768,1024],[390,844],[320,720]]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => window.scrollTo(0,0));
    await page.screenshot({ path: `${output}/homepage-${width}.png`, fullPage: true });
    await page.screenshot({ path: `${output}/hero-${width}.png` });
    if(width===390) {
      for(const [selector,name] of [['#for-your-business','business-mobile'],['.continuity-section','continuity-mobile'],['#questions','faq-mobile'],['#early-access','access-mobile'],['#access-form','form-mobile']]) {
        await page.locator(selector).evaluate(el=>window.scrollTo(0,window.scrollY+el.getBoundingClientRect().top-20));
        await page.screenshot({path:`${output}/${name}.png`});
      }
      await page.evaluate(()=>window.scrollTo(0,0));
    }
    const info = await page.evaluate(() => ({
      viewport: { width: innerWidth, height: innerHeight },
      bodyWidth: document.body.scrollWidth,
      documentWidth: document.documentElement.scrollWidth,
      pageHeight: document.documentElement.scrollHeight,
      overflowing: [...document.querySelectorAll('main *, header *, footer *')].filter(el => {
        const box = el.getBoundingClientRect(); const s = getComputedStyle(el);
        return s.display !== 'none' && s.visibility !== 'hidden' && box.width > 0 && (box.left < -1 || box.right > innerWidth + 1);
      }).slice(0,20).map(el => ({ tag: el.tagName, id: el.id, class: el.className, text: el.textContent.trim().slice(0,80) })),
      font: getComputedStyle(document.querySelector('h1')).fontFamily,
      fontLoaded: document.fonts.check('800 20px Manrope'),
      badImages: [...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img => img.src),
      primary: [...document.querySelectorAll('h1, .hero-actions, .studio-main-action')].map(el => ({ selector: el.tagName + '.' + el.className, box: el.getBoundingClientRect().toJSON() }))
    }));
    result.viewports.push(info);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await check('demo request -> review -> original/updated -> approve -> reset', async () => {
    assert.deepEqual(await page.evaluate(() => MakeLarkDemo.getState()), {industry:'real-estate',stage:'request',version:'original'});
    const original = await page.locator('#studio-site-heading').innerText();
    await page.locator('#studio-main-action').click();
    assert.equal(await page.locator('#studio-demo').getAttribute('data-stage'),'review');
    const updated = await page.locator('#studio-site-heading').innerText();
    assert.notEqual(original,updated);
    await page.locator('#studio-original').click();
    assert.equal(await page.locator('#studio-site-heading').innerText(),original);
    assert.equal(await page.locator('#studio-main-action').innerText(),'View updated version');
    await page.locator('#studio-main-action').click();
    assert.equal(await page.locator('#studio-demo').getAttribute('data-stage'),'review');
    assert.equal(await page.locator('#studio-site-heading').innerText(),updated);
    await page.locator('#studio-updated').click();
    assert.equal(await page.locator('#studio-site-heading').innerText(),updated);
    await page.locator('#studio-demo').screenshot({ path: `${output}/demo-review-desktop.png` });
    await page.locator('#studio-main-action').click();
    assert.equal(await page.locator('#studio-demo').getAttribute('data-stage'),'approved');
    assert.match(await page.locator('#studio-action-note').innerText(),/Nothing was published/);
    await page.locator('#studio-main-action').click();
    assert.equal(await page.locator('#studio-demo').getAttribute('data-stage'),'request');
    return { original, updated };
  });
  await check('example website detail, Escape and focus restoration', async () => {
    await page.locator('#studio-site-cta').click();
    assert.equal(await page.locator('#studio-detail-panel').isVisible(),true);
    assert.equal(await page.locator('#studio-website').evaluate(el=>el.inert),true);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#studio-detail-panel').isVisible(),false);
    assert.equal(await page.locator('#studio-site-cta').evaluate(el=>el===document.activeElement),true);
  });
  await check('six industry tabs and ARIA keyboard selection', async () => {
    const items=[];
    for(const id of ['automotive','accounting','real-estate','law','manufacturing','restaurant']) {
      await page.locator('#tab-'+id).click();
      assert.equal(await page.locator('#tab-'+id).getAttribute('aria-selected'),'true');
      assert.equal(await page.locator('#business-panel').getAttribute('aria-labelledby'),'tab-'+id);
      assert.match(await page.locator('#business-image').getAttribute('src'),new RegExp(id+'.webp'));
      await page.locator('#business-image').evaluate(img => img.decode());
      items.push({ id, headline: await page.locator('#business-headline').innerText() });
    }
    await page.keyboard.press('ArrowRight'); assert.equal(await page.locator('#tab-automotive').getAttribute('aria-selected'),'true');
    await page.keyboard.press('End'); assert.equal(await page.locator('#tab-restaurant').getAttribute('aria-selected'),'true');
    await page.keyboard.press('Home'); assert.equal(await page.locator('#tab-automotive').getAttribute('aria-selected'),'true');
    await page.keyboard.press('ArrowLeft'); assert.equal(await page.locator('#tab-restaurant').getAttribute('aria-selected'),'true');
    return items;
  });
  await check('each industry opens a relevant, complete Studio example', async () => {
    const scenarios = [
      ['automotive', /fleet/i], ['accounting', /tax.planning/i],
      ['real-estate', /viewing/i], ['law', /consultation/i],
      ['manufacturing', /machining/i], ['restaurant', /dining/i],
    ];
    const evidence = [];
    for (const [id, expectedRequest] of scenarios) {
      await page.locator('#tab-' + id).click();
      await page.locator('#business-image').evaluate(img => img.decode());
      await page.locator('#try-business-example').click();
      assert.equal(await page.locator('#studio-demo').getAttribute('data-industry'), id);
      assert.equal(await page.locator('#studio-demo').getAttribute('data-stage'), 'request');
      assert.equal(await page.locator('#studio-main-action').evaluate(el => el === document.activeElement), true);
      const request = await page.locator('#studio-request-text').innerText();
      assert.match(request, expectedRequest);
      await page.locator('#studio-site-photo').evaluate(img => img.decode());
      const original = await page.locator('#studio-site-heading').innerText();
      await page.locator('#studio-main-action').click();
      assert.equal(await page.locator('#studio-demo').getAttribute('data-stage'), 'review');
      const updated = await page.locator('#studio-site-heading').innerText();
      assert.notEqual(updated, original);
      await page.locator('#studio-main-action').click();
      assert.equal(await page.locator('#studio-demo').getAttribute('data-stage'), 'approved');
      await page.locator('#studio-reset').click();
      assert.equal(await page.locator('#studio-demo').getAttribute('data-stage'), 'request');
      evidence.push({ industry: id, request, original, updated });
    }
    // Return the illustrative workspace to its first-load scenario for mobile evidence.
    await page.locator('#tab-real-estate').click();
    await page.locator('#business-image').evaluate(img => img.decode());
    await page.locator('#try-business-example').click();
    await page.locator('#studio-site-photo').evaluate(img => img.decode());
    return evidence;
  });
  await check('FAQ keyboard open and close', async () => {
    const item=page.locator('.faq-list details').nth(1); const summary=item.locator('summary');
    await summary.focus(); await page.keyboard.press('Enter'); assert.equal(await item.evaluate(el=>el.open),true);
    await page.keyboard.press('Space'); assert.equal(await item.evaluate(el=>el.open),false);
  });
  await check('form rejects empty, invalid email and whitespace name', async () => {
    await page.locator('#access-form button[type=submit]').click(); assert.equal(await page.locator('#request-ready').isVisible(),false);
    await page.locator('#contact-name').fill('QA Example'); await page.locator('#contact-email').fill('invalid-email');
    await page.locator('#access-form button[type=submit]').click(); assert.equal(await page.locator('#request-ready').isVisible(),false);
    assert.equal(await page.locator('#contact-email').evaluate(el=>el.validity.typeMismatch),true);
    await page.locator('#contact-email').fill('qa@example.com'); await page.locator('#contact-name').fill('   ');
    await page.locator('#access-form button[type=submit]').click(); assert.equal(await page.locator('#request-ready').isVisible(),false);
    assert.equal(await page.locator('#contact-name').evaluate(el=>el.validity.customError),true);
  });
  await check('form prepares encoded mailto without sending', async () => {
    await page.locator('#contact-name').fill('QA Example & Team'); await page.locator('#contact-email').fill('qa@example.com');
    await page.locator('#contact-website').fill('https://example.com'); await page.locator('#contact-goal').fill('Add a service & improve contact.');
    await page.locator('#access-form button[type=submit]').click(); assert.equal(await page.locator('#request-ready').isVisible(),true);
    const href=await page.locator('#send-request').getAttribute('href');
    const u=new URL(href);assert.equal(u.protocol,'mailto:');assert.equal(u.pathname,'admin@makelark.com');
    assert.match(u.searchParams.get('body'),/QA Example & Team/);assert.match(u.searchParams.get('body'),/Add a service & improve contact/);
    assert.equal(page.url().includes('mailto:'),false);
    return { protocol:u.protocol,recipient:u.pathname,subject:u.searchParams.get('subject'),noSendClicked:true };
  });
  await check('clipboard rejection exposes selected text fallback', async () => {
    await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('QA denied')}}}));
    await page.locator('#copy-request').click();
    const value=await page.locator('#request-copy-fallback').inputValue();
    assert.match(value,/To: admin@makelark.com/); assert.match(value,/QA Example & Team/);
    assert.equal(await page.locator('#request-copy-fallback').evaluate(el=>el.selectionStart===0&&el.selectionEnd===el.value.length),true);
  });
  await check('prepared request updates clipboard fallback after editing', async () => {
    await page.locator('#contact-name').fill('Changed QA Name');
    assert.equal(await page.locator('#request-ready').isVisible(),false);
    await page.locator('#access-form button[type=submit]').click();
    assert.equal(await page.locator('#request-copy-fallback').count(),0);
    await page.locator('#copy-request').click();
    const current=await page.locator('#request-copy-fallback').inputValue();
    assert.match(current,/Changed QA Name/);
  });
  await check('mobile menu toggle, anchor closure, Escape', async () => {
    await page.setViewportSize({width:390,height:844});await page.evaluate(()=>window.scrollTo(0,0));
    await page.locator('.menu-toggle').click();assert.equal(await page.locator('#mobile-nav').isVisible(),true);
    await page.keyboard.press('Escape');assert.equal(await page.locator('#mobile-nav').isVisible(),false);
    await page.locator('.menu-toggle').click();await page.locator('#mobile-nav a[href="#questions"]').click();
    assert.equal(await page.locator('#mobile-nav').isVisible(),false);assert.match(page.url(),/#questions$/);
  });
  await check('mobile demo request -> compare -> approve', async () => {
    await page.locator('#tab-manufacturing').click();
    await page.locator('#business-image').evaluate(img => img.decode());
    await page.locator('#try-business-example').click();
    assert.equal(await page.locator('#studio-demo').getAttribute('data-industry'), 'manufacturing');
    await page.locator('#studio-main-action').click();
    assert.match(await page.locator('#studio-site-heading').innerText(), /From your drawing/);
    await page.locator('#studio-main-action').click();
    assert.equal(await page.locator('#studio-demo').getAttribute('data-stage'), 'approved');
    await page.locator('#tab-real-estate').click();
    await page.locator('#business-image').evaluate(img => img.decode());
    await page.locator('#try-business-example').click();
    await page.locator('#studio-site-photo').evaluate(img => img.decode());
    await page.locator('#studio-reset').click();await page.locator('#studio-main-action').click();
    await page.locator('#studio-original').click();await page.locator('#studio-updated').click();
    await page.locator('#studio-demo').screenshot({path:`${output}/demo-review-mobile.png`});
    await page.locator('#studio-main-action').click();assert.equal(await page.locator('#studio-demo').getAttribute('data-stage'),'approved');
    await page.locator('#studio-reset').click();
  });
  await check('reduced motion styles suppress motion', async () => {
    const s=await page.evaluate(()=>({scroll:getComputedStyle(document.documentElement).scrollBehavior,transition:getComputedStyle(document.querySelector('.button')).transitionDuration,animation:getComputedStyle(document.querySelector('.studio-change-panel')).animationName}));
    assert.equal(s.scroll,'auto');assert.equal(s.transition,'0s');assert.equal(s.animation,'none');return s;
  });
  const nojs=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false,reducedMotion:'reduce'});
  watchErrors(nojs);
  nojs.on('pageerror', error => result.consoleErrors.push(error.message));
  await nojs.goto(base,{waitUntil:'networkidle'});
  await nojs.screenshot({path:`${output}/nojs-mobile.png`,fullPage:true});
  await check('no-JavaScript primary content and email fallback', async()=>{
    assert.equal(await nojs.locator('h1').isVisible(),true);assert.equal(await nojs.locator('.demo-fallback').isVisible(),true);
    assert.match(await nojs.locator('noscript').innerText(),/admin@makelark.com/);
  });
  await check('no-JavaScript form does not expose entered values in URL', async()=>{
    assert.equal(await nojs.locator('#access-form button[type=submit]').isDisabled(),true);
    await nojs.locator('#contact-name').fill('QA NoJS');await nojs.locator('#contact-email').fill('nojs@example.com');
    await nojs.locator('#contact-email').press('Enter');
    await nojs.waitForLoadState('networkidle');
    const url=nojs.url();result.noJsSubmittedURL=url;
    assert.equal(new URL(url).search,'');
  });
  await check('source unchanged throughout verification', async () => {
    for (const [file, expected] of Object.entries(result.sourceHashes)) {
      const actual = crypto.createHash('sha256').update(fs.readFileSync(path.join(source, file))).digest('hex');
      assert.equal(actual, expected, `${file} changed during the run; rerun against a stable build.`);
    }
  });
  result.passed = result.checks.every(check => check.passed)
    && result.viewports.every(view => view.bodyWidth <= view.viewport.width + 1
      && view.documentWidth <= view.viewport.width + 1 && view.overflowing.length === 0
      && view.badImages.length === 0 && view.fontLoaded)
    && result.consoleErrors.length === 0 && result.requests.length === 0;
  await browser.close();
  fs.writeFileSync(`${output}/functional.json`,JSON.stringify(result,null,2));
  console.log(JSON.stringify({passed:result.passed,proofDirectory:output,checks:result.checks,viewports:result.viewports.map(v=>({width:v.viewport.width,bodyWidth:v.bodyWidth,pageHeight:v.pageHeight,overflow:v.overflowing,badImages:v.badImages})),consoleErrors:result.consoleErrors,failedRequests:result.requests},null,2));
  if (!result.passed) process.exitCode = 1;
})().catch(async error => {
  await browser?.close().catch(() => {});
  fs.writeFileSync(`${output}/functional.json`, JSON.stringify({ ...result, passed: false, fatal: error.message }, null, 2));
  console.error(error);
  process.exitCode = 1;
});
