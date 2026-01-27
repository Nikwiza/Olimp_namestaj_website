import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = {
    consoleMessages: [],
    screenshots: {},
    interactions: {}
  };

  // Capture console messages
  page.on('console', msg => {
    results.consoleMessages.push({
      type: msg.type(),
      text: msg.text()
    });
  });

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  console.log('Waiting for CSS/JS to fully load (5 seconds)...');
  await page.waitForTimeout(5000);

  // Test 1: Desktop (1440x900)
  console.log('Testing Desktop (1440x900)...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/olimp-desktop-1440.png', fullPage: true });

  // Test 2: Laptop (1024x768)
  console.log('Testing Laptop (1024x768)...');
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/olimp-laptop-1024.png', fullPage: true });

  // Test 3: Tablet (768x1024)
  console.log('Testing Tablet (768x1024)...');
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/olimp-tablet-768.png', fullPage: true });

  // Test 4: Mobile (375x667)
  console.log('Testing Mobile (375x667)...');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/olimp-mobile-375.png', fullPage: true });

  // Back to desktop for interaction testing
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(1000);

  // Check if CSS is loaded
  console.log('Checking CSS loading...');
  const cssLoaded = await page.evaluate(() => {
    const bodyStyles = window.getComputedStyle(document.body);
    const hasCustomFont = bodyStyles.fontFamily !== 'serif' && bodyStyles.fontFamily !== 'Times New Roman';
    const hasBackgroundColor = bodyStyles.backgroundColor !== 'rgba(0, 0, 0, 0)' && bodyStyles.backgroundColor !== 'rgb(255, 255, 255)';

    // Check for styled elements
    const styledElements = document.querySelectorAll('[class*="bg-"], [class*="text-"], [class*="p-"], [class*="m-"]');

    return {
      hasCustomFont,
      hasBackgroundColor,
      styledElementsCount: styledElements.length,
      bodyFontFamily: bodyStyles.fontFamily
    };
  });

  results.cssCheck = cssLoaded;

  // Test logo visibility (decorative elements should be visible)
  console.log('Testing logo...');
  const logoVisible = await page.locator('header nav .logo, header .logo').first().isVisible();
  results.interactions.logoVisible = logoVisible;

  // Test hero section - check if navbar overlaps content
  console.log('Testing hero section...');
  const heroOverlap = await page.evaluate(() => {
    const nav = document.querySelector('nav, header');
    const heroContent = document.querySelector('.hero, [class*="Hero"]');

    if (!nav || !heroContent) return { overlaps: 'unknown', navHeight: 0, heroPadding: 0 };

    const navRect = nav.getBoundingClientRect();
    const heroRect = heroContent.getBoundingClientRect();
    const heroStyles = window.getComputedStyle(heroContent);

    return {
      overlaps: heroRect.top < navRect.bottom,
      navHeight: navRect.height,
      heroPaddingTop: heroStyles.paddingTop
    };
  });

  results.interactions.heroOverlap = heroOverlap;

  // Test gallery swiping (if gallery exists)
  console.log('Testing gallery...');
  const galleryExists = await page.locator('[class*="gallery"], [class*="Gallery"]').count() > 0;

  if (galleryExists) {
    // Scroll to gallery
    await page.locator('[class*="gallery"], [class*="Gallery"]').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Take screenshot of gallery
    await page.screenshot({ path: '/tmp/olimp-gallery.png' });

    // Check for swipe indicator
    const swipeIndicator = await page.locator('text=/swipe|slide|przeleći/i').isVisible().catch(() => false);
    results.interactions.swipeIndicatorVisible = swipeIndicator;
  }

  // Test buttons
  console.log('Testing button styles...');
  const buttonStyles = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button, a[class*="btn"], .button'));
    return buttons.slice(0, 5).map(btn => {
      const styles = window.getComputedStyle(btn);
      return {
        text: btn.textContent.trim().slice(0, 30),
        backgroundColor: styles.backgroundColor,
        borderRadius: styles.borderRadius,
        padding: styles.padding
      };
    });
  });

  results.interactions.buttons = buttonStyles;

  // Check for duplicate numbers/stats
  console.log('Checking for duplicate stats...');
  const statsCheck = await page.evaluate(() => {
    const textContent = document.body.innerText;
    const matches1996 = (textContent.match(/1996/g) || []).length;
    const matches28 = (textContent.match(/28\+?/g) || []).length;

    return {
      year1996Count: matches1996,
      experience28Count: matches28
    };
  });

  results.interactions.statsCheck = statsCheck;

  // Test hero carousel
  console.log('Testing hero carousel...');
  const heroCarousel = await page.evaluate(() => {
    const dots = document.querySelectorAll('[class*="dot"], [class*="indicator"]');
    const arrows = document.querySelectorAll('[class*="arrow"], [class*="prev"], [class*="next"]');

    return {
      hasDots: dots.length > 0,
      dotsCount: dots.length,
      hasArrows: arrows.length > 0
    };
  });

  results.interactions.heroCarousel = heroCarousel;

  // Save results
  writeFileSync('/tmp/review-results.json', JSON.stringify(results, null, 2));

  console.log('Review complete! Results saved to /tmp/review-results.json');
  console.log('\nCSS Check:');
  console.log(JSON.stringify(cssLoaded, null, 2));
  console.log('\nConsole Messages:', results.consoleMessages.length);

  await browser.close();
})();
