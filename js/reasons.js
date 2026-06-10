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

// ===== RAZONES =====
const reasons = [
  "Me enamoré de ti por la forma en que amas a Dios.",
  "Me enamoré de tu sonrisa, porque ilumina hasta mis días difíciles.",
  "Me enamoré de tu corazón noble y sincero.",
  "Me enamoré de la paz que siento cuando hablo contigo.",
  "Me enamoré de tu manera de cuidar a las personas que amas.",
  "Me enamoré de tu dulzura en los pequeños detalles.",
  "Me enamoré de cómo me haces sentir importante.",
  "Me enamoré de tus vlogsitos.",
  "Me enamoré de tu capacidad para alegrar cualquier momento.",
  "Me enamoré de tu autenticidad; nunca intentas ser alguien más.",
  "Me enamoré de tus sueños y de la pasión con la que los persigues.",
  "Me enamoré de tu paciencia conmigo.",
  "Me enamoré de cada conversación que tenemos.",
  "Me enamoré de tu belleza, pero más aún de tu alma.",
  "Me enamoré porque contigo puedo ser yo mismo.",
  "Me enamoré de la forma en que Dios obra a través de tu vida.",
  "Me enamoré de tu ternura, ¡sí! tu ternura, incluso en los días difíciles.",
  "Me enamoré de cómo haces que los momentos simples sean especiales.",
  "Me enamoré porque contigo encontré a mi mejor amiga y el amor de mi vida.",
  "Me enamoré de ti porque cada día encuentro una nueva razón para hacerlo.",
];

// ===== CONSTRUIR CARDS =====
const grid = document.getElementById('reasonsGrid');

reasons.forEach((text, i) => {
  const card = document.createElement('div');
  card.className = 'reason-card';
  card.innerHTML = `
    <span class="reason-number">Razón ${String(i + 1).padStart(2, '0')}</span>
    <p class="reason-text">${text}</p>
    <span class="reason-heart">🤍</span>
  `;

  // Efecto 3D tilt con el mouse
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;

    // Brillo radial en posición del cursor
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;
    card.style.setProperty('--mx', pctX + '%');
    card.style.setProperty('--my', pctY + '%');
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });

  grid.appendChild(card);
});

// ===== REVEAL ON SCROLL =====
const cards = document.querySelectorAll('.reason-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // Delay escalonado
      const delay = (Array.from(cards).indexOf(entry.target) % 3) * 100;
      setTimeout(() => entry.target.classList.add('revealed'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach(c => observer.observe(c));

// ===== PARTÍCULAS FLOTANTES =====
const container = document.getElementById('particles');
const PARTICLE_COUNT = 25;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.className = 'particle';

  const size = Math.random() * 4 + 2;
  const left = Math.random() * 100;
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 15;
  const isHeart = Math.random() > 0.7;

  if (isHeart) {
    p.style.cssText = `
      left: ${left}%;
      font-size: ${size * 3}px;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      background: none;
      border-radius: 0;
    `;
    p.textContent = '🤍';
    p.style.width = 'auto';
    p.style.height = 'auto';
  } else {
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      background: rgba(244,63,94,${Math.random() * 0.3 + 0.1});
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
    `;
  }

  container.appendChild(p);
}
