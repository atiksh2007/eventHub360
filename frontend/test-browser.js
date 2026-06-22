import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.failure().errorText, request.url()));

    console.log("Navigating to localhost...");
    await page.goto('http://localhost:5175', { waitUntil: 'networkidle0' });
    
    await new Promise(r => setTimeout(r, 1000));
    
    await browser.close();
    console.log("Done");
  } catch (err) {
    console.error("Puppeteer Script Error:", err);
  }
})();
