/* ========================================
   script.js — Portfolio Interactivity
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initTypingEffect();
  initScrollReveal();
  initSmoothScroll();
  initContactForm();
  initCountUp();
});

/* ===== PARTICLE BACKGROUND ===== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  const PARTICLE_COUNT = 60;
  const CONNECT_DISTANCE = 120;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 38, 38, ${p.opacity})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DISTANCE) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(220, 38, 38, ${0.08 * (1 - dist / CONNECT_DISTANCE)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });
    animationId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
  });

  init();
  animate();
}

/* ===== NAVBAR ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = navLinks.querySelectorAll('a');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = navLinks.querySelector(`a[href="#${id}"]`);
      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }
}

/* ===== TYPING EFFECT ===== */
function initTypingEffect() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const strings = [
    'Full-Stack Web Developer',
    'Laravel & PHP Specialist',
    'JavaScript Enthusiast',
    'React & Svelte Developer',
    'Software Engineer',
    'UI/UX Enthusiast',
  ];

  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const current = strings[stringIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % strings.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('.btn-submit');
    const originalText = btn.innerHTML;

    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Sending...`;
    btn.disabled = true;

    // Simulate sending (replace with actual service like Formspree)
    setTimeout(() => {
      btn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Message Sent!`;
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }, 1500);
  });
}

/* ===== COUNT UP ANIMATION ===== */
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-count'), 10);
          const suffix = entry.target.getAttribute('data-suffix') || '';
          animateCount(entry.target, 0, target, 2000, suffix);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

function animateCount(el, start, end, duration, suffix) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
    const value = Math.floor(eased * (end - start) + start);
    el.textContent = value + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
