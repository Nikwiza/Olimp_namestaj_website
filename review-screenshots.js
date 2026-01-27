import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  console.log('Waiting 5 seconds for full render...');
  await page.waitForTimeout(5000);

  // Desktop viewport (1440x900)
  console.log('Capturing desktop viewport (1440x900)...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/desktop-1440.png', fullPage: true });

  // Tablet viewport (768x1024)
  console.log('Capturing tablet viewport (768x1024)...');
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/tablet-768.png', fullPage: true });

  // Mobile viewport (375x667)
  console.log('Capturing mobile viewport (375x667)...');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/mobile-375.png', fullPage: true });

  // Get console messages
  console.log('\n=== Console Messages ===');
  page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));

  // Get page title
  const title = await page.title();
  console.log('\n=== Page Title ===');
  console.log(title);

  // Check for visible styled elements
  console.log('\n=== CSS Verification ===');
  const hasStyledElements = await page.evaluate(() => {
    const body = document.body;
    const computedStyle = window.getComputedStyle(body);
    const backgroundColor = computedStyle.backgroundColor;
    const fontFamily = computedStyle.fontFamily;

    return {
      backgroundColor,
      fontFamily,
      hasCustomFont: !fontFamily.includes('Times') && !fontFamily.includes('serif') && fontFamily !== 'Arial',
      hasColors: backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'rgb(255, 255, 255)'
    };
  });
  console.log(JSON.stringify(hasStyledElements, null, 2));

  await browser.close();
  console.log('\nScreenshots saved to /tmp/');
})();
