/* =============================================
   EDUPORTAL — SHARED JAVASCRIPT
   Theme Toggle | Nav | Counters | Scroll
   ============================================= */

/* ── Anti-flash: runs immediately via inline script ── */

/* ── Theme Toggle ── */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ep-theme', next);
  updateThemeBtn(next);
  syncThemeColor(next);
}

function updateThemeBtn(theme) {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.innerHTML = theme === 'dark'
    ? '<i class="bi bi-sun-fill"></i>'
    : '<i class="bi bi-moon-fill"></i>';
  btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

/* ── Init on DOM ready ── */
document.addEventListener('DOMContentLoaded', function () {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeBtn(theme);
  syncThemeColor(theme);
  highlightActiveNav();
  initScrollTop();
  initMobileMenu();
  initCounters();
});

/* ── Active Nav ── */
function highlightActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* ── Scroll Top ── */
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 320);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Mobile Hamburger ── */
function initMobileMenu() {
  const ham  = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (!ham || !menu) return;
  ham.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    const spans = ham.querySelectorAll('span');
    spans[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
    spans[1].style.opacity   = open ? '0' : '1';
    spans[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!ham.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

/* ── Counter animations ── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => io.observe(c));
}

function animateCounter(el) {
  const target   = parseFloat(el.dataset.count);
  const suffix   = el.dataset.suffix || '';
  const prefix   = el.dataset.prefix || '';
  const duration = 1800;
  const start    = performance.now();
  const isFloat  = String(target).includes('.');
  (function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
    const v = target * e;
    el.textContent = prefix + (isFloat ? v.toFixed(1) : Math.floor(v)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  })(start);
}

/* ── PWA: Service Worker Registration ── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .catch(() => {/* SW registration failed silently */});
  });
}

/* ── PWA: Install prompt ── */
let _deferredInstall = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  _deferredInstall = e;
  // Show install button if present
  const btn = document.getElementById('pwaInstallBtn');
  if (btn) btn.style.display = 'inline-flex';
});
window.addEventListener('appinstalled', () => {
  _deferredInstall = null;
  const btn = document.getElementById('pwaInstallBtn');
  if (btn) btn.style.display = 'none';
});
function installPWA() {
  if (!_deferredInstall) return;
  _deferredInstall.prompt();
  _deferredInstall.userChoice.then(() => { _deferredInstall = null; });
}

/* ── Theme color meta sync ── */
function syncThemeColor(theme) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#000814' : '#f4f7fb');
}

/* ── Toast notification ── */
function showToast(msg, type='success') {
  let wrap = document.getElementById('toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toast-wrap';
    wrap.style.cssText = 'position:fixed;bottom:80px;right:28px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
    document.body.appendChild(wrap);
  }
  const t = document.createElement('div');
  const bg = type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#F0CB46';
  const tc = type === 'success' || type === 'error' ? '#fff' : '#000';
  t.style.cssText = `background:${bg};color:${tc};padding:12px 20px;border-radius:10px;font-size:.88rem;font-weight:600;box-shadow:0 4px 16px rgba(0,0,0,.3);transform:translateX(120%);transition:transform .35s cubic-bezier(.4,0,.2,1);max-width:300px;`;
  t.textContent = msg;
  wrap.appendChild(t);
  requestAnimationFrame(() => { t.style.transform = 'translateX(0)'; });
  setTimeout(() => {
    t.style.transform = 'translateX(120%)';
    setTimeout(() => t.remove(), 400);
  }, 3500);
}
