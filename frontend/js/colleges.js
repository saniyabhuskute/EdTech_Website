// Stream tab switching
document.querySelectorAll('.stream-tab').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.stream-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

// Bookmark toggle
document.querySelectorAll('.bookmark-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const icon = this.querySelector('i');
    icon.classList.toggle('bi-bookmark');
    icon.classList.toggle('bi-bookmark-fill');
    this.style.color = icon.classList.contains('bi-bookmark-fill') ? '#003566' : '';
  });
});

// Image fallback — if a college image fails, show a gradient placeholder
document.querySelectorAll('.card-img-wrap img').forEach(img => {
  img.addEventListener('error', function () {
    this.style.display = 'none';
    this.parentElement.style.background =
      'linear-gradient(135deg, #001D3D 0%, #003566 100%)';
    this.parentElement.innerHTML +=
      '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:3rem;">🏛️</div>';
  });
});

// Scroll-top visibility
window.addEventListener('scroll', () => {
  const btn = document.querySelector('.scroll-top');
  btn.style.opacity = window.scrollY > 300 ? '1' : '0';
  btn.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
});
