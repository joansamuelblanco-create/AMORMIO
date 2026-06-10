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
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ===== DATOS =====
// Fotos: agrega todas las que tengas en assets/img/gallery/
// Formato soportado: jpg, jpeg, png, webp, avif
const photos = [
  { src: 'assets/img/gallery/1.jpg', caption: 'Mi lugar favorito siempre será a tu lado. 🤍' },
  { src: 'assets/img/gallery/2.jpg', caption: 'Dios fue bueno conmigo cuando te puso en mi camino.' },
  { src: 'assets/img/gallery/3.jpg', caption: 'Mi tiburoncín favorito. 🦈💖' },
  { src: 'assets/img/gallery/4.jpg', caption: 'Contigo, todo tiene más sentido.' },
  { src: 'assets/img/gallery/5.jpg', caption: 'Eres una de mis oraciones respondidas.' },
  { src: 'assets/img/gallery/6.jpg', caption: 'Qué bonito es coincidir contigo.' },
  { src: 'assets/img/gallery/7.jpg', caption: 'Mi corazón sonríe cuando te ve.' },
  { src: 'assets/img/gallery/8.jpg', caption: 'Tú haces especiales los días normales.' },
  { src: 'assets/img/gallery/9.jpg', caption: 'Gracias por existir.' },
  { src: 'assets/img/gallery/10.jpg', caption: 'Un pedacito de cielo en la tierra.' },
  { src: 'assets/img/gallery/11.jpg', caption: 'Mi paz tiene tu nombre.' },
  { src: 'assets/img/gallery/12.jpg', caption: 'Siempre tú.' },
  { src: 'assets/img/gallery/13.jpg', caption: 'Dios escribe historias hermosas.' },
  { src: 'assets/img/gallery/14.jpg', caption: 'Mi persona favorita.' },
  { src: 'assets/img/gallery/15.jpg', caption: 'Amor con propósito.' },
  { src: 'assets/img/gallery/16.jpg', caption: 'Qué suerte la mía.' },
  { src: 'assets/img/gallery/17.jpg', caption: 'Tú y yo, bajo la gracia de Dios.' },
  { src: 'assets/img/gallery/18.jpg', caption: 'Más que una casualidad, una bendición.' },
  { src: 'assets/img/gallery/19.jpg', caption: 'Donde estés tú, quiero estar yo.' },
  { src: 'assets/img/gallery/20.jpg', caption: 'Mi mejor fotografía siempre eres tú.' },
  { src: 'assets/img/gallery/21.jpg', caption: 'Gracias por cada sonrisa.' },
  { src: 'assets/img/gallery/22.jpg', caption: 'Mi lugar seguro.' },
  { src: 'assets/img/gallery/23.jpg', caption: 'El amor se ve así.' },
  { src: 'assets/img/gallery/24.jpg', caption: 'Eres un regalo de Dios.' },
  { src: 'assets/img/gallery/25.jpg', caption: 'Lo mejor de mis días.' },
  { src: 'assets/img/gallery/26.jpg', caption: 'Mi compañía favorita.' },
  { src: 'assets/img/gallery/27.jpg', caption: 'Dios sabía exactamente lo que hacía.' },
  { src: 'assets/img/gallery/28.jpg', caption: 'Mi corazón te eligió.' },
  { src: 'assets/img/gallery/29.jpg', caption: 'Tú haces que todo valga la pena.' },
  { src: 'assets/img/gallery/30.jpg', caption: 'Amor bonito y tranquilo.' },
  { src: 'assets/img/gallery/31.jpg', caption: 'Qué lindo es caminar contigo.' },
  { src: 'assets/img/gallery/32.jpg', caption: 'Una historia que vale la pena contar.' },
  { src: 'assets/img/gallery/33.jpg', caption: 'Mi tiburoncín hermosa. 🦈✨' },
  { src: 'assets/img/gallery/34.jpg', caption: 'Eres respuesta y no coincidencia.' },
  { src: 'assets/img/gallery/35.jpg', caption: 'Mi alegría favorita.' },
  { src: 'assets/img/gallery/36.jpg', caption: 'Contigo aprendí que el amor también da paz.' },
  { src: 'assets/img/gallery/37.jpg', caption: 'Un recuerdo más para agradecer.' },
  { src: 'assets/img/gallery/38.jpg', caption: 'Cada día te admiro más.' },
  { src: 'assets/img/gallery/39.jpg', caption: 'Lo mejor está contigo.' },
  { src: 'assets/img/gallery/40.jpg', caption: 'Mi bendición favorita.' },
  { src: 'assets/img/gallery/41.jpg', caption: 'Gracias por acompañar mi camino.' },
  { src: 'assets/img/gallery/42.jpg', caption: 'Dios nos encontró antes de que nos encontráramos.' },
  { src: 'assets/img/gallery/43.jpg', caption: 'Tú haces brillar mis días.' },
  { src: 'assets/img/gallery/44.jpg', caption: 'Un amor guiado por Dios.' },
  { src: 'assets/img/gallery/45.jpg', caption: 'Qué privilegio compartir la vida contigo.' },
  { src: 'assets/img/gallery/46.jpg', caption: 'Mi felicidad tiene ojos bonitos.' },
  { src: 'assets/img/gallery/47.jpg', caption: 'Te elegiría una y otra vez.' },
  { src: 'assets/img/gallery/48.jpg', caption: 'Nuestro amor, Su propósito.' },
  { src: 'assets/img/gallery/49.jpg', caption: 'Mi corazón está feliz contigo.' },
  { src: 'assets/img/gallery/50.jpg', caption: 'Te amo más de lo que estas fotos pueden mostrar. ❤️' },
];

