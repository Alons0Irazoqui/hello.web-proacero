/* ==========================================================================
   PROACERO — Proyectos de Acero y Estructuras
   Interacciones: loader, transición de portón, typewriter, scroll reveal,
   contadores, parallax, partículas y formulario de contacto.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     1. LOADER + TRANSICIÓN "PORTÓN DE ACERO"
     Duración mínima intencionalmente larga para un efecto de apertura
     impactante en vez de un simple fundido instantáneo.
  --------------------------------------------------------------------- */
  const loader = document.getElementById('loader');
  const gate = document.getElementById('gate-transition');
  const barFill = document.querySelector('.loader-bar-fill');

  const MIN_LOAD_MS = 2600;
  const start = Date.now();
  let fakeProgress = 0;
  const progressTimer = setInterval(() => {
    fakeProgress += Math.random() * 14;
    if (fakeProgress > 92) fakeProgress = 92;
    if (barFill) barFill.style.width = fakeProgress + '%';
  }, 160);

  function revealSite() {
    clearInterval(progressTimer);
    if (barFill) barFill.style.width = '100%';

    setTimeout(() => {
      loader.classList.add('hidden');
      gate.classList.add('gate-open');
      document.body.classList.add('site-revealed');
      startHeroSequence();

      setTimeout(() => {
        gate.classList.add('gone');
      }, 1500);
    }, 280);
  }

  window.addEventListener('load', () => {
    const elapsed = Date.now() - start;
    const remaining = Math.max(MIN_LOAD_MS - elapsed, 0);
    setTimeout(revealSite, remaining);
  });
  // Respaldo por si el evento load tarda demasiado (recursos externos lentos)
  setTimeout(revealSite, 6000);

  /* ---------------------------------------------------------------------
     2. NAVBAR — estado al hacer scroll + menú móvil
  --------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const onScrollNav = () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  const hamburger = document.getElementById('hamburger');
  const mobMenu = document.getElementById('mob-menu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', mobMenu.classList.contains('active'));
  });
  mobMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobMenu.classList.remove('active');
    });
  });

  /* ---------------------------------------------------------------------
     3. SCROLL REVEAL
  --------------------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------------------------
     4. CONTADORES ANIMADOS (#stats)
  --------------------------------------------------------------------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count || '0');
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const startTime = performance.now();

    function step(now) {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(target * eased);
      el.textContent = prefix + value + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

  /* ---------------------------------------------------------------------
     5. MARQUEE — inyecta la lista de especialidades (duplicada para loop)
  --------------------------------------------------------------------- */
  const marqueeItems = [
    'Malla Ciclónica', 'Reja de Acero', 'Portones a la Medida',
    'Cercos Eléctricos', 'Concertina de Seguridad', 'Arcotechos',
    'Herrería en General', 'Más de 20 Años de Experiencia'
  ];
  const marquee = document.getElementById('marquee');
  if (marquee) {
    const buildSet = () => marqueeItems.map(txt =>
      `<span class="marquee-item"><i class="fa-solid fa-gem"></i>${txt}</span>`
    ).join('');
    marquee.innerHTML = buildSet() + buildSet();
  }

  /* ---------------------------------------------------------------------
     6. PARTÍCULAS — campos reutilizables en varias secciones
  --------------------------------------------------------------------- */
  const palette = ['#2F7FE0', '#5B9EEF', '#E3B341', '#C4C9D0'];
  function spawnParticles(field) {
    const isSmall = window.innerWidth < 720;
    const count = isSmall ? 8 : 16;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      const size = (Math.random() * 3 + 2).toFixed(1);
      const dur = (Math.random() * 10 + 12).toFixed(1);
      const delay = (Math.random() * 14).toFixed(1);
      const x = (Math.random() * 100).toFixed(1);
      const travel = -(Math.random() * 260 + 320);
      const drift = (Math.random() * 80 - 40).toFixed(0);
      const opac = (Math.random() * 0.35 + 0.25).toFixed(2);
      const color = palette[Math.floor(Math.random() * palette.length)];
      p.style.setProperty('--size', size + 'px');
      p.style.setProperty('--dur', dur + 's');
      p.style.setProperty('--delay', delay + 's');
      p.style.setProperty('--x', x + '%');
      p.style.setProperty('--travel', travel + 'px');
      p.style.setProperty('--drift', drift + 'px');
      p.style.setProperty('--opac', opac);
      p.style.setProperty('--pcolor', color);
      frag.appendChild(p);
    }
    field.appendChild(frag);
  }
  document.querySelectorAll('.particles-field').forEach(spawnParticles);

  /* ---------------------------------------------------------------------
     7. PARALLAX — imágenes de fondo con movimiento (funciona en móvil,
     no depende de background-attachment: fixed)
  --------------------------------------------------------------------- */
  const parallaxEls = Array.from(document.querySelectorAll('.section-media img, .hero-bg, .f-card-media img'));
  let ticking = false;
  function updateParallax() {
    const vh = window.innerHeight;
    parallaxEls.forEach(el => {
      const rect = el.parentElement.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - vh / 2) * 0.12;
      el.style.transform = `translateY(${offset}px) scale(1.15)`;
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  updateParallax();

  /* ---------------------------------------------------------------------
     8. CANVAS DE PARTÍCULAS DEL HERO
  --------------------------------------------------------------------- */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let orbs = [];
    let w, h;

    function resize() {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    }
    function initOrbs() {
      const count = window.innerWidth < 720 ? 18 : 34;
      orbs = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.6 + 0.6) * devicePixelRatio,
        vx: (Math.random() - 0.5) * 0.18 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.18 * devicePixelRatio,
        a: Math.random() * 0.5 + 0.15,
        hue: Math.random() > 0.5 ? '91,158,239' : '227,179,65'
      }));
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < 0 || o.x > w) o.vx *= -1;
        if (o.y < 0 || o.y > h) o.vy *= -1;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${o.hue},${o.a})`;
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }
    resize(); initOrbs(); tick();
    window.addEventListener('resize', () => { resize(); initOrbs(); });
  }

  /* ---------------------------------------------------------------------
     9. HERO — typewriter + shimmer de color, se lanza tras la apertura
  --------------------------------------------------------------------- */
  function typeLine(el, text, speed) {
    return new Promise(resolve => {
      let i = 0;
      const target = el.querySelector('.type-text');
      const cursor = el.querySelector('.cursor');
      function step() {
        if (i <= text.length) {
          target.textContent = text.slice(0, i);
          i++;
          setTimeout(step, speed);
        } else {
          if (cursor) cursor.classList.add('done');
          resolve();
        }
      }
      step();
    });
  }

  async function startHeroSequence() {
    const lines = Array.from(document.querySelectorAll('.hero-title .type-line'));
    const scanline = document.querySelector('.hero-scanline');
    if (scanline) scanline.style.opacity = '1';

    for (const line of lines) {
      const text = line.dataset.text || '';
      const cursor = line.querySelector('.cursor');
      if (cursor) cursor.classList.remove('done');
      await typeLine(line, text, 42);
      await new Promise(r => setTimeout(r, 120));
    }
    document.querySelectorAll('.hero-title .shimmer').forEach(s => s.classList.add('active'));

    document.querySelectorAll('#hero-badge, #hero-sub, #hero-ctas, #hero-trust').forEach((el, idx) => {
      setTimeout(() => el.classList.add('in-view'), idx * 140);
    });
  }

  /* ---------------------------------------------------------------------
     10. FORMULARIO → REDIRECCIÓN A WHATSAPP
  --------------------------------------------------------------------- */
  const waForm = document.getElementById('wa-form');
  if (waForm) {
    waForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('f-name').value.trim();
      const interest = document.getElementById('f-interest').value;
      const msg = document.getElementById('f-msg').value.trim();

      const text =
        `Hola PROACERO, soy ${name}.%0A` +
        `Interés: ${encodeURIComponent(interest)}.%0A` +
        `${encodeURIComponent(msg)}`;

      window.open(`https://wa.me/522222546951?text=${text}`, '_blank', 'noopener');
    });
  }

  /* ---------------------------------------------------------------------
     11. AÑO EN FOOTER
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
