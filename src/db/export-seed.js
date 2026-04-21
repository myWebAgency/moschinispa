const db = require('../../config/database');
const path = require('path');
const fs = require('fs');

function escape(val) {
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'number') return String(val);
  return "'" + String(val).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
}

function dumpTable(table, columns) {
  const rows = db.all(`SELECT ${columns.join(', ')} FROM ${table}`);
  if (!rows.length) return `  // ${table}: nessuna riga\n`;
  let out = `  // --- ${table} (${rows.length} righe) ---\n`;
  out += `  db.run('DELETE FROM ${table}');\n`;
  for (const row of rows) {
    const vals = columns.map(c => escape(row[c])).join(', ');
    const placeholders = columns.map(() => '?').join(', ');
    out += `  db.run('INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})', [${vals}]);\n`;
  }
  return out + '\n';
}

async function run() {
  await db.getDb();

  let seed = `// SEED COMPLETO generato automaticamente il ${new Date().toISOString()}
// Ripristina l'intero stato del DB dallo snapshot corrente.
// Uso: node src/db/seed-full.js
const { initDatabase } = require('./init');
const db = require('../../config/database');
require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });

async function seedFull() {
  await initDatabase();

`;

  seed += dumpTable('users', ['id', 'email', 'password', 'first_name', 'last_name', 'role', 'created_at', 'updated_at']);
  seed += dumpTable('contents', ['id', 'section', 'key', 'value', 'type', 'label', 'sort_order', 'updated_at']);
  seed += dumpTable('media', ['id', 'filename', 'original_name', 'mime_type', 'size', 'alt_text', 'category', 'created_at']);
  seed += dumpTable('media_variants', ['id', 'media_id', 'variant', 'filename', 'width', 'height', 'size']);
  seed += dumpTable('menu_items', ['id', 'label', 'href', 'sort_order', 'visible', 'updated_at']);
  seed += dumpTable('footer_items', ['id', 'column_name', 'label', 'href', 'type', 'sort_order', 'visible', 'updated_at']);
  seed += dumpTable('projects', ['id', 'badge', 'title', 'description', 'image', 'year_label', 'sort_order', 'visible', 'updated_at']);
  seed += dumpTable('seo_settings', ['id', 'key', 'value', 'updated_at']);
  seed += dumpTable('roles', ['id', 'name', 'label', 'permissions', 'sort_order', 'updated_at']);

  seed += `  console.log('Seed completo applicato.');
}

module.exports = { seedFull };

if (require.main === module) {
  seedFull().then(() => process.exit(0));
}
`;

  const outPath = path.join(__dirname, '..', '..', '..', 'backup', 'seed-full.js');
  fs.writeFileSync(outPath, seed, 'utf8');
  console.log('Seed scritto in:', outPath);
}

run().then(() => process.exit(0));
