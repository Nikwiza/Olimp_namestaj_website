import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);
  await page.setViewportSize({ width: 1440, height: 900 });

  // Get all sections on the page
  const sections = await page.evaluate(() => {
    const allSections = [];
    const main = document.querySelector('main');

    if (main) {
      const children = main.children;
      for (let i = 0; i < children.length; i++) {
        const el = children[i];
        const rect = el.getBoundingClientRect();
        const styles = window.getComputedStyle(el);

        allSections.push({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          hasContent: el.textContent.trim().length > 0,
          contentLength: el.textContent.trim().length,
          visible: rect.height > 0,
          height: rect.height,
          display: styles.display,
          hasChildren: el.children.length,
          innerHTML: el.innerHTML.substring(0, 200)
        });
      }
    }

    return allSections;
  });

  console.log('=== Page Sections Analysis ===');
  console.log(JSON.stringify(sections, null, 2));

  // Check for interactive elements
  const interactiveElements = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button, a[href], input, textarea'));
    return buttons.map(el => ({
      tag: el.tagName,
      text: el.textContent?.trim().substring(0, 50),
      href: el.href,
      type: el.type
    }));
  });

  console.log('\n=== Interactive Elements ===');
  console.log(JSON.stringify(interactiveElements, null, 2));

  await browser.close();
})();
