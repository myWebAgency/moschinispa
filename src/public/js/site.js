/* ── Scroll position reset ──────────────────────── */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('pageshow', () => window.scrollTo(0, 0));

/* ── Custom cursor ─────────────────────────────── */
const C = document.getElementById('cur');
const R = document.getElementById('curRing');
let mx = -100, my = -100, rx = -100, ry = -100;

document.addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

const ringTargets = 'a,button,.lightbox-trigger,.lightbox-close';
document.querySelectorAll(ringTargets).forEach(el => {
  el.addEventListener('mouseenter', () => { R.style.setProperty('--ring-scale', '1.6'); R.style.borderColor = 'rgba(232,176,11,.5)'; });
  el.addEventListener('mouseleave', () => { R.style.setProperty('--ring-scale', '1'); R.style.borderColor = 'rgba(232,176,11,.3)'; });
});

(function animateCursor() {
  rx += (mx - rx) * .18;
  ry += (my - ry) * .18;
  C.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
  R.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%) scale(var(--ring-scale,1))`;
  requestAnimationFrame(animateCursor);
})();

/* ── Smooth scroll to section ──────────────────── */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 63;
  window.scrollTo({ top: y, behavior: 'smooth' });
}
// Make it globally available for onclick handlers in footer
window.scrollToSection = scrollToSection;

// Nav links smooth scroll
document.querySelectorAll('.nav-links a, .mmenu a').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      scrollToSection(href.replace('#', ''));
      // Close mobile menu if open
      document.getElementById('mmenu')?.classList.remove('open');
    }
  });
});

/* ── Nav scroll state ──────────────────────────── */
const mainNav = document.getElementById('mainNav');
let navTick = false;
window.addEventListener('scroll', () => {
  if (navTick) return;
  navTick = true;
  requestAnimationFrame(() => {
    mainNav.classList.toggle('sc', window.scrollY > 50);
    navTick = false;
  });
}, { passive: true });

/* ── Mobile menu ───────────────────────────────── */
document.getElementById('menuToggle')?.addEventListener('click', () => {
  document.getElementById('mmenu').classList.toggle('open');
});
document.getElementById('mmenuClose')?.addEventListener('click', () => {
  document.getElementById('mmenu').classList.remove('open');
});

/* ── Reveal on scroll ──────────────────────────── */
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
      observer.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });
document.querySelectorAll('.rv').forEach(el => revealObserver.observe(el));

/* ── Lightbox ──────────────────────────────────── */
const lightbox = document.getElementById('imgLightbox');
const lightboxImg = lightbox?.querySelector('.lightbox-img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

function openLightbox(img) {
  if (!lightbox) return;
  // For <picture> elements, use the largest WebP source or currentSrc
  let src = img.currentSrc || img.getAttribute('src');
  // Try to get the large variant from the srcset
  const picture = img.closest('picture');
  if (picture) {
    const source = picture.querySelector('source[type="image/webp"]');
    if (source) {
      const srcset = source.getAttribute('srcset') || '';
      const parts = srcset.split(',').map(s => s.trim());
      const last = parts[parts.length - 1]; // large is last
      if (last) src = last.split(' ')[0];
    }
  }
  lightboxImg.src = src;
  lightboxImg.alt = img.getAttribute('alt') || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; lightboxImg.alt = ''; }, 220);
}

document.querySelectorAll('.lightbox-trigger').forEach(el => {
  el.addEventListener('click', () => {
    // If the trigger is an <img>, use it directly; if it's inside <picture>, find the <img>
    const img = el.tagName === 'IMG' ? el : el.querySelector('img') || el;
    openLightbox(img);
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
