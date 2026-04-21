const db = require('../../config/database');

const FooterItem = {
  getAll() {
    return db.all('SELECT * FROM footer_items ORDER BY column_name, sort_order');
  },

  getGrouped() {
    const rows = this.getAll();
    const grouped = {};
    for (const row of rows) {
      if (!grouped[row.column_name]) grouped[row.column_name] = [];
      grouped[row.column_name].push(row);
    }
    return grouped;
  },

  getById(id) {
    return db.get('SELECT * FROM footer_items WHERE id = ?', [id]);
  },

  create(data) {
    return db.run('INSERT INTO footer_items (column_name, label, href, type, sort_order) VALUES (?, ?, ?, ?, ?)',
      [data.column_name, data.label, data.href || '', data.type || 'link', data.sort_order || 0]);
  },

  update(id, data) {
    return db.run('UPDATE footer_items SET column_name = ?, label = ?, href = ?, type = ?, sort_order = ?, visible = ?, updated_at = datetime("now") WHERE id = ?',
      [data.column_name, data.label, data.href || '', data.type || 'link', data.sort_order || 0, data.visible ? 1 : 0, id]);
  },

  delete(id) {
    return db.run('DELETE FROM footer_items WHERE id = ?', [id]);
  }
};

module.exports = FooterItem;
