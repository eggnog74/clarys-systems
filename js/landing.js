// Clarys Systems — Landing JS (English-only)

(function () {
  'use strict';

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
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

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

  // --- Case study carousel ---
  const proofTrack = document.querySelector('.proof-track');
  if (proofTrack) {
    const slides = Array.from(proofTrack.querySelectorAll('.proof'));
    const dots = Array.from(document.querySelectorAll('.proof-dot'));
    const prevBtn = document.querySelector('.proof-prev');
    const nextBtn = document.querySelector('.proof-next');

    // Carousel slides are horizontally offscreen so the global fade-up
    // observer never fires on slides 2+. Reveal them all up front.
    slides.forEach(s => s.classList.add('visible'));

    function currentIndex() {
      const center = proofTrack.scrollLeft + proofTrack.clientWidth / 2;
      let best = 0, bestDist = Infinity;
      slides.forEach((s, i) => {
        const c = s.offsetLeft - proofTrack.offsetLeft + s.offsetWidth / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    }

    function scrollToIndex(i) {
      const slide = slides[i];
      if (!slide) return;
      proofTrack.scrollTo({
        left: slide.offsetLeft - proofTrack.offsetLeft,
        behavior: 'smooth'
      });
    }

    function update() {
      const cur = currentIndex();
      dots.forEach((d, i) => d.classList.toggle('active', i === cur));
      if (prevBtn) prevBtn.disabled = cur === 0;
      if (nextBtn) nextBtn.disabled = cur === slides.length - 1;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => scrollToIndex(Math.max(0, currentIndex() - 1)));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollToIndex(Math.min(slides.length - 1, currentIndex() + 1)));
    dots.forEach((d, i) => d.addEventListener('click', () => scrollToIndex(i)));

    let scrollTimer;
    proofTrack.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(update, 80);
    }, { passive: true });

    update();
  }
})();
