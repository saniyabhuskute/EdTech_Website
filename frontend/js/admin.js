const store = window.eduCollegeStore;

const ui = {
  authGate: document.getElementById('adminAuthGate'),
  loginForm: document.getElementById('adminLoginForm'),
  passwordInput: document.getElementById('adminPassword'),
  authError: document.getElementById('adminAuthError'),
  adminHero: document.getElementById('adminHero'),
  adminMain: document.getElementById('adminMain'),
  adminFooter: document.getElementById('adminFooter'),
  logoutBtn: document.getElementById('logoutBtn'),
  loginLink: document.querySelector('.nav-actions a.btn-login'),
  registerLink: document.querySelector('.nav-actions a.btn-register'),
  form: document.getElementById('collegeForm'),
  formMode: document.getElementById('formModeLabel'),
  saveBtn: document.getElementById('saveCollegeBtn'),
  resetFormBtn: document.getElementById('resetFormBtn'),
  resetDataBtn: document.getElementById('resetDataBtn'),
  list: document.getElementById('collegeList'),
  statTotal: document.getElementById('statTotal'),
  statFeatured: document.getElementById('statFeatured'),
  statStreams: document.getElementById('statStreams'),
  changePasswordForm: document.getElementById('changePasswordForm'),
  oldPassword: document.getElementById('oldPassword'),
  newPassword: document.getElementById('newPassword'),
  exportJsonBtn: document.getElementById('exportJsonBtn'),
  exportCsvBtn: document.getElementById('exportCsvBtn'),
  importFile: document.getElementById('importFile'),
  importMode: document.getElementById('importMode'),
  importBtn: document.getElementById('importBtn'),
  fields: {
    name: document.getElementById('collegeName'),
    location: document.getElementById('collegeLocation'),
    state: document.getElementById('collegeState'),
    stream: document.getElementById('collegeStream'),
    rank: document.getElementById('collegeRank'),
    fees: document.getElementById('collegeFees'),
    approval: document.getElementById('collegeApproval'),
    type: document.getElementById('collegeType'),
    image: document.getElementById('collegeImage'),
    logo: document.getElementById('collegeLogo'),
    tags: document.getElementById('collegeTags'),
    detailsUrl: document.getElementById('collegeDetailsUrl'),
    description: document.getElementById('collegeDescription'),
    featured: document.getElementById('collegeFeatured')
  }
};

