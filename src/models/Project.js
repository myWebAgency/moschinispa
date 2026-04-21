const db = require('../../config/database');

const Project = {
  getAll() {
    return db.all('SELECT * FROM projects ORDER BY sort_order');
  },

  getVisible() {
    return db.all('SELECT * FROM projects WHERE visible = 1 ORDER BY sort_order');
  },

  getById(id) {
    return db.get('SELECT * FROM projects WHERE id = ?', [id]);
  },

  create(data) {
    return db.run('INSERT INTO projects (badge, title, description, image, year_label, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
      [data.badge, data.title, data.description, data.image || '', data.year_label || '', data.sort_order || 0]);
  },

  update(id, data) {
    return db.run('UPDATE projects SET badge = ?, title = ?, description = ?, image = ?, year_label = ?, sort_order = ?, visible = ?, updated_at = datetime("now") WHERE id = ?',
      [data.badge, data.title, data.description, data.image || '', data.year_label || '', data.sort_order || 0, data.visible ? 1 : 0, id]);
  },

  delete(id) {
    return db.run('DELETE FROM projects WHERE id = ?', [id]);
  }
};

module.exports = Project;
