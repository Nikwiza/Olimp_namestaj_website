import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(6000);

  console.log('Testing centering at all breakpoints...\n');

  // Test 1440px
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/centering-1440.png', fullPage: true });
  console.log('✓ Screenshot at 1440px saved');

  // Test 1024px (critical breakpoint mentioned)
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/centering-1024.png', fullPage: true });
  console.log('✓ Screenshot at 1024px saved');

  // Test 768px
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/centering-768.png', fullPage: true });
  console.log('✓ Screenshot at 768px saved');

  // Test 375px
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/centering-375.png', fullPage: true });
  console.log('✓ Screenshot at 375px saved');

  // Check alignment programmatically
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.waitForTimeout(1000);

  const alignmentCheck = await page.evaluate(() => {
    const hero = document.querySelector('#hero');
    const heroContent = hero?.querySelector('h1')?.closest('div');
    const gallery = document.querySelector('#gallery');
    const galleryHeader = gallery?.querySelector('h2');
    
    return {
      heroContentCentered: heroContent ? window.getComputedStyle(heroContent.parentElement).textAlign === 'center' : false,
      galleryHeaderCentered: galleryHeader ? window.getComputedStyle(galleryHeader.parentElement).textAlign === 'center' : false
    };
  });

  console.log('\nAlignment Check at 1024px:');
  console.log(JSON.stringify(alignmentCheck, null, 2));

  await browser.close();
})();
