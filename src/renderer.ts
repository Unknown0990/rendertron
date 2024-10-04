const puppeteer = require('puppeteer');

class Renderer {
  constructor(browser) {
    this.browser = browser;
  }

  async serialize(requestUrl) {
    const page = await this.browser.newPage();
    
    // Navigate to the URL
    let response = null;
    try {
      response = await page.goto(requestUrl, {timeout: 10000, waitUntil: 'networkidle0'});
    } catch (e) {
      console.error(e);
    }

    if (!response) {
      console.error('No response from the page');
      await page.close();
      return;
    }

    // Get the HTML content of the page
    const result = await page.evaluate(() => document.documentElement.outerHTML);
    
    // Print the content to the terminal
    console.log(result);

    await page.close();
  }
}

(async () => {
  const browser = await puppeteer.launch();
  const renderer = new Renderer(browser);

  // Example URL to serialize
  await renderer.serialize('https://example.com');

  await browser.close();
})();
