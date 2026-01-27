import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);
  await page.setViewportSize({ width: 1440, height: 900 });

  // Test hover states on hero CTA buttons
  console.log('Testing hero button hover...');
  const heroButton = await page.locator('button:has-text("Pogledaj radove")').first();
  await heroButton.hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/hero-button-hover.png' });

  // Scroll to Gallery
  console.log('Scrolling to Gallery section...');
  await page.locator('#gallery').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/gallery-section.png' });

  // Test gallery filter buttons
  console.log('Testing gallery filter interaction...');
  const kitchenFilter = await page.locator('button:has-text("Kuhinje")').first();
  await kitchenFilter.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/gallery-kitchen-filter.png' });

  // Scroll to About
  console.log('Scrolling to About section...');
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/about-section.png' });

  // Scroll to Testimonials
  console.log('Scrolling to Testimonials section...');
  await page.locator('#testimonials').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/testimonials-section.png' });

  // Scroll to Contact
  console.log('Scrolling to Contact section...');
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/contact-section.png' });

  // Test form interaction
  console.log('Testing form interaction...');
  await page.fill('input[type="text"]', 'Test User');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.screenshot({ path: '/tmp/contact-form-filled.png' });

  // Check navigation
  console.log('Testing navigation click...');
  await page.locator('button:has-text("Galerija")').first().click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/after-nav-click.png' });

  await browser.close();
  console.log('\nAll section screenshots saved to /tmp/');
})();
