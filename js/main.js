/**
 * AI Photo Landing — Main JavaScript
 * Minimal interactivity: sticky header, mobile menu, scroll spy, fade-in, analytics
 */
(function () {
  'use strict';

  /* ---- DOM refs ---- */
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.header-nav a');
  const mobileLinks = document.querySelectorAll('.mobile-menu a[href^="#"]');
  const allCTAs = document.querySelectorAll('[data-event]');

  /* ---- 1. Sticky Header ---- */
  function onScroll() {
    if (!header) return;
    const scrolled = window.scrollY > 20;
    header.classList.toggle('scrolled', scrolled);
  }

  /* ---- 2. Mobile Menu ---- */
  function toggleMenu() {
    if (!burger || !mobileMenu) return;
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('open');
      burger.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (!mobileMenu || !burger) return;
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* ---- 3. Scroll Spy ---- */
  const sectionIds = ['hero', 'examples', 'features', 'how-it-works', 'popular', 'business', 'creators', 'faq'];
  let activeSection = null;

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    let current = null;

    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (!section) continue;
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        current = id;
        break;
      }
    }

    if (current !== activeSection) {
      activeSection = current;
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === '#' + current);
      });
    }
  }

  /* ---- 4. Fade-in on scroll ---- */
  function initFadeObserver() {
    const fadeEls = document.querySelectorAll('.anim-fade');
    if (!fadeEls.length || !('IntersectionObserver' in window)) {
      // Show all if no observer support
      fadeEls.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(el => observer.observe(el));
  }

  /* ---- 5. Scroll depth tracking ---- */
  let scroll50Fired = false;
  let scroll90Fired = false;

  function trackScrollDepth() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / docHeight) * 100;

    if (scrollPercent >= 50 && !scroll50Fired) {
      scroll50Fired = true;
      trackEvent('scroll_50', { section: 'page' });
    }
    if (scrollPercent >= 90 && !scroll90Fired) {
      scroll90Fired = true;
      trackEvent('scroll_90', { section: 'page' });
    }
  }

  /* ---- 6. Analytics Utility ---- */
  window.trackEvent = function trackEvent(name, payload) {
    if (typeof window === 'undefined') return;

    // GA4
    if (typeof gtag === 'function') {
      gtag('event', name, payload || {});
    }

    // Yandex Metrika (replace ID on deploy)
    if (typeof ym === 'function' && window._ymId) {
      ym(window._ymId, 'reachGoal', name, payload || {});
    }
  };

  /* ---- 7. CTA click tracking ---- */
  function initCTATracking() {
    allCTAs.forEach(el => {
      el.addEventListener('click', function (e) {
        const eventName = this.getAttribute('data-event');
        if (!eventName) return;

        const payload = {
          card_id: this.getAttribute('data-card') || undefined,
          section: this.closest('section') ? this.closest('section').id : undefined,
          target: 'telegram_bot'
        };

        trackEvent(eventName, payload);
      });
    });
  }

  /* ---- 8. Bind events ---- */
  function init() {
    // Scroll handlers
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    window.addEventListener('scroll', trackScrollDepth, { passive: true });

    // Mobile menu
    if (burger) burger.addEventListener('click', toggleMenu);

    // Close menu on anchor link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(closeMenu, 100);
      });
    });

    // Close menu on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    // Initialize observers
    initFadeObserver();

    // Track CTAs
    initCTATracking();

    // Initial state
    onScroll();
    updateActiveNav();

    // Close mobile menu on window resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) closeMenu();
    });
  }

  /* ---- Run on DOM ready ---- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
