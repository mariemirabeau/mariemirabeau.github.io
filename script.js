const root = document.documentElement;
const hero = document.getElementById('hero');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

function updateThemeIcon() {
  themeToggle.textContent = root.getAttribute('data-theme') === 'light' ? '☾' : '☀︎';
}
updateThemeIcon();

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon();
});

menuToggle?.addEventListener('click', () => {
  mainMenu.classList.toggle('open');
});

// scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Hero parallax
let ticking = false;
function updateParallax() {
  const y = window.scrollY || 0;
  if (hero) hero.style.setProperty('--parallaxY', `${Math.min(y * 0.35, 140)}px`);
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
});
updateParallax();
