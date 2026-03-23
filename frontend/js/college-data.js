;(function () {
  const STORAGE_KEY = 'ep-colleges-v1';
  const ADMIN_TOKEN_KEY = 'ep-admin-token';
  const API_BASE = window.EP_API_BASE || 'http://localhost:4000/api';

  const DEFAULT_COLLEGES = [
    {
      id: 'c1',
      name: 'Indian Institute of Technology Bombay',
      location: 'Powai, Mumbai, Maharashtra',
      state: 'Maharashtra',
      stream: 'Engineering',
      fees: 2.2,
      rank: 1,
      approval: 'NAAC A++',
      type: 'Deemed University',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/IITBMainBuildingCROP.jpg?width=900',
      logo: 'https://commons.wikimedia.org/wiki/Special:FilePath/IIT_Bombay_color_logo.svg?width=120',
      description: 'IIT Bombay is one of India\'s premier engineering institutions, known for top research, strong placements and global recognition.',
      tags: ['Autonomous', 'Engineering', 'Deemed University'],
      featured: true,
      detailsUrl: '#',
      createdAt: 1700000000001
    },
    {
      id: 'c2',
      name: 'COEP Technological University',
      location: 'Shivajinagar, Pune',
      state: 'Maharashtra',
      stream: 'Engineering',
      fees: 1.5,
      rank: 21,
      approval: 'NAAC A+',
      type: 'Autonomous',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/COEP_Main_building.JPG?width=900',
      logo: '',
      description: 'One of the oldest engineering institutions in Asia with strong academics and an excellent placement culture.',
      tags: ['Autonomous', 'Engineering'],
      featured: false,
      detailsUrl: '#',
      createdAt: 1700000000002
    },
    {
      id: 'c3',
      name: 'BITS Pilani',
      location: 'Pilani, Rajasthan',
      state: 'Rajasthan',
      stream: 'Engineering',
      fees: 5.3,
      rank: 26,
      approval: 'NAAC A',
      type: 'Private',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bits_Clock_tower.jpg?width=900',
      logo: '',
      description: 'A top private university known for academic flexibility, innovation and strong alumni outcomes.',
      tags: ['Private', 'Engineering'],
      featured: false,
      detailsUrl: '#',
      createdAt: 1700000000003
    },
    {
      id: 'c4',
      name: 'VIT Vellore',
      location: 'Vellore, Tamil Nadu',
      state: 'Tamil Nadu',
      stream: 'Engineering',
      fees: 3.9,
      rank: 11,
      approval: 'NAAC A++',
      type: 'Private',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/VIT_University_Main_Building.jpg?width=900',
      logo: '',
      description: 'Highly reputed private university with strong industry collaborations and outcomes.',
      tags: ['Private', 'Engineering'],
      featured: false,
      detailsUrl: '#',
      createdAt: 1700000000004
    },
    {
      id: 'c5',
      name: 'IIIT Hyderabad',
      location: 'Gachibowli, Hyderabad',
      state: 'Telangana',
      stream: 'Engineering',
      fees: 3.2,
      rank: 42,
      approval: 'NAAC A',
      type: 'Deemed University',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/IIIT_Hyderabad_-_Academic_block.jpg?width=900',
      logo: '',
      description: 'Leading institute for AI and Computer Science research with excellent research output and placements.',
      tags: ['AI & CS', 'Engineering'],
      featured: false,
      detailsUrl: '#',
      createdAt: 1700000000005
    },
    {
      id: 'c6',
      name: 'NIT Trichy',
      location: 'Tiruchirappalli, Tamil Nadu',
      state: 'Tamil Nadu',
      stream: 'Engineering',
      fees: 1.4,
      rank: 9,
      approval: 'NAAC A+',
      type: 'Government',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/NIT_Trichy_-_Main_Building.jpg?width=900',
      logo: '',
      description: 'One of the top NITs with strong academics, campus culture and impressive placements.',
      tags: ['Government', 'Engineering'],
      featured: false,
      detailsUrl: '#',
      createdAt: 1700000000006
    },
    {
      id: 'c7',
      name: 'XLRI - Xavier School of Management',
      location: 'Jamshedpur, Jharkhand',
      state: 'Jharkhand',
      stream: 'Management',
      fees: 24,
      rank: 5,
      approval: 'NAAC A+',
      type: 'Autonomous',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/XLRI_Jamshedpur_Front_Gate.jpg?width=900',
      logo: '',
      description: 'A prestigious management school with decades of legacy and strong industry relationships.',
      tags: ['Autonomous', 'Management'],
      featured: false,
      detailsUrl: '#',
      createdAt: 1700000000007
    },
    {
      id: 'c8',
      name: 'Manipal Academy of Higher Education',
      location: 'Manipal, Karnataka',
      state: 'Karnataka',
      stream: 'Medical',
      fees: 8.5,
      rank: 7,
      approval: 'NAAC A+',
      type: 'Deemed University',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Manipal_University_Main_Building.jpg?width=900',
      logo: '',
      description: 'Top health science university with modern hospitals and globally recognized programs.',
      tags: ['Medical', 'Deemed University'],
      featured: false,
      detailsUrl: '#',
      createdAt: 1700000000008
    },
    {
      id: 'c9',
      name: 'National Law School of India University',
      location: 'Bengaluru, Karnataka',
      state: 'Karnataka',
      stream: 'Law',
      fees: 2.7,
      rank: 1,
      approval: 'NAAC A++',
      type: 'Government',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/National_Law_School_of_India_University,_Bengaluru.jpg?width=900',
      logo: '',
      description: 'A benchmark for legal education in India and a top destination for CLAT toppers.',
      tags: ['Government', 'Law'],
      featured: false,
      detailsUrl: '#',
      createdAt: 1700000000009
    }
  ];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function parseTags(tags) {
    if (Array.isArray(tags)) {
      return tags.map(function (tag) { return String(tag).trim(); }).filter(Boolean);
    }
    if (typeof tags === 'string') {
      return tags.split(',').map(function (tag) { return tag.trim(); }).filter(Boolean);
    }
    return [];
  }

  function normalizeCollege(input) {
    return {
      id: input.id || 'c' + Date.now() + Math.floor(Math.random() * 1000),
      name: String(input.name || '').trim(),
      location: String(input.location || '').trim(),
      state: String(input.state || '').trim(),
      stream: String(input.stream || '').trim(),
      fees: Number(input.fees || 0),
      rank: Number(input.rank || 9999),
      approval: String(input.approval || '').trim(),
      type: String(input.type || '').trim(),
      image: String(input.image || '').trim(),
      logo: String(input.logo || '').trim(),
      description: String(input.description || '').trim(),
      tags: parseTags(input.tags),
      featured: Boolean(input.featured),
      detailsUrl: String(input.detailsUrl || '#').trim() || '#',
      createdAt: Number(input.createdAt || Date.now())
    };
  }

  function saveLocalColleges(colleges) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colleges.map(normalizeCollege)));
  }

  function getLocalColleges() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const seeded = clone(DEFAULT_COLLEGES);
        saveLocalColleges(seeded);
        return seeded;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || !parsed.length) {
        const seeded = clone(DEFAULT_COLLEGES);
        saveLocalColleges(seeded);
        return seeded;
      }
      return parsed.map(normalizeCollege);
    } catch (error) {
      const seeded = clone(DEFAULT_COLLEGES);
      saveLocalColleges(seeded);
      return seeded;
    }
  }

  function getToken() {
    return sessionStorage.getItem(ADMIN_TOKEN_KEY) || '';
  }

  function setToken(token) {
    if (token) {
      sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
      return;
    }
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  }

  async function request(path, options) {
    const config = options || {};
    const headers = Object.assign({}, config.headers || {}, {
      'Content-Type': 'application/json'
    });

    const token = getToken();
    if (token) {
      headers['x-admin-token'] = token;
    }

    const response = await fetch(API_BASE + path, Object.assign({}, config, {
      headers: headers
    }));

    let data = null;
    try {
      data = await response.json();
    } catch (error) {
      data = null;
    }

    if (!response.ok) {
      throw new Error((data && data.message) || 'Request failed');
    }

    return data;
  }

  async function getColleges() {
    try {
      const data = await request('/colleges');
      if (Array.isArray(data) && data.length) {
        saveLocalColleges(data);
        return data.map(normalizeCollege);
      }
      return [];
    } catch (error) {
      return getLocalColleges();
    }
  }

  async function loginAdmin(password) {
    const response = await request('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password: String(password || '') })
    });
    setToken(response.token || '');
    return response;
  }

  async function changePassword(oldPassword, newPassword) {
    return request('/admin/change-password', {
      method: 'POST',
      body: JSON.stringify({
        oldPassword: String(oldPassword || ''),
        newPassword: String(newPassword || '')
      })
    });
  }

  async function addCollege(college) {
    const payload = normalizeCollege(college);
    const created = await request('/colleges', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    const latest = await getColleges();
    saveLocalColleges(latest);
    return normalizeCollege(created);
  }

  async function updateCollege(id, updates) {
    const updated = await request('/colleges/' + encodeURIComponent(id), {
      method: 'PUT',
      body: JSON.stringify(updates || {})
    });
    const latest = await getColleges();
    saveLocalColleges(latest);
    return normalizeCollege(updated);
  }

  async function deleteCollege(id) {
    await request('/colleges/' + encodeURIComponent(id), {
      method: 'DELETE'
    });
    const latest = await getColleges();
    saveLocalColleges(latest);
    return latest;
  }

  async function resetColleges() {
    await request('/colleges/reset', {
      method: 'POST',
      body: JSON.stringify({})
    });
    const latest = await getColleges();
    saveLocalColleges(latest);
    return latest;
  }

  async function importColleges(colleges, mode) {
    return request('/colleges/import', {
      method: 'POST',
      body: JSON.stringify({
        colleges: Array.isArray(colleges) ? colleges.map(normalizeCollege) : [],
        mode: mode === 'replace' ? 'replace' : 'merge'
      })
    });
  }

  function exportJson(colleges) {
    return JSON.stringify(colleges || [], null, 2);
  }

  function exportCsv(colleges) {
    const rows = Array.isArray(colleges) ? colleges : [];
    const headers = ['id', 'name', 'location', 'state', 'stream', 'fees', 'rank', 'approval', 'type', 'image', 'logo', 'description', 'tags', 'featured', 'detailsUrl', 'createdAt'];

    const csvRows = [headers.join(',')];
    rows.forEach(function (college) {
      const normalized = normalizeCollege(college);
      const row = headers.map(function (key) {
        const value = key === 'tags' ? normalized.tags.join('|') : normalized[key];
        const safe = String(value == null ? '' : value).replace(/"/g, '""');
        return '"' + safe + '"';
      }).join(',');
      csvRows.push(row);
    });

    return csvRows.join('\n');
  }

  function parseCsv(text) {
    const lines = String(text || '').split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) {
      return [];
    }

    const headers = lines[0]
      .split(',')
      .map(function (h) { return h.trim().replace(/^"|"$/g, ''); });

    return lines.slice(1).map(function (line) {
      const values = [];
      let current = '';
      let inQuotes = false;

      for (let index = 0; index < line.length; index += 1) {
        const char = line[index];
        const next = line[index + 1];

        if (char === '"' && next === '"') {
          current += '"';
          index += 1;
          continue;
        }

        if (char === '"') {
          inQuotes = !inQuotes;
          continue;
        }

        if (char === ',' && !inQuotes) {
          values.push(current);
          current = '';
          continue;
        }

        current += char;
      }

      values.push(current);

      const item = {};
      headers.forEach(function (header, idx) {
        item[header] = values[idx] || '';
      });

      return normalizeCollege({
        id: item.id,
        name: item.name,
        location: item.location,
        state: item.state,
        stream: item.stream,
        fees: Number(item.fees || 0),
        rank: Number(item.rank || 9999),
        approval: item.approval,
        type: item.type,
        image: item.image,
        logo: item.logo,
        description: item.description,
        tags: String(item.tags || '').split('|').map(function (tag) { return tag.trim(); }).filter(Boolean),
        featured: String(item.featured).toLowerCase() === 'true',
        detailsUrl: item.detailsUrl,
        createdAt: Number(item.createdAt || Date.now())
      });
    });
  }

  window.eduCollegeStore = {
    getColleges: getColleges,
    getLocalColleges: getLocalColleges,
    saveLocalColleges: saveLocalColleges,
    addCollege: addCollege,
    updateCollege: updateCollege,
    deleteCollege: deleteCollege,
    resetColleges: resetColleges,
    importColleges: importColleges,
    exportJson: exportJson,
    exportCsv: exportCsv,
    parseCsv: parseCsv,
    loginAdmin: loginAdmin,
    changePassword: changePassword,
    isAdminLoggedIn: function () { return Boolean(getToken()); },
    logoutAdmin: function () { setToken(''); },
    defaults: clone(DEFAULT_COLLEGES)
  };
})();
