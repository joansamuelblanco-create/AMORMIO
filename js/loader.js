const phrases = [
  "Conociéndote...",
  "Enamorándome...",
  "Soñando contigo...",
  "Construyendo nuestro futuro..."
];

const fill = document.getElementById('progressFill');
const phraseEl = document.getElementById('progressPhrase');
const percentEl = document.getElementById('progressPercent');

let progress = 0;
let phraseIndex = 0;

// Actualiza frase según progreso
function updatePhrase(p) {
  const idx = p < 25 ? 0 : p < 50 ? 1 : p < 75 ? 2 : 3;
  if (idx !== phraseIndex) {
    phraseIndex = idx;
    phraseEl.style.opacity = '0';
    setTimeout(() => {
      phraseEl.textContent = phrases[phraseIndex];
      phraseEl.style.opacity = '1';
    }, 300);
  }
}

// Avanza la barra de forma orgánica
function advance() {
  // Velocidades variables para que se sienta natural
  const step = progress < 60
    ? Math.random() * 3 + 1
    : progress < 85
    ? Math.random() * 1.5 + 0.5
    : Math.random() * 0.8 + 0.2;

  progress = Math.min(progress + step, 100);
  fill.style.width = progress + '%';
  percentEl.textContent = Math.floor(progress) + '%';
  updatePhrase(progress);

  if (progress < 100) {
    setTimeout(advance, Math.random() * 120 + 60);
  } else {
    // Completado — espera un momento y redirige
    percentEl.textContent = '100%';
    phraseEl.style.opacity = '0';
    setTimeout(() => {
      phraseEl.textContent = '¡Listo! 🦈';
      phraseEl.style.opacity = '1';
    }, 300);
    setTimeout(() => {
      document.body.classList.add('fade-out');
      setTimeout(() => {
        // Redirige al login
        window.location.href = 'login.html';
      }, 800);
    }, 1200);
  }
}

// Arranca después de un pequeño delay inicial
setTimeout(advance, 600);
