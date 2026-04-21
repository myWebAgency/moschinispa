const db = require('../../config/database');

const SeoSetting = {
  getAll() {
    const rows = db.all('SELECT * FROM seo_settings');
    const obj = {};
    for (const r of rows) obj[r.key] = r.value;
    return obj;
  },

  get(key) {
    const row = db.get('SELECT value FROM seo_settings WHERE key = ?', [key]);
    return row ? row.value : '';
  },

  set(key, value) {
    return db.run(`
      INSERT INTO seo_settings (key, value) VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = datetime("now")
    `, [key, value, value]);
  }
};

module.exports = SeoSetting;
