/* ==========================================================================
   STAR FITNESS ESSENTIALS - main.js
   1. Mobile navigation toggle
   2. Sticky header scroll state
   3. Scrollspy for active nav link
   4. Category filter tabs
   5. Scroll reveal animations
   6. Back-to-top button
   7. Footer year
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* -------------------- 1. Mobile navigation toggle -------------------- */
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  /* -------------------- 2. Sticky header scroll state -------------------- */
  var header = document.getElementById('siteHeader');
  function updateHeaderState() {
    if (window.scrollY > 8) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  /* -------------------- 3. Scrollspy for active nav link -------------------- */
  var sections = document.querySelectorAll('main section[id], section[id="footer"]');
  var navAnchors = document.querySelectorAll('.nav-links a');

  function setActiveLink(id) {
    navAnchors.forEach(function (a) {
      var match = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-active', match);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { spyObserver.observe(s); });
  }

  /* -------------------- 4. Category filter tabs -------------------- */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var catCards = document.querySelectorAll('.cat-card');
  var filterEmpty = document.getElementById('filterEmpty');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      var filter = btn.getAttribute('data-filter');
      var visibleCount = 0;

      catCards.forEach(function (card) {
        var matches = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('is-hidden', !matches);
        if (matches) visibleCount++;
      });

      if (filterEmpty) {
        filterEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });

  /* -------------------- 5. Scroll reveal animations -------------------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback: just show everything if IntersectionObserver isn't supported
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* -------------------- 6. Back-to-top button -------------------- */
  var backToTop = document.getElementById('backToTop');

  function updateBackToTop() {
    if (window.scrollY > 480) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  }

  if (backToTop) {
    updateBackToTop();
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -------------------- 7. Footer year -------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
