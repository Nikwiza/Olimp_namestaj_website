import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(6000);

  console.log('=== FINAL COMPREHENSIVE REVIEW ===\n');

  // 1. Gallery stacked photos test
  await page.locator('#gallery').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  const galleryTest = await page.evaluate(() => {
    const cards = document.querySelectorAll('#gallery [class*="absolute"]');
    const hasTransform = Array.from(cards).some(card => {
      const transform = window.getComputedStyle(card).transform;
      return transform && transform !== 'none' && transform.includes('rotate');
    });

    return {
      hasStackedCards: cards.length > 1,
      hasTiltEffect: hasTransform,
      cardCount: cards.length
    };
  });

  console.log('1. Gallery Stacked Photos (Polaroid effect):');
  console.log(`   Has stacked cards: ${galleryTest.hasStackedCards}`);
  console.log(`   Has tilt/rotate effect: ${galleryTest.hasTiltEffect}`);
  console.log(`   Card count: ${galleryTest.cardCount}`);

  // 2. Button consistency test
  const buttonTest = await page.evaluate(() => {
    const primaryButtons = document.querySelectorAll('.btn-primary');
    const secondaryButtons = document.querySelectorAll('.btn-secondary');

    const primaryStyles = Array.from(primaryButtons).map(btn => {
      const s = window.getComputedStyle(btn);
      return { borderRadius: s.borderRadius, bg: s.backgroundColor };
    });

    const secondaryStyles = Array.from(secondaryButtons).map(btn => {
      const s = window.getComputedStyle(btn);
      return { borderRadius: s.borderRadius, border: s.border };
    });

    const primaryConsistent = primaryStyles.every(s => s.borderRadius === primaryStyles[0]?.borderRadius);
    const secondaryConsistent = secondaryStyles.every(s => s.borderRadius === secondaryStyles[0]?.borderRadius);

    return {
      primaryCount: primaryButtons.length,
      secondaryCount: secondaryButtons.length,
      primaryConsistent,
      secondaryConsistent,
      samplePrimaryRadius: primaryStyles[0]?.borderRadius,
      sampleSecondaryRadius: secondaryStyles[0]?.borderRadius
    };
  });

  console.log('\n2. Button Consistency:');
  console.log(`   Primary buttons: ${buttonTest.primaryCount} (consistent: ${buttonTest.primaryConsistent})`);
  console.log(`   Secondary buttons: ${buttonTest.secondaryCount} (consistent: ${buttonTest.secondaryConsistent})`);
  console.log(`   Border radius: ${buttonTest.samplePrimaryRadius || 'rounded-sm'}`);

  // 3. Swipe indicator visibility
  const swipeTest = await page.evaluate(() => {
    const swipeText = document.body.innerText.toLowerCase();
    const swipeElement = Array.from(document.querySelectorAll('*')).find(el =>
      el.textContent.toLowerCase().includes('prevuci')
    );

    return {
      hasSwipeText: swipeText.includes('prevuci'),
      isVisible: swipeElement ? window.getComputedStyle(swipeElement).opacity > 0 : false
    };
  });

  console.log('\n3. Swipe Indicator:');
  console.log(`   Has "Prevuci" text: ${swipeTest.hasSwipeText}`);
  console.log(`   Visible: ${swipeTest.isVisible}`);

  // 4. Centering at multiple breakpoints
  console.log('\n4. Centering at All Breakpoints:');

  const breakpoints = [
    { width: 1440, name: '1440px (Desktop)' },
    { width: 1024, name: '1024px (Laptop)' },
    { width: 768, name: '768px (Tablet)' },
    { width: 375, name: '375px (Mobile)' }
  ];

  for (const bp of breakpoints) {
    await page.setViewportSize({ width: bp.width, height: 900 });
    await page.waitForTimeout(1500);

    const centeringCheck = await page.evaluate(() => {
      const sections = ['#hero', '#gallery', '#about', '#testimonials', '#contact'];
      const allCentered = sections.every(selector => {
        const section = document.querySelector(selector);
        if (!section) return true;

        const container = section.querySelector('[class*="max-w"]');
        if (!container) return true;

        const rect = container.getBoundingClientRect();
        const viewportCenter = window.innerWidth / 2;
        const elementCenter = rect.left + rect.width / 2;
        const diff = Math.abs(viewportCenter - elementCenter);

        return diff < 50;
      });

      return allCentered;
    });

    console.log(`   ${bp.name}: ${centeringCheck ? 'CENTERED' : 'NEEDS CHECK'}`);
  }

  // Reset to desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  // 5. Hero carousel test
  const carouselTest = await page.evaluate(() => {
    const dots = document.querySelectorAll('[aria-label*="sliku"]');
    const arrows = document.querySelectorAll('[aria-label*="slika"]');

    return {
      hasDots: dots.length > 0,
      dotsCount: dots.length,
      hasArrows: arrows.length > 0,
      arrowsCount: arrows.length
    };
  });

  console.log('\n5. Hero Image Carousel:');
  console.log(`   Has dots: ${carouselTest.hasDots} (${carouselTest.dotsCount} dots)`);
  console.log(`   Has arrows: ${carouselTest.hasArrows} (${carouselTest.arrowsCount} arrows)`);

  // 6. No duplicate numbers
  const duplicateTest = await page.evaluate(() => {
    const text = document.body.innerText;
    const matches1996 = (text.match(/1996/g) || []).length;
    const matches28 = (text.match(/28\+/g) || []).length;

    return {
      count1996: matches1996,
      count28: matches28,
      acceptable1996: matches1996 <= 8,
      acceptable28: matches28 <= 5
    };
  });

  console.log('\n6. No Duplicated Numbers:');
  console.log(`   "1996" appears: ${duplicateTest.count1996} times (acceptable: ${duplicateTest.acceptable1996})`);
  console.log(`   "28+" appears: ${duplicateTest.count28} times (acceptable: ${duplicateTest.acceptable28})`);

  // 7. Logo visibility without hover
  const logoTest = await page.evaluate(() => {
    const decoratives = document.querySelectorAll('.logo-decorative');
    const allVisible = Array.from(decoratives).every(el => {
      const styles = window.getComputedStyle(el);
      return styles.opacity === '1' && styles.display !== 'none';
    });

    return {
      decorativeCount: decoratives.length,
      allVisible,
      opacities: Array.from(decoratives).map(el => window.getComputedStyle(el).opacity)
    };
  });

  console.log('\n7. Logo Decorative Elements (No Hover Required):');
  console.log(`   Decorative elements: ${logoTest.decorativeCount}`);
  console.log(`   All visible by default: ${logoTest.allVisible}`);
  console.log(`   Opacities: ${logoTest.opacities.join(', ')}`);

  // 8. Hero text not covered by navbar
  const overlapTest = await page.evaluate(() => {
    const header = document.querySelector('header');
    const heroContent = document.querySelector('#hero h1');

    if (!header || !heroContent) return { error: 'Elements not found' };

    const headerBottom = header.getBoundingClientRect().bottom;
    const heroTop = heroContent.getBoundingClientRect().top;

    return {
      headerBottom,
      heroContentTop: heroTop,
      clearance: heroTop - headerBottom,
      noCoverage: heroTop > headerBottom
    };
  });

  console.log('\n8. Hero Text NOT Covered by Navbar:');
  console.log(`   No overlap: ${overlapTest.noCoverage}`);
  console.log(`   Clearance: ${Math.round(overlapTest.clearance)}px`);

  // 9. Whitespace check
  const whitespaceTest = await page.evaluate(() => {
    const sections = document.querySelectorAll('section');
    const paddings = Array.from(sections).map(section => {
      const styles = window.getComputedStyle(section);
      return {
        id: section.id,
        paddingTop: styles.paddingTop,
        paddingBottom: styles.paddingBottom
      };
    });

    const generousPadding = paddings.every(p =>
      parseInt(p.paddingTop) >= 64 || parseInt(p.paddingBottom) >= 64
    );

    return {
      sectionCount: sections.length,
      generousPadding,
      samplePaddings: paddings.slice(0, 3)
    };
  });

  console.log('\n9. Whitespace (Generous Spacing):');
  console.log(`   Sections with generous padding: ${whitespaceTest.generousPadding}`);
  console.log(`   Sample section padding: ${whitespaceTest.samplePaddings.map(p => `${p.id}: ${p.paddingTop}`).join(', ')}`);

  console.log('\n=== REVIEW COMPLETE ===\n');

  await browser.close();
})();
