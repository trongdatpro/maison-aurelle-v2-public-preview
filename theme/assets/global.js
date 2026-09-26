/**
 * Maison Aurelle — Theme Global Interactions
 * Clean, lightweight, dependency-free Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initAccordions();
  initProductGallery();
  initQuantitySteppers();
  initVariantSelectors();
});

// Mobile Navigation Drawer
function initMobileNav() {
  const toggleBtn = document.querySelector('[data-mobile-menu-toggle]');
  const drawer = document.querySelector('[data-mobile-nav-drawer]');
  const closeBtn = document.querySelector('[data-mobile-nav-close]');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });
}

// Specifications Accordions
function initAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      
      // Allow independent toggling or close others if requested
      if (isOpen) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Product Detail Page Media Gallery Switcher
function initProductGallery() {
  const thumbs = document.querySelectorAll('[data-gallery-thumb]');
  const mainImage = document.querySelector('[data-main-gallery-image]');

  if (!thumbs.length || !mainImage) return;

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const targetSrc = thumb.getAttribute('data-full-src');
      const targetAlt = thumb.getAttribute('data-alt');

      if (targetSrc) {
        mainImage.setAttribute('src', targetSrc);
      }
      if (targetAlt) {
        mainImage.setAttribute('alt', targetAlt);
      }

      thumbs.forEach((t) => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
    });
  });
}

// Quantity Steppers
function initQuantitySteppers() {
  const steppers = document.querySelectorAll('[data-qty-stepper]');

  steppers.forEach((stepper) => {
    const input = stepper.querySelector('[data-qty-input]');
    const minusBtn = stepper.querySelector('[data-qty-minus]');
    const plusBtn = stepper.querySelector('[data-qty-plus]');

    if (!input || !minusBtn || !plusBtn) return;

    minusBtn.addEventListener('click', () => {
      const current = parseInt(input.value, 10) || 1;
      if (current > 1) {
        input.value = current - 1;
        input.dispatchEvent(new Event('change'));
      }
    });

    plusBtn.addEventListener('click', () => {
      const current = parseInt(input.value, 10) || 1;
      input.value = current + 1;
      input.dispatchEvent(new Event('change'));
    });
  });
}

// Variant Selection Logic
function initVariantSelectors() {
  const variantRadios = document.querySelectorAll('[data-variant-radio]');
  const hiddenInput = document.querySelector('[name="id"]');
  const priceDisplay = document.querySelector('[data-price-display]');

  if (!variantRadios.length || !hiddenInput) return;

  variantRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        hiddenInput.value = radio.value;
        const price = radio.getAttribute('data-variant-price');
        if (price && priceDisplay) {
          priceDisplay.textContent = price;
        }

        // Highlight selected pill
        document.querySelectorAll('.variant-pill-option').forEach((pill) => {
          pill.classList.remove('is-selected');
        });
        const parentPill = radio.closest('.variant-pill-option');
        if (parentPill) {
          parentPill.classList.add('is-selected');
        }
      }
    });
  });
}
