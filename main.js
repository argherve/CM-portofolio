/* ============================================
   main.js — Portfolio CM Hervé KAKPO
   ============================================ */

/* ---- NAVBAR ---- */
const nav = document.querySelector('.nav');
const burger = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');
const allNavLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 20);
});

burger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  const isOpen = navLinks?.classList.contains('open');
  if (spans[0]) spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  if (spans[1]) spans[1].style.opacity  = isOpen ? '0' : '1';
  if (spans[2]) spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
if (sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        allNavLinks.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
        activeLink?.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
}

/* ---- SCROLL REVEAL ---- */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (entry.target.dataset.delay || 0));
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObs.observe(el));
}

/* ---- PALETTE — COPY HEX ---- */
document.querySelectorAll('.palette__swatch').forEach(swatch => {
  swatch.addEventListener('click', () => {
    const hex = swatch.dataset.hex;
    if (!hex) return;
    navigator.clipboard.writeText(hex).then(() => {
      swatch.classList.add('copied');
      setTimeout(() => swatch.classList.remove('copied'), 1500);
    }).catch(() => {
      // fallback
      const el = document.createElement('textarea');
      el.value = hex;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      swatch.classList.add('copied');
      setTimeout(() => swatch.classList.remove('copied'), 1500);
    });
  });
});

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counters = document.querySelectorAll('.metric__number[data-target]');
if (counters.length) {
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));
}

/* ---- TYPEWRITER TAGLINE ---- */
function typewriter(el, text, speed = 40) {
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

const taglineEl = document.querySelector('[data-typewriter]');
if (taglineEl) {
  setTimeout(() => {
    typewriter(taglineEl, taglineEl.dataset.typewriter);
  }, 800);
}

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- CONTACT FORM ---- */
const form = document.querySelector('#contact-form');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Envoi en cours…';
  btn.disabled = true;

  // Simulate send
  await new Promise(r => setTimeout(r, 1500));

  btn.textContent = '✓ Message envoyé !';
  btn.style.background = 'linear-gradient(135deg, #00E5C8, #00b8a2)';
  form.reset();

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.disabled = false;
  }, 3000);
});

/* ---- CURSOR GLOW (desktop) ---- */
if (window.matchMedia('(hover: hover)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(123,95,255,0.08) 0%, rgba(0,229,200,0.03) 40%, transparent 70%);
    pointer-events: none;
    z-index: 999;
    transform: translate(-50%, -50%);
    transition: left 0.4s cubic-bezier(0.22, 1, 0.36, 1), top 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ---- PROJECTS FILTER ---- */
const filterBtns = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.opacity = match ? '1' : '0.3';
      card.style.pointerEvents = match ? 'auto' : 'none';
      card.style.transform = match ? '' : 'scale(0.95)';
    });
  });
});

/* ---- 3D ILLUSION SCROLL & TILT ---- */
// 1. Mouse Tilt on Bento Cards
const tiltCards = document.querySelectorAll('.bento__card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.1s ease-out';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s var(--ease)';
  });
});

// 2. Velocity 3D Scroll on Sections/Cards
let lastScrollY = window.scrollY;
let scrollVelocity = 0;
let isScrolling = false;

const scrollElements = document.querySelectorAll('.bento__card, .service__card, .hero__photo-frame');

function update3DScroll() {
  const currentScrollY = window.scrollY;
  scrollVelocity = currentScrollY - lastScrollY;
  lastScrollY = currentScrollY;

  // Clamp velocity
  const maxTilt = 8;
  let tiltY = scrollVelocity * 0.1;
  tiltY = Math.max(-maxTilt, Math.min(maxTilt, tiltY));

  scrollElements.forEach(el => {
    // Only apply if in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (!el.matches(':hover')) {
        el.style.transform = `perspective(1000px) rotateX(${-tiltY}deg) translateZ(0)`;
        el.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
      }
    }
  });

  if (Math.abs(scrollVelocity) > 0) {
    isScrolling = true;
    requestAnimationFrame(update3DScroll);
  } else {
    isScrolling = false;
    // Reset transforms smoothly when stopped
    scrollElements.forEach(el => {
      if (!el.matches(':hover')) {
        el.style.transform = 'perspective(1000px) rotateX(0deg) translateZ(0)';
        el.style.transition = 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
      }
    });
  }
}

window.addEventListener('scroll', () => {
  if (!isScrolling) {
    requestAnimationFrame(update3DScroll);
  }
});

/* ---- BACK BUTTON ---- */
(function () {
  // Ne pas afficher le bouton sur la page d'accueil
  const isHome = location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname.endsWith('/');
  if (isHome) return;

  const btn = document.createElement('button');
  btn.className = 'back-btn visible';
  btn.setAttribute('aria-label', 'Retour à l\'accueil');
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7"/>
    </svg>
    Accueil
  `;
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    btn.style.transform = 'translateX(-20px)';
    btn.style.opacity = '0';
    setTimeout(() => { window.location.href = 'index.html#home'; }, 220);
  });
})();
