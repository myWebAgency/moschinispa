const db = require('../../config/database');

const Content = {
  getAll() {
    return db.all('SELECT * FROM contents ORDER BY section, sort_order');
  },

  getBySection(section) {
    return db.all('SELECT * FROM contents WHERE section = ? ORDER BY sort_order', [section]);
  },

  get(section, key) {
    const row = db.get('SELECT value FROM contents WHERE section = ? AND key = ?', [section, key]);
    return row ? row.value : '';
  },

  getGrouped() {
    const rows = this.getAll();
    const grouped = {};
    for (const row of rows) {
      if (!grouped[row.section]) grouped[row.section] = {};
      grouped[row.section][row.key] = row.value;
    }
    return grouped;
  },

  update(section, key, value) {
    return db.run('UPDATE contents SET value = ?, updated_at = datetime("now") WHERE section = ? AND key = ?', [value, section, key]);
  },

  upsert(section, key, value, type = 'text', label = '') {
    return db.run(`
      INSERT INTO contents (section, key, value, type, label) VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(section, key) DO UPDATE SET value = ?, updated_at = datetime("now")
    `, [section, key, value, type, label, value]);
  },

  getAllRaw() {
    return db.all('SELECT * FROM contents ORDER BY section, sort_order');
  }
};

module.exports = Content;
