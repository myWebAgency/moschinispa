const db = require('../../config/database');

async function initDatabase() {
  await db.getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      first_name TEXT NOT NULL DEFAULT '',
      last_name TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL DEFAULT 'editor',
      created_at DATETIME DEFAULT (datetime('now')),
      updated_at DATETIME DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section TEXT NOT NULL,
      key TEXT NOT NULL,
      value TEXT NOT NULL DEFAULT '',
      type TEXT NOT NULL DEFAULT 'text',
      label TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT (datetime('now')),
      UNIQUE(section, key)
    );

    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size INTEGER NOT NULL DEFAULT 0,
      alt_text TEXT DEFAULT '',
      category TEXT DEFAULT 'general',
      created_at DATETIME DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL,
      href TEXT NOT NULL DEFAULT '#',
      sort_order INTEGER DEFAULT 0,
      visible INTEGER DEFAULT 1,
      updated_at DATETIME DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS footer_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      column_name TEXT NOT NULL DEFAULT 'nav',
      label TEXT NOT NULL,
      href TEXT DEFAULT '',
      type TEXT DEFAULT 'link',
      sort_order INTEGER DEFAULT 0,
      visible INTEGER DEFAULT 1,
      updated_at DATETIME DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      badge TEXT NOT NULL DEFAULT '',
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      image TEXT DEFAULT '',
      year_label TEXT DEFAULT '',
      link_url TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      visible INTEGER DEFAULT 1,
      updated_at DATETIME DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS seo_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value TEXT NOT NULL DEFAULT '',
      updated_at DATETIME DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS media_variants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      media_id INTEGER NOT NULL,
      variant TEXT NOT NULL,
      filename TEXT NOT NULL,
      width INTEGER DEFAULT 0,
      height INTEGER DEFAULT 0,
      size INTEGER DEFAULT 0,
      FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE,
      UNIQUE(media_id, variant)
    );

    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      label TEXT NOT NULL DEFAULT '',
      permissions TEXT NOT NULL DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT (datetime('now'))
    );
  `);

  // === Migrations for existing DBs (idempotent) ===
  try {
    const projectCols = db.all('PRAGMA table_info(projects)');
    if (!projectCols.some(c => c.name === 'link_url')) {
      db.exec("ALTER TABLE projects ADD COLUMN link_url TEXT DEFAULT ''");
      console.log('Migration: added link_url to projects');
    }
  } catch (e) {
    console.error('Migration error:', e);
  }

  console.log('Database tables created.');
}

module.exports = { initDatabase };

if (require.main === module) {
  initDatabase().then(() => console.log('Done.'));
}
