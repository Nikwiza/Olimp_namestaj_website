import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(6000);

  // Check logo decorative elements
  const logoCheck = await page.evaluate(() => {
    const decoratives = document.querySelectorAll('.logo-decorative');
    return {
      count: decoratives.length,
      visible: Array.from(decoratives).map(el => ({
        opacity: window.getComputedStyle(el).opacity,
        display: window.getComputedStyle(el).display
      }))
    };
  });

  console.log('Logo Decorative Elements:', JSON.stringify(logoCheck, null, 2));

  // Check hero clearance from navbar
  const heroOverlapCheck = await page.evaluate(() => {
    const header = document.querySelector('header');
    const hero = document.querySelector('#hero');
    const heroContent = hero?.querySelector('h1')?.parentElement;
    
    if (!header || !hero || !heroContent) return { error: 'Elements not found' };
    
    const headerBottom = header.getBoundingClientRect().bottom;
    const heroContentTop = heroContent.getBoundingClientRect().top;
    
    return {
      headerBottom,
      heroContentTop,
      clearance: heroContentTop - headerBottom,
      overlaps: heroContentTop < headerBottom
    };
  });

  console.log('\nHero Overlap Check:', JSON.stringify(heroOverlapCheck, null, 2));

  // Check gallery swipe indicator
  await page.locator('#gallery').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  const swipeCheck = await page.evaluate(() => {
    const text = document.body.innerText.toLowerCase();
    return {
      hasPrevuci: text.includes('prevuci'),
      hasSwipe: text.includes('swipe')
    };
  });

  console.log('\nSwipe Indicator Check:', JSON.stringify(swipeCheck, null, 2));

  // Check carousel elements (scroll back to top first)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  const carouselCheck = await page.evaluate(() => {
    const dots = document.querySelectorAll('[aria-label*="sliku"]');
    const arrows = document.querySelectorAll('[aria-label*="slika"]');
    
    return {
      dotsCount: dots.length,
      arrowsCount: arrows.length,
      dotsExist: dots.length > 0,
      arrowsExist: arrows.length > 0
    };
  });

  console.log('\nCarousel Elements Check:', JSON.stringify(carouselCheck, null, 2));

  await browser.close();
})();
