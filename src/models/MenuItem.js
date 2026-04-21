const db = require('../../config/database');

const MenuItem = {
  getAll() {
    return db.all('SELECT * FROM menu_items ORDER BY sort_order');
  },

  getVisible() {
    return db.all('SELECT * FROM menu_items WHERE visible = 1 ORDER BY sort_order');
  },

  getById(id) {
    return db.get('SELECT * FROM menu_items WHERE id = ?', [id]);
  },

  create(label, href, sort_order = 0) {
    return db.run('INSERT INTO menu_items (label, href, sort_order) VALUES (?, ?, ?)', [label, href, sort_order]);
  },

  update(id, data) {
    return db.run('UPDATE menu_items SET label = ?, href = ?, sort_order = ?, visible = ?, updated_at = datetime("now") WHERE id = ?',
      [data.label, data.href, data.sort_order || 0, data.visible ? 1 : 0, id]);
  },

  delete(id) {
    return db.run('DELETE FROM menu_items WHERE id = ?', [id]);
  }
};

module.exports = MenuItem;
