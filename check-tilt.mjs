import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(6000);
  
  await page.locator('#gallery').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  
  const tiltCheck = await page.evaluate(() => {
    // Find stacked cards in gallery
    const gallerySection = document.querySelector('#gallery');
    const allDivs = gallerySection.querySelectorAll('div');
    
    const tilted = Array.from(allDivs).filter(div => {
      const transform = window.getComputedStyle(div).transform;
      // Check if transform contains rotation
      if (transform && transform !== 'none') {
        // Parse matrix to check for rotation
        const values = transform.match(/matrix\(([^)]+)\)/);
        if (values && values[1]) {
          const parts = values[1].split(', ');
          const a = parseFloat(parts[0]);
          const b = parseFloat(parts[1]);
          // If a !== 1 or b !== 0, there's rotation
          return Math.abs(a - 1) > 0.01 || Math.abs(b) > 0.01;
        }
      }
      return false;
    });
    
    return {
      tiltedElements: tilted.length,
      sampleTransforms: tilted.slice(0, 3).map(el => window.getComputedStyle(el).transform)
    };
  });
  
  console.log('Gallery Tilt Effect Check:');
  console.log(JSON.stringify(tiltCheck, null, 2));
  
  // Take gallery screenshot
  await page.screenshot({ path: '/tmp/gallery-detail.png' });
  console.log('\nGallery screenshot saved to /tmp/gallery-detail.png');
  
  await browser.close();
})();
