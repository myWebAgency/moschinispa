const db = require('../../config/database');

const PERMISSION_ACTIONS = [
  { action: 'view', label: 'Visualizzazione', icon: '👁' },
  { action: 'create', label: 'Creazione / Modifica', icon: '✏' },
  { action: 'delete', label: 'Eliminazione', icon: '✕' },
];

const PERMISSION_SECTIONS = [
  { key: 'contents', label: 'Contenuti testuali', desc: 'Hero, Visione, Fondatore, Citazioni, Footer' },
  { key: 'projects', label: 'Progetti', desc: 'Gestione iniziative e fondazioni' },
  { key: 'media', label: 'Media', desc: 'Libreria media, upload e gestione file' },
  { key: 'menu', label: 'Navigazione', desc: 'Voci del menu header' },
  { key: 'footer', label: 'Footer', desc: 'Voci delle colonne footer' },
  { key: 'seo', label: 'SEO & Analytics', desc: 'Meta tag, GA4, Search Console' },
  { key: 'users', label: 'Utenti & Permessi', desc: 'Gestione utenti e ruoli' },
];

// Build flat list for backwards compatibility
const ALL_PERMISSIONS = [];
for (const section of PERMISSION_SECTIONS) {
  for (const act of PERMISSION_ACTIONS) {
    ALL_PERMISSIONS.push({
      key: `${section.key}:${act.action}`,
      section: section.key,
      action: act.action,
      label: section.label,
      actionLabel: act.label,
      desc: section.desc,
    });
  }
}

const Role = {
  getAll() {
    return db.all('SELECT * FROM roles ORDER BY sort_order, name');
  },

  getById(id) {
    return db.get('SELECT * FROM roles WHERE id = ?', [id]);
  },

  getByName(name) {
    return db.get('SELECT * FROM roles WHERE name = ?', [name]);
  },

  create(name, label, permissions) {
    const permsStr = Array.isArray(permissions) ? permissions.join(',') : permissions;
    return db.run('INSERT INTO roles (name, label, permissions) VALUES (?, ?, ?)', [name, label, permsStr]);
  },

  update(id, data) {
    const permsStr = Array.isArray(data.permissions) ? data.permissions.join(',') : (data.permissions || '');
    return db.run('UPDATE roles SET name = ?, label = ?, permissions = ?, updated_at = datetime("now") WHERE id = ?',
      [data.name, data.label, permsStr, id]);
  },

  delete(id) {
    return db.run('DELETE FROM roles WHERE id = ?', [id]);
  },

  getPermissionsForRole(roleName) {
    const role = this.getByName(roleName);
    if (!role) return ['dashboard'];
    const perms = role.permissions ? role.permissions.split(',').filter(Boolean) : [];
    return ['dashboard', ...perms];
  },

  getAllPermissions() {
    return ALL_PERMISSIONS;
  },

  getPermissionSections() {
    return PERMISSION_SECTIONS;
  },

  getPermissionActions() {
    return PERMISSION_ACTIONS;
  },
};

module.exports = Role;
