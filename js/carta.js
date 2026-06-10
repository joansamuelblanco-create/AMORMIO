// ===== AUTH CHECK =====
(function() {
  if (!sessionStorage.getItem('amormio_auth')) {
    window.location.href = 'login.html';
  }
})();

// ===== CURSOR =====
const shark = document.getElementById('cursor-shark');
const trail = document.getElementById('cursor-trail');
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0, lastX = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (e.clientX < lastX) shark.classList.add('flipped');
  else if (e.clientX > lastX) shark.classList.remove('flipped');
  lastX = e.clientX;
});
function animateCursor() {
  shark.style.left = mouseX + 'px';
  shark.style.top = mouseY + 'px';
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ===== BARRA DE PROGRESO DE LECTURA =====
const progressBar = document.createElement('div');
progressBar.className = 'reading-progress';
progressBar.style.width = '0%';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}, { passive: true });

// ===== REVEAL PÁRRAFOS AL SCROLL =====
const lines = document.querySelectorAll('.carta-line, .carta-firma');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Delay basado en data-delay para entrada escalonada
      const delay = parseInt(entry.target.dataset.delay || 0) * 60;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Math.min(delay, 300)); // máximo 300ms de delay
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

lines.forEach(line => observer.observe(line));