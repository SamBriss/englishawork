// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-close');

hamburger?.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ===== ANIMATED COUNTERS =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = 'true';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card-num').forEach(el => counterObserver.observe(el));

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('.btn-submit');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  const data = {
    nombre: form.nombre.value,
    correo: form.correo.value,
    telefono: form.telefono.value,
    servicio: form.servicio.value,
    mensaje: form.mensaje.value,
  };

  try {
    const res = await fetch('/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    formMsg.textContent = json.mensaje;
    formMsg.className = 'form-msg success';
    formMsg.style.display = 'block';
    form.reset();
  } catch {
    formMsg.textContent = 'Hubo un error. Por favor intenta de nuevo.';
    formMsg.className = 'form-msg error';
    formMsg.style.display = 'block';
  } finally {
    btn.textContent = 'Enviar Mensaje';
    btn.disabled = false;
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== LEER MAS ABOUT =====
function toggleAbout() {
  const extra = document.getElementById('aboutExtra');
  const btn   = document.getElementById('btnLeerMas');
  const open  = extra.classList.toggle('open');
  btn.textContent = open ? 'Leer menos ↑' : 'Leer más →';
}
