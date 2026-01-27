import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Capture console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text()
    });
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('=== Console Messages ===');
  console.log(JSON.stringify(consoleMessages, null, 2));

  // Test keyboard navigation
  console.log('\n=== Keyboard Navigation Test ===');

  // Tab through interactive elements
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);

    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      return {
        tagName: el.tagName,
        text: el.textContent?.trim().substring(0, 30),
        className: el.className,
        hasFocusVisible: window.getComputedStyle(el, ':focus').outline !== 'none'
      };
    });

    console.log(`Tab ${i + 1}:`, JSON.stringify(focusedElement));
  }

  // Take screenshot of focused state
  await page.screenshot({ path: '/tmp/keyboard-focus.png' });

  // Check color contrast (sample check)
  console.log('\n=== Color Contrast Check ===');
  const contrastIssues = await page.evaluate(() => {
    const issues = [];

    // Check hero heading
    const heroHeading = document.querySelector('h1');
    if (heroHeading) {
      const styles = window.getComputedStyle(heroHeading);
      issues.push({
        element: 'Hero H1',
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        fontSize: styles.fontSize
      });
    }

    // Check buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach((btn, idx) => {
      if (idx < 3) {
        const styles = window.getComputedStyle(btn);
        issues.push({
          element: `Button ${idx + 1}: ${btn.textContent?.trim().substring(0, 20)}`,
          color: styles.color,
          backgroundColor: styles.backgroundColor
        });
      }
    });

    return issues;
  });

  console.log(JSON.stringify(contrastIssues, null, 2));

  // Check for semantic HTML
  console.log('\n=== Semantic HTML Check ===');
  const semanticElements = await page.evaluate(() => {
    return {
      hasMainLandmark: !!document.querySelector('main'),
      hasNavLandmark: !!document.querySelector('nav'),
      hasHeaderLandmark: !!document.querySelector('header'),
      hasFooterLandmark: !!document.querySelector('footer'),
      headingStructure: Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
        level: h.tagName,
        text: h.textContent?.trim().substring(0, 40)
      })),
      formLabels: Array.from(document.querySelectorAll('input, textarea')).map(input => ({
        hasLabel: !!input.labels?.length || !!input.getAttribute('aria-label'),
        type: input.type,
        id: input.id
      })),
      images: Array.from(document.querySelectorAll('img')).slice(0, 5).map(img => ({
        hasAlt: img.hasAttribute('alt'),
        alt: img.alt,
        src: img.src.substring(0, 50)
      }))
    };
  });

  console.log(JSON.stringify(semanticElements, null, 2));

  await browser.close();
  console.log('\nAccessibility review complete!');
})();