const state = {
  editingId: null,
  eventsBound: false,
  colleges: []
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isAuthenticated() {
  return store.isAdminLoggedIn();
}

function setVisibility(isUnlocked) {
  ui.authGate.classList.toggle('is-hidden', isUnlocked);
  ui.adminHero.classList.toggle('is-hidden', !isUnlocked);
  ui.adminMain.classList.toggle('is-hidden', !isUnlocked);
  ui.adminFooter.classList.toggle('is-hidden', !isUnlocked);
  ui.logoutBtn.classList.toggle('is-hidden', !isUnlocked);

  if (ui.loginLink) {
    ui.loginLink.classList.toggle('is-hidden', isUnlocked);
  }
  if (ui.registerLink) {
    ui.registerLink.classList.toggle('is-hidden', isUnlocked);
  }
}

async function loadColleges() {
  state.colleges = await store.getColleges();
  return state.colleges;
}

async function unlockAdminPanel() {
  setVisibility(true);

  if (!state.eventsBound) {
    bindEvents();
    state.eventsBound = true;
  }

  resetForm();
  await renderList();
}

function lockAdminPanel() {
  store.logoutAdmin();
  setVisibility(false);
  if (ui.passwordInput) {
    ui.passwordInput.value = '';
    ui.passwordInput.focus();
  }
}

function getFormData() {
  return {
    name: ui.fields.name.value.trim(),
    location: ui.fields.location.value.trim(),
    state: ui.fields.state.value.trim(),
    stream: ui.fields.stream.value,
    rank: Number(ui.fields.rank.value),
    fees: Number(ui.fields.fees.value),
    approval: ui.fields.approval.value.trim(),
    type: ui.fields.type.value.trim(),
    image: ui.fields.image.value.trim(),
    logo: ui.fields.logo.value.trim(),
    tags: ui.fields.tags.value,
    detailsUrl: ui.fields.detailsUrl.value.trim() || '#',
    description: ui.fields.description.value.trim(),
    featured: ui.fields.featured.checked
  };
}

function fillForm(college) {
  ui.fields.name.value = college.name || '';
  ui.fields.location.value = college.location || '';
  ui.fields.state.value = college.state || '';
  ui.fields.stream.value = college.stream || 'Engineering';
  ui.fields.rank.value = college.rank || '';
  ui.fields.fees.value = college.fees || '';
  ui.fields.approval.value = college.approval || '';
  ui.fields.type.value = college.type || '';
  ui.fields.image.value = college.image || '';
  ui.fields.logo.value = college.logo || '';
  ui.fields.tags.value = (college.tags || []).join(', ');
  ui.fields.detailsUrl.value = college.detailsUrl || '#';
  ui.fields.description.value = college.description || '';
  ui.fields.featured.checked = Boolean(college.featured);
}

function resetForm() {
  ui.form.reset();
  state.editingId = null;
  ui.fields.detailsUrl.value = '#';
  ui.formMode.textContent = 'Add Mode';
  ui.saveBtn.innerHTML = '<i class="bi bi-save me-1"></i> Save College';
}

function renderStats(colleges) {
  ui.statTotal.textContent = colleges.length;
  ui.statFeatured.textContent = colleges.filter(function (college) { return college.featured; }).length;
  ui.statStreams.textContent = new Set(colleges.map(function (college) { return college.stream; })).size;
}

async function renderList() {
  const colleges = (await loadColleges()).slice().sort(function (a, b) {
    return Number(b.createdAt || 0) - Number(a.createdAt || 0);
  });

  renderStats(colleges);

  if (!colleges.length) {
    ui.list.innerHTML = '<div class="empty-admin">No colleges found. Add your first college using the form.</div>';
    return;
  }

  ui.list.innerHTML = colleges.map(function (college) {
    return '<article class="list-item" data-id="' + escapeHtml(college.id) + '">' +
      '<div class="list-top">' +
        '<div>' +
          '<div class="list-name">' + escapeHtml(college.name) + '</div>' +
          '<div class="list-meta">' + escapeHtml(college.location) + ' | Rank #' + escapeHtml(college.rank) + ' | Fees ₹' + escapeHtml(college.fees) + ' L/yr</div>' +
        '</div>' +
        '<span class="badge-stream">' + escapeHtml(college.stream) + '</span>' +
      '</div>' +
      '<div class="item-actions">' +
        '<button type="button" class="edit-btn"><i class="bi bi-pencil-square me-1"></i>Edit</button>' +
        '<button type="button" class="delete-btn"><i class="bi bi-trash me-1"></i>Delete</button>' +
      '</div>' +
    '</article>';
  }).join('');
}

async function onSubmit(event) {
  event.preventDefault();

  const payload = getFormData();
  if (!payload.name || !payload.location || !payload.state || !payload.description) {
    showToast('Please fill all required fields.', 'error');
    return;
  }

  try {
    if (state.editingId) {
      await store.updateCollege(state.editingId, payload);
      showToast('College updated successfully.', 'success');
    } else {
      await store.addCollege(payload);
      showToast('College added successfully.', 'success');
    }

    resetForm();
    await renderList();
  } catch (error) {
    showToast(error.message || 'Action failed.', 'error');
  }
}

async function onListAction(event) {
  const item = event.target.closest('.list-item');
  if (!item) {
    return;
  }

  const id = item.dataset.id;
  const college = state.colleges.find(function (entry) { return entry.id === id; });
  if (!college) {
    return;
  }

  if (event.target.closest('.edit-btn')) {
    state.editingId = id;
    fillForm(college);
    ui.formMode.textContent = 'Edit Mode';
    ui.saveBtn.innerHTML = '<i class="bi bi-check2-circle me-1"></i> Update College';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  if (event.target.closest('.delete-btn')) {
    const confirmed = window.confirm('Delete this college record?');
    if (!confirmed) {
      return;
    }

    try {
      await store.deleteCollege(id);
      if (state.editingId === id) {
        resetForm();
      }
      showToast('College removed.', 'success');
      await renderList();
    } catch (error) {
      showToast(error.message || 'Delete failed.', 'error');
    }
  }
}

function triggerDownload(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function exportJson() {
  const colleges = await store.getColleges();
  const content = store.exportJson(colleges);
  triggerDownload('colleges-export.json', content, 'application/json');
  showToast('JSON exported.', 'success');
}

async function exportCsv() {
  const colleges = await store.getColleges();
  const content = store.exportCsv(colleges);
  triggerDownload('colleges-export.csv', content, 'text/csv;charset=utf-8;');
  showToast('CSV exported.', 'success');
}

async function importFileData() {
  const file = ui.importFile.files[0];
  if (!file) {
    showToast('Please choose a file to import.', 'error');
    return;
  }

  const mode = ui.importMode.value === 'replace' ? 'replace' : 'merge';
  const text = await file.text();
  let parsed = [];

  try {
    if (file.name.toLowerCase().endsWith('.json')) {
      const data = JSON.parse(text);
      parsed = Array.isArray(data) ? data : [];
    } else if (file.name.toLowerCase().endsWith('.csv')) {
      parsed = store.parseCsv(text);
    } else {
      showToast('Only JSON and CSV are supported.', 'error');
      return;
    }

    if (!parsed.length) {
      showToast('No valid records found in file.', 'error');
      return;
    }

    await store.importColleges(parsed, mode);
    ui.importFile.value = '';
    showToast('Import completed successfully.', 'success');
    await renderList();
  } catch (error) {
    showToast(error.message || 'Import failed.', 'error');
  }
}

async function updatePassword(event) {
  event.preventDefault();

  const oldPassword = ui.oldPassword.value.trim();
  const newPassword = ui.newPassword.value.trim();

  if (!oldPassword || !newPassword) {
    showToast('Please enter both passwords.', 'error');
    return;
  }

  if (newPassword.length < 6) {
    showToast('New password must be at least 6 characters.', 'error');
    return;
  }

  try {
    await store.changePassword(oldPassword, newPassword);
    ui.changePasswordForm.reset();
    showToast('Password changed successfully.', 'success');
  } catch (error) {
    showToast(error.message || 'Password change failed.', 'error');
  }
}

function bindEvents() {
  ui.logoutBtn.addEventListener('click', function () {
    lockAdminPanel();
    showToast('You are logged out from admin panel.', 'info');
  });

  ui.form.addEventListener('submit', function (event) {
    onSubmit(event).catch(function (error) {
      showToast(error.message || 'Action failed.', 'error');
    });
  });

  ui.list.addEventListener('click', function (event) {
    onListAction(event).catch(function (error) {
      showToast(error.message || 'Action failed.', 'error');
    });
  });

  ui.resetFormBtn.addEventListener('click', function () {
    resetForm();
    showToast('Form cleared.', 'info');
  });

  ui.resetDataBtn.addEventListener('click', function () {
    const confirmed = window.confirm('Reset all colleges to default data? This will remove your custom entries.');
    if (!confirmed) {
      return;
    }

    store.resetColleges()
      .then(function () {
        resetForm();
        return renderList();
      })
      .then(function () {
        showToast('Default college data restored.', 'success');
      })
      .catch(function (error) {
        showToast(error.message || 'Reset failed.', 'error');
      });
  });

  ui.changePasswordForm.addEventListener('submit', function (event) {
    updatePassword(event).catch(function (error) {
      showToast(error.message || 'Password update failed.', 'error');
    });
  });

  ui.exportJsonBtn.addEventListener('click', function () {
    exportJson().catch(function (error) {
      showToast(error.message || 'Export failed.', 'error');
    });
  });

  ui.exportCsvBtn.addEventListener('click', function () {
    exportCsv().catch(function (error) {
      showToast(error.message || 'Export failed.', 'error');
    });
  });

  ui.importBtn.addEventListener('click', function () {
    importFileData().catch(function (error) {
      showToast(error.message || 'Import failed.', 'error');
    });
  });
}

async function init() {
  if (!store || !ui.form || !ui.loginForm) {
    return;
  }

  ui.loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const password = String(ui.passwordInput.value || '').trim();

    store.loginAdmin(password)
      .then(function () {
        ui.authError.textContent = '';
        showToast('Admin panel unlocked.', 'success');
        return unlockAdminPanel();
      })
      .catch(function (error) {
        ui.authError.textContent = error.message || 'Incorrect password. Please try again.';
        showToast(error.message || 'Login failed.', 'error');
      });
  });

  if (isAuthenticated()) {
    await unlockAdminPanel();
  } else {
    lockAdminPanel();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  init().catch(function () {
    showToast('Unable to initialize admin panel.', 'error');
  });
});
