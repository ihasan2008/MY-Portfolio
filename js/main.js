// Mobile menu, scroll reveals, active navigation, and the current year.

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');
const navigationLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const pageSections = [...document.querySelectorAll('main section[id]')];
const yearLabel = document.querySelector('[data-year]');

if (yearLabel) {
  yearLabel.textContent = new Date().getFullYear();
}

function closeMobileMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
  navigation?.classList.remove('is-open');
}

menuButton?.addEventListener('click', () => {
  const menuIsOpen = menuButton.getAttribute('aria-expanded') === 'true';
  const shouldOpen = !menuIsOpen;

  menuButton.setAttribute('aria-expanded', String(shouldOpen));
  menuButton.setAttribute(
    'aria-label',
    shouldOpen ? 'Close navigation' : 'Open navigation',
  );
  navigation?.classList.toggle('is-open', shouldOpen);
});

navigationLinks.forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

const activeSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navigationLinks.forEach((link) => {
        const linkPointsToSection = link.hash === `#${entry.target.id}`;

        link.classList.toggle('active', linkPointsToSection);

        if (linkPointsToSection) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  },
  { rootMargin: '-25% 0px -65% 0px' },
);

pageSections.forEach((section) => {
  activeSectionObserver.observe(section);
});
