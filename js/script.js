document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // 1. ACTIVE NAVIGATION
  // =========================================

  const sections =
    document.querySelectorAll('section[id], header[id]');

  const navLinks =
    document.querySelectorAll('.nav-links a[href^="#"]');

  if (
    sections.length &&
    navLinks.length &&
    'IntersectionObserver' in window
  ) {

    const linkMap = new Map();

    navLinks.forEach(link => {

      const id =
        link.getAttribute('href').replace('#', '');

      linkMap.set(id, link);

    });

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            const link =
              linkMap.get(entry.target.id);

            if (!link) return;

            if (entry.isIntersecting) {

              navLinks.forEach(link => {
                link.classList.remove('active');
              });

              link.classList.add('active');

            }

          });

        },
        {
          rootMargin: '-40% 0px -50% 0px',
          threshold: 0
        }
      );

    sections.forEach(section => {
      observer.observe(section);
    });

  }


  // =========================================
  // 2. MOBILE MENU
  // =========================================

  const menuToggle =
    document.getElementById('menuToggle');

  const navLinksContainer =
    document.getElementById('navLinks');

  if (menuToggle && navLinksContainer) {

    menuToggle.addEventListener('click', () => {

      const isOpen =
        navLinksContainer.classList.toggle('open');

      menuToggle.classList.toggle(
        'active',
        isOpen
      );

      menuToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

      menuToggle.setAttribute(
        'aria-label',
        isOpen
          ? 'Close navigation menu'
          : 'Open navigation menu'
      );

    });


    // Close menu when a navigation link is clicked

    navLinksContainer
      .querySelectorAll('a[href^="#"]')
      .forEach(link => {

        link.addEventListener('click', () => {

          navLinksContainer.classList.remove('open');

          menuToggle.classList.remove('active');

          menuToggle.setAttribute(
            'aria-expanded',
            'false'
          );

          menuToggle.setAttribute(
            'aria-label',
            'Open navigation menu'
          );

        });

      });


    // Close menu with Escape

    document.addEventListener('keydown', event => {

      if (
        event.key === 'Escape' &&
        navLinksContainer.classList.contains('open')
      ) {

        navLinksContainer.classList.remove('open');

        menuToggle.classList.remove('active');

        menuToggle.setAttribute(
          'aria-expanded',
          'false'
        );

        menuToggle.setAttribute(
          'aria-label',
          'Open navigation menu'
        );

        menuToggle.focus();

      }

    });

  }

});
