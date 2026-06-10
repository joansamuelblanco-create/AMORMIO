// ===== CURSOR TIBURONCÍN =====
const shark = document.getElementById('cursor-shark');
const trail = document.getElementById('cursor-trail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;
let lastX = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Voltear si va hacia la izquierda
  if (e.clientX < lastX) {
    shark.classList.add('flipped');
  } else if (e.clientX > lastX) {
    shark.classList.remove('flipped');
  }
  lastX = e.clientX;
});

// Animación suave del cursor
function animateCursor() {
  shark.style.left = mouseX + 'px';
  shark.style.top = mouseY + 'px';

  // Trail con delay
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Ocultar cursor al salir de la ventana
document.addEventListener('mouseleave', () => {
  shark.style.opacity = '0';
  trail.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  shark.style.opacity = '1';
  trail.style.opacity = '1';
});

// ===== NAVBAR SCROLL =====
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ===== REVEAL SECTIONS =====
const revealEls = document.querySelectorAll('.reveal-section');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== CLOSING SECTION SCROLL =====
const closingLines = document.querySelectorAll('.closing-line');
const closingObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      // Revela líneas una por una con delay
      closingLines.forEach((line, i) => {
        setTimeout(() => line.classList.add('visible'), i * 600);
      });
      closingObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const closingSection = document.getElementById('closingSection');
if (closingSection) closingObserver.observe(closingSection);

// ===== CONTADOR EN VIVO =====
function updateCounter() {
  const start = new Date('2025-09-23T00:00:00');
  const now = new Date();
  const diff = now - start;

  if (diff < 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const fmt = n => String(n).padStart(2, '0');

  const dEl = document.getElementById('countDays');
  const hEl = document.getElementById('countHours');
  const mEl = document.getElementById('countMinutes');
  const sEl = document.getElementById('countSeconds');

  if (dEl) dEl.textContent = days;
  if (hEl) hEl.textContent = fmt(hours);
  if (mEl) mEl.textContent = fmt(minutes);
  if (sEl) sEl.textContent = fmt(seconds);
}

updateCounter();
setInterval(updateCounter, 1000);

// ===== PARALLAX HERO =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const splineBg = document.getElementById('splineBg');
  if (splineBg) {
    splineBg.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
}, { passive: true });

// ===== AUTH CHECK =====
// Si no hay sesión, redirige al login
(function checkAuth() {
  const auth = sessionStorage.getItem('amormio_auth');
  if (!auth) {
    window.location.href = 'login.html';
  }
})();