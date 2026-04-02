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
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
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

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
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
