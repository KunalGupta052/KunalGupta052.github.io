/**
 * Kunal Gupta — Portfolio JavaScript
 * Features: Scroll Spy Navigation, Project Filtering, Mobile Menu, Theme Toggle
 * Vanilla JavaScript — Zero Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // =========================================================================
  // 1. ACTIVE NAVIGATION SPY (IntersectionObserver)
  // =========================================================================
  const sections = document.querySelectorAll('section[id], header[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const linkMap = new Map();
    navLinks.forEach(link => {
      const id = link.getAttribute('href').replace('#', '');
      if (id) linkMap.set(id, link);
    });

    const observerOptions = {
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeLink = linkMap.get(entry.target.id);
          if (activeLink) {
            navLinks.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
          }
        }
      });
    }, observerOptions);

    sections.forEach(sec => navObserver.observe(sec));
  }


  // =========================================================================
  // 2. PROJECT FILTERING LOGIC
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.case-study-card');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active state on filter buttons
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Show/Hide project cards based on tags
        projectCards.forEach(card => {
          const tags = card.getAttribute('data-tags') || '';
          const tagArray = tags.toLowerCase().split(' ');

          if (filter === 'all' || tagArray.includes(filter)) {
            card.classList.remove('is-hidden');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }


  // =========================================================================
  // 3. MOBILE NAVIGATION MENU
  // =========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinksContainer = document.getElementById('navLinks');

  if (menuToggle && navLinksContainer) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !navLinksContainer.classList.contains('open');
      navLinksContainer.classList.toggle('open', isOpen);
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    };

    menuToggle.addEventListener('click', () => toggleMenu());

    // Close menu when clicking internal nav links
    navLinksContainer.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinksContainer.classList.contains('open')) {
        toggleMenu(false);
        menuToggle.focus();
      }
    });
  }


  // =========================================================================
  // 4. DARK / LIGHT THEME TOGGLE
  // =========================================================================
  const themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {
    const themeIcon = themeToggle.querySelector('.theme-icon') || themeToggle;
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    const setTheme = (isLight) => {
      if (isLight) {
        document.body.classList.add('light-theme');
        themeIcon.textContent = '☀';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        themeToggle.setAttribute('aria-pressed', 'true');
      } else {
        document.body.classList.remove('light-theme');
        themeIcon.textContent = '◐';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
        themeToggle.setAttribute('aria-pressed', 'false');
      }
    };

    // Initialize theme based on local storage or system preferences
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
      setTheme(true);
    } else {
      setTheme(false);
    }

    themeToggle.addEventListener('click', () => {
      const isCurrentlyLight = document.body.classList.contains('light-theme');
      const newLightState = !isCurrentlyLight;
      setTheme(newLightState);
      localStorage.setItem('theme', newLightState ? 'light' : 'dark');
    });
  }


  // =========================================================================
  // 5. SUBTLE SCROLL REVEAL ANIMATION (Respects prefers-reduced-motion)
  // =========================================================================
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.case-study-card, .cert-card, .exploring-card, .journey-step');

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.25s ease';
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

});