// Videos: agrega los que tengas en assets/video/
// Formatos soportados: mp4, webm, mov
const videos = [
  { src: 'assets/video/1.mp4', caption: 'Mi lugar favorito siempre será a tu lado.' },
  { src: 'assets/video/2.mp4', caption: 'Momentos que guardo en el corazón.' },
  { src: 'assets/video/3.mp4', caption: 'Contigo todo tiene más sentido.' },
  // Agrega más videos aquí con el mismo formato
];

// ===== CONSTRUIR CARRUSEL DE VIDEOS =====
const storiesTrack = document.getElementById('storiesTrack');

function buildVideos() {
  if (!storiesTrack) return;
  videos.forEach((v, i) => {
    const card = document.createElement('div');
    card.className = 'story-card';
    card.innerHTML = `
      <video src="${v.src}" muted loop preload="none" playsinline
        onerror="this.closest('.story-card').style.display='none'">
      </video>
      <div class="story-play">
        <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
      <div class="story-overlay">
        <p class="story-num">Video ${String(i+1).padStart(2,'0')}</p>
        <p class="story-title">${v.caption}</p>
      </div>
    `;

    // Preview al hover
    const vid = card.querySelector('video');
    card.addEventListener('mouseenter', () => vid.play());
    card.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime = 0; });

    // Abrir en lightbox al click
    card.addEventListener('click', () => openVideoLightbox(v.src));
    storiesTrack.appendChild(card);
  });
}
buildVideos();

// ===== CONSTRUIR MASONRY DE FOTOS =====
const grid = document.getElementById('masonry-grid');
const photoCountEl = document.getElementById('photoCount');
let validPhotos = [];

function buildMasonry() {
  if (!grid) return;
  let loaded = 0;
  const total = photos.length;

  photos.forEach((p, i) => {
    // Verificar que la imagen existe
    const testImg = new Image();
    testImg.onload = () => {
      validPhotos.push({ ...p, index: i });
      loaded++;
      if (loaded === total) renderMasonry();
    };
    testImg.onerror = () => {
      loaded++;
      if (loaded === total) renderMasonry();
    };
    testImg.src = p.src;
  });
}

function renderMasonry() {
  // Ordena por índice original
  validPhotos.sort((a, b) => a.index - b.index);
  if (photoCountEl) photoCountEl.textContent = validPhotos.length + ' fotografías';

  validPhotos.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'masonry-item';
    item.innerHTML = `
      <img src="${p.src}" alt="Recuerdo ${String(i+1).padStart(2,'0')}" loading="lazy">
      <div class="masonry-caption">
        <p class="masonry-caption-num">${String(i+1).padStart(2,'0')}</p>
        <p class="masonry-caption-text">${p.caption}</p>
      </div>
    `;
    item.addEventListener('click', () => openLightbox(i));
    grid.appendChild(item);
  });
}

buildMasonry();

// ===== LIGHTBOX FOTOS =====
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCounter = document.getElementById('lightbox-counter');
const lbCaption = document.getElementById('lightbox-caption');
let currentIdx = 0;

function openLightbox(idx) {
  currentIdx = idx;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  loadLightboxImg(idx);
}

function loadLightboxImg(idx) {
  const p = validPhotos[idx];
  lbImg.classList.add('loading');
  lbCounter.textContent = String(idx + 1).padStart(2, '0') + ' / ' + validPhotos.length;
  lbCaption.textContent = p.caption;

  const tmp = new Image();
  tmp.onload = () => {
    lbImg.src = p.src;
    lbImg.alt = p.caption;
    requestAnimationFrame(() => lbImg.classList.remove('loading'));
  };
  tmp.src = p.src;
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('close-lightbox').addEventListener('click', closeLightbox);
document.getElementById('lightboxBg').addEventListener('click', closeLightbox);
document.getElementById('prev-btn').addEventListener('click', () => {
  currentIdx = (currentIdx - 1 + validPhotos.length) % validPhotos.length;
  loadLightboxImg(currentIdx);
});
document.getElementById('next-btn').addEventListener('click', () => {
  currentIdx = (currentIdx + 1) % validPhotos.length;
  loadLightboxImg(currentIdx);
});

// Teclado
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowRight') { currentIdx = (currentIdx + 1) % validPhotos.length; loadLightboxImg(currentIdx); }
  if (e.key === 'ArrowLeft') { currentIdx = (currentIdx - 1 + validPhotos.length) % validPhotos.length; loadLightboxImg(currentIdx); }
  if (e.key === 'Escape') closeLightbox();
});

// ===== LIGHTBOX VIDEO =====
const videoLightbox = document.getElementById('videoLightbox');
const lbVideo = document.getElementById('lightboxVideo');

function openVideoLightbox(src) {
  lbVideo.src = src;
  lbVideo.load();
  lbVideo.play();
  videoLightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoLightbox() {
  lbVideo.pause();
  lbVideo.src = '';
  videoLightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('closeVideo').addEventListener('click', closeVideoLightbox);
document.getElementById('videoBg').addEventListener('click', closeVideoLightbox);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && videoLightbox.classList.contains('open')) closeVideoLightbox();
});