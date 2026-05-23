// ============================================
// Theme Toggle (Dark / Light)
// ============================================
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Apply on load (no flash)
applyTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Respect OS-level changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'light' : 'dark');
  }
});

// ============================================
// Navigation
// ============================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  nav.classList.toggle('nav--scrolled', currentScroll > 50);
  lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('.section, .hero');
const navAnchors = navLinks.querySelectorAll('a');

function updateActiveNav() {
  const scrollPos = window.scrollY + 200;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ============================================
// Scroll Reveal
// ============================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// ============================================
// Counter Animation
// ============================================
const counters = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach(el => counterObserver.observe(el));

function animateCounter(el, target) {
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ============================================
// Contact Form
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalHTML = btn.innerHTML;

  // Simple validation
  const name = contactForm.querySelector('#name').value.trim();
  const email = contactForm.querySelector('#email').value.trim();
  const message = contactForm.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    shakeButton(btn);
    return;
  }

  // Simulate sending
  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.innerHTML = '<span>Message sent ✓</span>';
    btn.style.opacity = '1';
    btn.style.background = '#16A34A';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      btn.style.background = '';
      contactForm.reset();
    }, 2500);
  }, 1200);
});

function shakeButton(btn) {
  btn.style.animation = 'shake 0.4s ease';
  btn.addEventListener('animationend', () => {
    btn.style.animation = '';
  }, { once: true });
}

// Add shake keyframes dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);

// ============================================
// Live local time (Asia/Kathmandu — UTC+05:45)
// ============================================
const localTimeEl = document.getElementById('localTime');

const timeFormatter = (() => {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kathmandu',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  } catch (_) {
    return null;
  }
})();

function renderLocalTime() {
  if (!localTimeEl) return;
  if (!timeFormatter) { localTimeEl.textContent = 'UTC+05:45'; return; }

  const [hh, mm, ss] = timeFormatter.format(new Date()).split(':');

  // First render: build segmented structure once.
  if (!localTimeEl.querySelector('[data-seg="ss"]')) {
    localTimeEl.innerHTML =
      `<span data-seg="hh">${hh}</span>:` +
      `<span data-seg="mm">${mm}</span>:` +
      `<span data-seg="ss">${ss}</span> UTC+05:45`;
    return;
  }

  // Subsequent renders: animate only the segments that actually changed.
  const next = { hh, mm, ss };
  ['hh', 'mm', 'ss'].forEach(key => {
    const el = localTimeEl.querySelector(`[data-seg="${key}"]`);
    if (el && el.textContent !== next[key]) {
      el.textContent = next[key];
      el.classList.remove('time-flip');
      // Force reflow so the animation restarts cleanly.
      void el.offsetWidth;
      el.classList.add('time-flip');
    }
  });
}

// Align ticks to the next whole second, then tick every 1000ms.
renderLocalTime();
setTimeout(() => {
  renderLocalTime();
  setInterval(renderLocalTime, 1000);
}, 1000 - (Date.now() % 1000));

// ============================================
// Writing — render latest posts on homepage
// ============================================
const writingList = document.getElementById('writingList');

if (writingList) {
  fetch('posts/manifest.json', { cache: 'no-cache' })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(data => {
      const posts = (data.posts || [])
        .slice()
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
        .slice(0, 3);

      if (!posts.length) {
        writingList.innerHTML = '<p class="writing__empty">No posts yet — check back soon.</p>';
        return;
      }

      writingList.innerHTML = posts.map(post => `
        <a class="writing-card" href="blog.html#${encodeURIComponent(post.slug)}">
          <span class="writing-card__date">${formatPostDate(post.date)}</span>
          <span class="writing-card__body">
            <span class="writing-card__title">${escapeHtml(post.title)}</span>
            ${post.excerpt ? `<span class="writing-card__excerpt">${escapeHtml(post.excerpt)}</span>` : ''}
          </span>
          <span class="writing-card__arrow" aria-hidden="true">→</span>
        </a>
      `).join('');
    })
    .catch(() => {
      writingList.innerHTML = '<p class="writing__empty">Couldn’t load posts right now.</p>';
    });
}

function formatPostDate(iso) {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      .format(new Date(iso + 'T00:00:00'));
  } catch (_) {
    return iso;
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

// ============================================
// Smooth scroll for all anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============================================
// Animations: hero char-split, card spotlight, scroll progress
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. Split hero name into characters for a staggered rise.
(function splitHeroName() {
  if (prefersReducedMotion) return;
  const heroName = document.querySelector('.hero__name');
  if (!heroName) return;

  let charIndex = 0;
  const replacements = [];

  Array.from(heroName.childNodes).forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      for (const ch of node.textContent) {
        const span = document.createElement('span');
        span.className = 'hero-char';
        span.style.setProperty('--i', charIndex++);
        span.textContent = ch === ' ' ? ' ' : ch;
        frag.appendChild(span);
      }
      replacements.push({ original: node, replacement: frag });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Preserve elements like .serif-italic — render their text as accent chars.
      const isAccent = node.classList && node.classList.contains('serif-italic');
      const frag = document.createDocumentFragment();
      for (const ch of node.textContent) {
        const span = document.createElement('span');
        span.className = 'hero-char' + (isAccent ? ' hero-char--accent' : '');
        span.style.setProperty('--i', charIndex++);
        span.textContent = ch;
        frag.appendChild(span);
      }
      replacements.push({ original: node, replacement: frag });
    }
  });

  replacements.forEach(({ original, replacement }) => heroName.replaceChild(replacement, original));
  heroName.classList.remove('animate-in'); // chars handle their own reveal now
})();

// 2. Card spotlight — track cursor on hover, set CSS custom properties.
//    Event delegation so dynamically-added cards (writing list) get it too.
if (!prefersReducedMotion) {
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest('.stack-card, .goodie-card, .writing-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });
}

// 3. Magnetic hero buttons — translate toward cursor while hovered.
if (!prefersReducedMotion) {
  document.querySelectorAll('.hero__actions .btn').forEach(btn => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.setProperty('--btn-x', `${dx}px`);
      btn.style.setProperty('--btn-y', `${dy}px`);
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.setProperty('--btn-x', '0px');
      btn.style.setProperty('--btn-y', '0px');
    });
  });
}

// 4. Scroll progress bar.
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress && !prefersReducedMotion) {
  let ticking = false;
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    scrollProgress.style.width = `${pct}%`;
    scrollProgress.classList.toggle('is-visible', window.scrollY > 80);
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; }
  }, { passive: true });
  updateProgress();
}
