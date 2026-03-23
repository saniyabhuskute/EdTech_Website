const store = window.eduCollegeStore;
let allColleges = [];

const ui = {
  grid: document.getElementById('collegesGrid'),
  summary: document.getElementById('resultsSummary'),
  searchInput: document.getElementById('searchInput'),
  stateFilter: document.getElementById('stateFilter'),
  streamFilter: document.getElementById('streamFilter'),
  sortFilter: document.getElementById('sortFilter'),
  applyBtn: document.getElementById('applyFiltersBtn')
};

const filters = {
  streamTab: 'all'
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatFees(value) {
  if (!Number.isFinite(Number(value)) || Number(value) <= 0) {
    return 'N/A';
  }
  return '₹' + Number(value).toFixed(1).replace(/\.0$/, '') + ' L/yr';
}

function updateStateOptions(colleges) {
  const states = Array.from(new Set(colleges.map(function (college) { return college.state; }).filter(Boolean))).sort();
  const current = ui.stateFilter.value;
  ui.stateFilter.innerHTML = '<option value="all">All States</option>' +
    states.map(function (state) { return '<option value="' + escapeHtml(state) + '">' + escapeHtml(state) + '</option>'; }).join('');
  ui.stateFilter.value = states.indexOf(current) > -1 ? current : 'all';
}

function getFilteredColleges() {
  const search = ui.searchInput.value.trim().toLowerCase();
  const state = ui.stateFilter.value;
  const stream = ui.streamFilter.value;
  const sort = ui.sortFilter.value;

  let result = allColleges.filter(function (college) {
    const matchesSearch = !search || [
      college.name,
      college.location,
      college.stream,
      college.state,
      college.description,
      (college.tags || []).join(' ')
    ].join(' ').toLowerCase().includes(search);

    const matchesState = state === 'all' || college.state === state;
    const matchesSelectStream = stream === 'all' || college.stream === stream;
    const matchesTabStream = filters.streamTab === 'all' || college.stream === filters.streamTab;
    return matchesSearch && matchesState && matchesSelectStream && matchesTabStream;
  });

  if (sort === 'fees-asc') {
    result.sort(function (a, b) { return Number(a.fees || 0) - Number(b.fees || 0); });
  } else if (sort === 'fees-desc') {
    result.sort(function (a, b) { return Number(b.fees || 0) - Number(a.fees || 0); });
  } else if (sort === 'newest') {
    result.sort(function (a, b) { return Number(b.createdAt || 0) - Number(a.createdAt || 0); });
  } else {
    result.sort(function (a, b) { return Number(a.rank || 9999) - Number(b.rank || 9999); });
  }

  return result;
}

async function refreshData() {
  allColleges = await store.getColleges();
  updateStateOptions(allColleges);
  renderColleges();
}

function buildCard(college) {
  const tags = (college.tags || []).slice(0, 3).map(function (tag, index) {
    const cls = index % 2 === 0 ? 'tag-blue' : 'tag-gold';
    return '<span class="tag ' + cls + '">' + escapeHtml(tag) + '</span>';
  }).join('');

  const logoHtml = college.logo
    ? '<img class="college-logo" src="' + escapeHtml(college.logo) + '" alt="' + escapeHtml(college.name) + ' logo" />'
    : '<div class="college-logo" style="display:flex;align-items:center;justify-content:center;font-size:1.25rem;background:#f3f4f6;">🎓</div>';

  const cardClass = college.featured ? 'college-card featured' : 'college-card';
  return '<article class="' + cardClass + '">' +
    '<div class="card-img-wrap">' +
      '<img src="' + escapeHtml(college.image || '') + '" alt="' + escapeHtml(college.name) + '" loading="lazy" />' +
      '<span class="rank-badge">NIRF Rank #' + escapeHtml(college.rank || 'NA') + '</span>' +
      '<span class="approved-badge"><i class="bi bi-patch-check-fill"></i> ' + escapeHtml(college.approval || 'Verified') + '</span>' +
      '<button class="bookmark-btn" type="button" aria-label="Bookmark"><i class="bi bi-bookmark"></i></button>' +
    '</div>' +
    '<div class="card-body-custom">' +
      '<div class="card-college-header">' +
        logoHtml +
        '<div>' +
          '<div class="college-name">' + escapeHtml(college.name) + '</div>' +
          '<div class="college-location"><i class="bi bi-geo-alt-fill"></i> ' + escapeHtml(college.location || 'India') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="tag-row">' +
        tags +
      '</div>' +
      '<p class="college-desc">' + escapeHtml(college.description || 'No description available yet.') + '</p>' +
      '<div class="card-footer-custom">' +
        '<div class="fees-info">Avg. Fees <strong>' + escapeHtml(formatFees(college.fees)) + '</strong></div>' +
        '<a href="' + escapeHtml(college.detailsUrl || '#') + '" class="details-link">More Details <i class="bi bi-arrow-right"></i></a>' +
      '</div>' +
    '</div>' +
  '</article>';
}

function renderColleges() {
  const data = getFilteredColleges();
  ui.summary.textContent = 'Showing ' + data.length + ' colleges';

  if (!data.length) {
    ui.grid.innerHTML = '<div class="empty-state">' +
      '<h3>No colleges found</h3>' +
      '<p>Try changing filters or add a new college from the Admin Panel.</p>' +
    '</div>';
    return;
  }

  ui.grid.innerHTML = data.map(buildCard).join('');
}

function bindEvents() {
  document.querySelectorAll('.stream-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.stream-tab').forEach(function (item) { item.classList.remove('active'); });
      tab.classList.add('active');
      filters.streamTab = tab.dataset.stream || 'all';
      renderColleges();
    });
  });

  ui.applyBtn.addEventListener('click', renderColleges);
  ui.searchInput.addEventListener('input', renderColleges);
  ui.stateFilter.addEventListener('change', renderColleges);
  ui.streamFilter.addEventListener('change', renderColleges);
  ui.sortFilter.addEventListener('change', renderColleges);
  window.addEventListener('focus', refreshData);

  ui.grid.addEventListener('click', function (event) {
    const button = event.target.closest('.bookmark-btn');
    if (!button) {
      return;
    }
    const icon = button.querySelector('i');
    icon.classList.toggle('bi-bookmark');
    icon.classList.toggle('bi-bookmark-fill');
    button.style.color = icon.classList.contains('bi-bookmark-fill') ? '#003566' : '';
  });

  ui.grid.addEventListener('error', function (event) {
    if (!event.target.matches('.card-img-wrap img')) {
      return;
    }
    const image = event.target;
    image.style.display = 'none';
    image.parentElement.style.background = 'linear-gradient(135deg, #001D3D 0%, #003566 100%)';
    if (!image.parentElement.querySelector('.img-fallback')) {
      image.parentElement.insertAdjacentHTML(
        'beforeend',
        '<div class="img-fallback" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:3rem;">🏛️</div>'
      );
    }
  }, true);
}

async function init() {
  if (!store || !ui.grid) {
    return;
  }
  allColleges = await store.getColleges();
  updateStateOptions(allColleges);
  bindEvents();
  renderColleges();
}

document.addEventListener('DOMContentLoaded', function () {
  init().catch(function () {
    showToast('Unable to load college data from server. Showing last saved data.', 'error');
    allColleges = store.getLocalColleges();
    updateStateOptions(allColleges);
    bindEvents();
    renderColleges();
  });
});
