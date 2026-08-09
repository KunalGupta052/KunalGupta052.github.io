// Highlights the current section's nav link while scrolling.
// Progressive enhancement only — the page is fully usable without this.

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

  const linkMap = new Map();
  navLinks.forEach(link => {
    const id = link.getAttribute('href').replace('#', '');
    linkMap.set(id, link);
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const link = linkMap.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.style.color = '');
          link.style.color = '#E8EAED';
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));
});
