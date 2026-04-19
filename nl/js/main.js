// Clarys Systems NL — Main JS

(function () {
  'use strict';

  // --- Language Toggle ---
  const langBtns = document.querySelectorAll('.lang-btn');
  const saved = localStorage.getItem('clarys-lang');
  if (saved === 'nl') document.body.classList.add('lang-nl');

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      // Update ALL lang buttons (both desktop and mobile toggles)
      langBtns.forEach(b => {
        b.classList.toggle('active', b.dataset.lang === lang);
      });
      if (lang === 'nl') {
        document.body.classList.add('lang-nl');
        document.documentElement.lang = 'nl';
      } else {
        document.body.classList.remove('lang-nl');
        document.documentElement.lang = 'en';
      }
      localStorage.setItem('clarys-lang', lang);
    });
  });

  // Set initial active state
  if (saved === 'nl') {
    langBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.lang === 'nl');
    });
  }

  // --- Nav scroll effect ---
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // --- Mobile menu ---
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');

  function closeMenu() {
    toggle.classList.remove('open');
    links.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    toggle.classList.add('open');
    links.classList.add('open');
    if (overlay) overlay.classList.add('open');
    nav.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking a nav link
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    // Close menu when clicking the overlay
    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // --- Scroll fade-in ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
