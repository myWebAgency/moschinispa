const db = require('../../config/database');

const Media = {
  getAll() {
    return db.all('SELECT * FROM media ORDER BY created_at DESC');
  },

  getById(id) {
    return db.get('SELECT * FROM media WHERE id = ?', [id]);
  },

  getByIdWithVariants(id) {
    const media = db.get('SELECT * FROM media WHERE id = ?', [id]);
    if (!media) return null;
    media.variants = db.all('SELECT * FROM media_variants WHERE media_id = ? ORDER BY width', [id]);
    return media;
  },

  getByCategory(category) {
    return db.all('SELECT * FROM media WHERE category = ? ORDER BY created_at DESC', [category]);
  },

  create(data) {
    return db.run('INSERT INTO media (filename, original_name, mime_type, size, alt_text, category) VALUES (?, ?, ?, ?, ?, ?)',
      [data.filename, data.original_name, data.mime_type, data.size, data.alt_text || '', data.category || 'general']);
  },

  getLastInsertId() {
    const row = db.get('SELECT last_insert_rowid() as id');
    return row ? row.id : null;
  },

  update(id, data) {
    return db.run('UPDATE media SET alt_text = ?, category = ? WHERE id = ?', [data.alt_text || '', data.category || 'general', id]);
  },

  delete(id) {
    // Variants are cascade-deleted via FK
    db.run('DELETE FROM media_variants WHERE media_id = ?', [id]);
    return db.run('DELETE FROM media WHERE id = ?', [id]);
  },

  // Variants
  addVariant(mediaId, variant) {
    return db.run(
      'INSERT OR REPLACE INTO media_variants (media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?)',
      [mediaId, variant.variant, variant.filename, variant.width, variant.height, variant.size]
    );
  },

  getVariants(mediaId) {
    return db.all('SELECT * FROM media_variants WHERE media_id = ? ORDER BY width', [mediaId]);
  },

  // Get media ID by filename
  getByFilename(filename) {
    return db.get('SELECT * FROM media WHERE filename = ?', [filename]);
  },
};

module.exports = Media;
