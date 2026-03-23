import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { DEFAULT_COLLEGES } from './defaults.js';

const PORT = process.env.PORT || 4000;
const DB_PATH = process.env.DB_PATH || './edtech.db';
const ADMIN_SETTING_KEY = 'admin_password_hash';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONTEND_DIR = path.resolve(__dirname, '../frontend');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const tokenStore = new Map();

function hashPassword(password) {
  return crypto.createHash('sha256').update(String(password || '')).digest('hex');
}

function cleanTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof tags === 'string') {
    return tags.split(',').map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

function normalizeCollege(input) {
  return {
    id: String(input.id || `c${Date.now()}${Math.floor(Math.random() * 1000)}`),
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
    tags: cleanTags(input.tags),
    featured: Boolean(input.featured),
    detailsUrl: String(input.detailsUrl || '#').trim() || '#',
    createdAt: Number(input.createdAt || Date.now())
  };
}

function issueToken() {
  const token = crypto.randomBytes(24).toString('hex');
  tokenStore.set(token, Date.now() + 1000 * 60 * 60 * 8);
  return token;
}

function requireAdmin(req, res, next) {
  const token = req.get('x-admin-token');
  if (!token || !tokenStore.has(token)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const expiry = tokenStore.get(token);
  if (Date.now() > expiry) {
    tokenStore.delete(token);
    return res.status(401).json({ message: 'Session expired' });
  }
  next();
}

let db;

async function seedIfNeeded() {
  const row = await db.get('SELECT COUNT(*) AS count FROM colleges');
  if (row.count > 0) {
    return;
  }

  const insertStmt = await db.prepare('INSERT INTO colleges (id, payload) VALUES (?, ?)');
  try {
    for (const college of DEFAULT_COLLEGES) {
      const normalized = normalizeCollege(college);
      await insertStmt.run(normalized.id, JSON.stringify(normalized));
    }
  } finally {
    await insertStmt.finalize();
  }
}

async function ensurePassword() {
  const existing = await db.get('SELECT value FROM settings WHERE key = ?', ADMIN_SETTING_KEY);
  if (!existing) {
    await db.run('INSERT INTO settings (key, value) VALUES (?, ?)', ADMIN_SETTING_KEY, hashPassword(DEFAULT_ADMIN_PASSWORD));
  }
}

async function initDb() {
  db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS colleges (
      id TEXT PRIMARY KEY,
      payload TEXT NOT NULL
    );
  `);

  await ensurePassword();
  await seedIfNeeded();
}

async function readColleges() {
  const rows = await db.all('SELECT payload FROM colleges');
  return rows
    .map((row) => {
      try {
        return normalizeCollege(JSON.parse(row.payload));
      } catch (error) {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => Number(a.rank || 9999) - Number(b.rank || 9999));
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'edtech-backend' });
});

app.post('/api/admin/login', async (req, res) => {
  const password = String(req.body?.password || '');
  const stored = await db.get('SELECT value FROM settings WHERE key = ?', ADMIN_SETTING_KEY);

  if (!stored || stored.value !== hashPassword(password)) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  return res.json({
    token: issueToken(),
    message: 'Login successful'
  });
});

app.post('/api/admin/change-password', requireAdmin, async (req, res) => {
  const oldPassword = String(req.body?.oldPassword || '');
  const newPassword = String(req.body?.newPassword || '');

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters' });
  }

  const stored = await db.get('SELECT value FROM settings WHERE key = ?', ADMIN_SETTING_KEY);
  if (!stored || stored.value !== hashPassword(oldPassword)) {
    return res.status(401).json({ message: 'Old password is incorrect' });
  }

  await db.run('UPDATE settings SET value = ? WHERE key = ?', hashPassword(newPassword), ADMIN_SETTING_KEY);
  return res.json({ message: 'Password updated successfully' });
});

app.get('/api/colleges', async (req, res) => {
  const colleges = await readColleges();
  res.json(colleges);
});

app.post('/api/colleges', requireAdmin, async (req, res) => {
  const college = normalizeCollege(req.body || {});

  if (!college.name || !college.location || !college.state) {
    return res.status(400).json({ message: 'name, location and state are required' });
  }

  await db.run('INSERT INTO colleges (id, payload) VALUES (?, ?)', college.id, JSON.stringify(college));
  res.status(201).json(college);
});

app.put('/api/colleges/:id', requireAdmin, async (req, res) => {
  const existing = await db.get('SELECT payload FROM colleges WHERE id = ?', req.params.id);
  if (!existing) {
    return res.status(404).json({ message: 'College not found' });
  }

  const merged = normalizeCollege({ ...JSON.parse(existing.payload), ...req.body, id: req.params.id });
  await db.run('UPDATE colleges SET payload = ? WHERE id = ?', JSON.stringify(merged), req.params.id);
  res.json(merged);
});

app.delete('/api/colleges/:id', requireAdmin, async (req, res) => {
  const result = await db.run('DELETE FROM colleges WHERE id = ?', req.params.id);
  if (!result.changes) {
    return res.status(404).json({ message: 'College not found' });
  }
  res.json({ message: 'College deleted' });
});

app.post('/api/colleges/reset', requireAdmin, async (req, res) => {
  await db.run('DELETE FROM colleges');
  const insertStmt = await db.prepare('INSERT INTO colleges (id, payload) VALUES (?, ?)');
  try {
    for (const college of DEFAULT_COLLEGES) {
      const normalized = normalizeCollege(college);
      await insertStmt.run(normalized.id, JSON.stringify(normalized));
    }
  } finally {
    await insertStmt.finalize();
  }

  res.json({ message: 'Reset completed', count: DEFAULT_COLLEGES.length });
});

app.post('/api/colleges/import', requireAdmin, async (req, res) => {
  const mode = req.body?.mode === 'replace' ? 'replace' : 'merge';
  const incoming = Array.isArray(req.body?.colleges) ? req.body.colleges.map(normalizeCollege) : [];

  if (!incoming.length) {
    return res.status(400).json({ message: 'No colleges to import' });
  }

  if (mode === 'replace') {
    await db.run('DELETE FROM colleges');
  }

  const upsert = await db.prepare(`
    INSERT INTO colleges (id, payload)
    VALUES (?, ?)
    ON CONFLICT(id) DO UPDATE SET payload=excluded.payload
  `);

  try {
    for (const college of incoming) {
      await upsert.run(college.id, JSON.stringify(college));
    }
  } finally {
    await upsert.finalize();
  }

  const total = await db.get('SELECT COUNT(*) AS count FROM colleges');
  res.json({ message: 'Import completed', total: total.count });
});

// Serve full frontend website from same server.
app.use(express.static(FRONTEND_DIR));

app.get('/', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start backend', error);
    process.exit(1);
  });
