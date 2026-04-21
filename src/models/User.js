const db = require('../../config/database');
const bcrypt = require('bcryptjs');

const User = {
  findByEmail(email) {
    return db.get('SELECT * FROM users WHERE email = ?', [email]);
  },

  findById(id) {
    return db.get('SELECT id, email, first_name, last_name, role, created_at FROM users WHERE id = ?', [id]);
  },

  getAll() {
    return db.all('SELECT id, email, first_name, last_name, role, created_at, updated_at FROM users ORDER BY created_at DESC');
  },

  create(data) {
    const hash = bcrypt.hashSync(data.password, 10);
    return db.run('INSERT INTO users (email, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?)',
      [data.email, hash, data.first_name, data.last_name, data.role || 'editor']);
  },

  update(id, data) {
    const fields = [];
    const values = [];
    if (data.first_name !== undefined) { fields.push('first_name = ?'); values.push(data.first_name); }
    if (data.last_name !== undefined) { fields.push('last_name = ?'); values.push(data.last_name); }
    if (data.email) { fields.push('email = ?'); values.push(data.email); }
    if (data.role) { fields.push('role = ?'); values.push(data.role); }
    if (data.password) { fields.push('password = ?'); values.push(bcrypt.hashSync(data.password, 10)); }
    fields.push('updated_at = datetime("now")');
    values.push(id);
    return db.run(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
  },

  delete(id) {
    return db.run('DELETE FROM users WHERE id = ?', [id]);
  },

  verifyPassword(plain, hash) {
    return bcrypt.compareSync(plain, hash);
  },

  fullName(user) {
    return [user.first_name, user.last_name].filter(Boolean).join(' ') || user.email;
  }
};

module.exports = User;
