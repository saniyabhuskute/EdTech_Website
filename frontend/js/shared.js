/* =============================================
   EDUPORTAL — SHARED JS  v4.0
   Clean SaaS · Scroll Reveal · Smooth Interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Theme Toggle Logic ── */
  const toggleBtn = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('eduportal_theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  if (toggleBtn) {
    // Update icon on load
    toggleBtn.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
    
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('eduportal_theme', isDark ? 'dark' : 'light');
      toggleBtn.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
      
      // Update floating shapes immediately if they exist
      document.querySelectorAll('.floating-shape').forEach(shape => {
        shape.style.opacity = isDark ? '0.15' : '0.4';
      });
    });
  }

  /* ── Dynamic Floating Shapes ── */
  function createFloatingShapes() {
    const container = document.querySelector('.hero') || document.querySelector('.blog-hero') || document.querySelector('.adm-hero') || document.querySelector('.couns-hero') || document.querySelector('.cutoff-hero');
    if (!container) return;
    
    // Create 3 subtle floating shapes for a dynamic feel
    const isDark = document.body.classList.contains('dark-mode');
    const opacity = isDark ? '0.15' : '0.4';
    
    const s1 = document.createElement('div');
    s1.className = 'floating-shape emerald';
    s1.style.cssText = `width: 300px; height: 300px; top: -100px; left: -100px; opacity: ${opacity};`;
    
    const s2 = document.createElement('div');
    s2.className = 'floating-shape gold';
    s2.style.cssText = `width: 400px; height: 400px; bottom: -150px; right: -150px; opacity: ${opacity}; animation-delay: -5s;`;
    
    const s3 = document.createElement('div');
    s3.className = 'floating-shape emerald';
    s3.style.cssText = `width: 200px; height: 200px; top: 30%; left: 50%; opacity: ${opacity}; animation-delay: -10s; filter: blur(60px);`;

    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.prepend(s2);
    container.prepend(s1);
    container.prepend(s3);
  }
  createFloatingShapes();

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Navbar shadow on scroll ── */
  const navbar = document.querySelector('.site-navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Hamburger toggle ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Active nav link ── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });

  /* ── Scroll to top ── */
  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Counter animation ── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          counterObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4); // easeOutQuart
      el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ── Smooth card hover lift ── */
  document.querySelectorAll('.card-tilt').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)';
      card.style.boxShadow = '0 12px 40px rgba(0,0,0,.1)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

});

/* ── Toast notification ── */
function showToast(msg, type = 'info') {
  const existing = document.querySelector('.ep-toast');
  if (existing) existing.remove();

  const colors = {
    success: { bg: '#0F9D8A', icon: '✓' },
    error:   { bg: '#EF4444', icon: '✕' },
    info:    { bg: '#3B82F6', icon: 'ℹ' },
  };
  const c = colors[type] || colors.info;

  const toast = document.createElement('div');
  toast.className = 'ep-toast';
  toast.style.cssText = `
    position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(20px);
    background:${c.bg};color:#fff;padding:14px 28px;border-radius:12px;
    font-size:.9rem;font-weight:500;box-shadow:0 8px 30px rgba(0,0,0,.15);
    z-index:9999;display:flex;align-items:center;gap:10px;opacity:0;
    transition:.35s ease;font-family:'Inter',sans-serif;max-width:90vw;
  `;
  toast.innerHTML = `<span style="font-size:1.1rem;">${c.icon}</span> ${msg}`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
