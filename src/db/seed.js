const { initDatabase } = require('./init');
const db = require('../../config/database');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });

async function seed() {
  await initDatabase();

  // --- Admin user ---
  const hashedPw = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'Moschini2024!', 10);
  const existingUser = db.get('SELECT id FROM users WHERE email = ?', [process.env.ADMIN_EMAIL || 'admin@moschinispa.it']);
  if (!existingUser) {
    db.run('INSERT INTO users (email, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?)',
      [process.env.ADMIN_EMAIL || 'admin@moschinispa.it', hashedPw, 'Admin', 'Moschini', 'admin']);
  }

  // --- Contents ---
  const contents = [
    ['hero', 'eyebrow', 'Imprenditoria · Design · Territorio', 'text', 'Eyebrow hero'],
    ['hero', 'title', 'Una storia<br>di <em>visione</em><br>e radici', 'html', 'Titolo hero'],
    ['hero', 'subtitle', "Moschini S.p.A. è la holding fondata nel 2002 da Franco Moschini. Un'eredità che unisce cultura del progetto e profondo legame con le Marche.", 'text', 'Sottotitolo hero'],
    ['visione', 'label', 'La Holding', 'text', 'Label sezione'],
    ['visione', 'title', 'Visione, territorio, eredità', 'text', 'Titolo sezione'],
    ['visione', 'body', 'Nata nel 2002 su iniziativa di Franco Moschini, quale holding operativa per una gestione più funzionale delle partecipazioni fino ad allora possedute personalmente. Negli anni la holding ha gestito diverse partecipazioni industriali, controllando per un lungo periodo il Gruppo Poltrona Frau e ampliando progressivamente il proprio perimetro con nuove acquisizioni, marchi e asset immobiliari.<br><br>Dal 2014 la governance di Moschini S.p.A. è affidata ad un family trust, proseguendo le proprie attività nel solco dei valori e della visione tracciati dal fondatore. Un modello alimentato dall\'integrità del patrimonio industriale e culturale costruito su radici profonde, capace di coniugare eredità storica e di proiettarsi nel futuro, nel rispetto dei principi del "bello, buono e ben fatto" che hanno sempre guidato il suo fondatore.', 'html', 'Testo holding'],
    ['quote1', 'text', '«Come imprenditore ho cercato di coltivare l\'immaginazione, la <em>sperimentazione</em> e l\'<em>innovazione</em>. Ho guardato la storia, ho aggiunto un sogno e una <em>sana follia</em> senza la quale è imprudente vivere.»', 'html', 'Citazione 1'],
    ['quote1', 'author', 'Franco Moschini — Fondatore', 'text', 'Autore citazione 1'],
    ['fondatore', 'label', 'IL FONDATORE', 'text', 'Label fondatore'],
    ['fondatore', 'name', 'Franco Moschini', 'text', 'Nome fondatore'],
    ['fondatore', 'bio_p1', 'Nato a Macerata il 10 giugno 1934, Franco Moschini ha costruito una delle storie più significative del design e dell\'imprenditoria italiana, unendo cultura del progetto, qualità manifatturiera e visione internazionale.', 'text', 'Bio paragrafo 1'],
    ['fondatore', 'bio_p2', 'Dopo il matrimonio con Isabella Brandi (1962), nipote di Nazareno Gabrielli, Moschini assunse la guida di Poltrona Frau e ne accompagnò l\'evoluzione per oltre cinquant\'anni. Con una scelta strategica e identitaria, trasferì la lavorazione da Torino a Tolentino, rafforzando un legame profondo con le competenze artigianali del territorio e valorizzando la tradizione marchigiana della lavorazione della pelle.', 'text', 'Bio paragrafo 2'],
    ['fondatore', 'bio_p3', 'Sotto la sua guida Poltrona Frau si è affermata come marchio globale di eleganza e innovazione, dialogando con figure chiave del design e dell\'architettura, tra cui Gio Ponti, Gae Aulenti, Ferdinand Porsche e Michele De Lucchi. A De Lucchi Moschini affidò anche il progetto del Poltrona Frau Museum, realizzato in occasione del centenario dell\'azienda come luogo di incontro tra storia, cultura del prodotto e futuro del design.', 'text', 'Bio paragrafo 3'],
    ['fondatore', 'bio_p4', 'Nel 2002 fondò Moschini S.p.A., avviando investimenti e iniziative anche in ambiti innovativi, e dedicando una parte importante del proprio impegno alla promozione culturale e artistica del territorio. Nel corso della sua carriera ha ricevuto riconoscimenti istituzionali e culturali, tra cui il titolo di Cavaliere del Lavoro, la laurea honoris causa in Economia Aziendale dall\'Università di Macerata e il Compasso d\'Oro alla carriera.', 'text', 'Bio paragrafo 4'],
    ['fondatore', 'bio_p5', 'La sua filosofia racconta l\'anima di un uomo che ha voluto e saputo coniugare tradizione e innovazione, radici e visione globale, in un percorso unico e ispiratore.', 'text', 'Bio paragrafo 5'],
    ['quote2', 'text', '«Ho sempre amato questa terra che, da sempre, mi ospita e da cui ho attinto risorse per le mie attività imprenditoriali. Ora ho deciso di rendere al territorio ciò che negli anni mi ha generosamente dato sotto forma di <em>cultura, conoscenza</em> e <em>indicazioni per le nuove generazioni</em>.»', 'html', 'Citazione 2'],
    ['quote2', 'author', 'Franco Moschini', 'text', 'Autore citazione 2'],
    ['projects', 'label', 'Impegno nel Territorio', 'text', 'Label progetti'],
    ['projects', 'title', 'Quattro progetti,<br><em>una sola visione</em>', 'html', 'Titolo progetti'],
    ['projects', 'subtitle', 'Franco Moschini è stato un mecenate vicino alla propria comunità, con l\'obiettivo di restituire valore al territorio e di sostenere soprattutto le nuove generazioni attraverso cultura, formazione e progetti concreti.', 'text', 'Sottotitolo progetti'],
    ['footer', 'description', 'Holding italiana fondata da Franco Moschini. Imprenditoria, design e cultura nelle Marche.', 'text', 'Descrizione footer'],
    ['footer', 'email', 'info@moschinispa.it', 'text', 'Email'],
    ['footer', 'phone', '+39 0733 974511', 'text', 'Telefono'],
    ['footer', 'copyright', '© 2026 Moschini S.p.A. — Tutti i diritti riservati', 'text', 'Copyright'],
    ['seo', 'title', 'Moschini S.p.A. — Heritage, Visione, Territorio', 'text', 'Titolo pagina'],
    ['seo', 'description', "Moschini S.p.A. è la holding fondata da Franco Moschini nel 2002. Un'eredità imprenditoriale e culturale radicata nel cuore delle Marche.", 'text', 'Meta description'],
    ['seo', 'og_title', 'Moschini S.p.A. — Heritage, Visione, Territorio', 'text', 'Open Graph title'],
    ['seo', 'og_description', 'Holding fondata da Franco Moschini nel 2002. Imprenditoria, cultura, design e territorio nelle Marche.', 'text', 'Open Graph description'],
  ];

  for (const c of contents) {
    db.run('INSERT OR IGNORE INTO contents (section, key, value, type, label) VALUES (?, ?, ?, ?, ?)', c);
  }

  // --- Menu items ---
  const menuItems = [
    ['Home', '#home-top', 0],
    ['Visione', '#home-visione', 1],
    ['Fondatore', '#home-fondatore', 2],
    ['Iniziative', '#home-progetti', 3],
  ];
  for (const m of menuItems) {
    db.run('INSERT OR IGNORE INTO menu_items (label, href, sort_order) VALUES (?, ?, ?)', m);
  }

  // --- Footer items ---
  const footerItems = [
    ['nav', 'Home', '#home-top', 'link', 0],
    ['nav', 'Visione', '#home-visione', 'link', 1],
    ['nav', 'Fondatore', '#home-fondatore', 'link', 2],
    ['nav', 'Iniziative', '#home-progetti', 'link', 3],
    ['initiatives', 'Fondazione Franco Moschini', 'https://www.fondazionemoschini.it/', 'link', 0],
    ['initiatives', 'Politeama di Tolentino', 'https://www.politeama.org/', 'link', 1],
    ['initiatives', 'Design Terrae', 'https://www.designterrae.it/', 'link', 2],
    ['initiatives', 'Interno Marche', 'https://internomarche.it/', 'link', 3],
    ['initiatives', 'Jeppe', '', 'text', 4],
  ];
  for (const f of footerItems) {
    db.run('INSERT OR IGNORE INTO footer_items (column_name, label, href, type, sort_order) VALUES (?, ?, ?, ?, ?)', f);
  }

  // --- Projects ---
  const projects = [
    ['Fondazione · Ente del Terzo Settore', 'Fondazione Design Terrae', 'Design Terrae lavora per accompagnare la valle del Chienti verso una traiettoria di evoluzione e innovazione ispirata ai principi del "bello, buono e ben fatto", parole che hanno guidato, negli anni, l\'incedere di Franco Moschini in ogni sua attività. Si occupa di eventi, esperienze formative, comunicazione e supporto ad altre istituzioni.', 'fondazione-design-terrae.jpg', '2011 · Valle del Chienti', 0],
    ['Fondazione · Ente del Terzo Settore', 'Fondazione Franco Moschini', 'Nel 2014 istituì la Fondazione Franco Moschini, oggi Ente del Terzo Settore, nato per il recupero e la gestione del cine-teatro Politeama di Tolentino. Franco Moschini affidò il progetto a Michele De Lucchi, trasformando il Politeama, un luogo eclettico nato come cineteatro nel 1926, in un moderno hub creativo.\n\nIl Politeama oggi ospita spettacoli, eventi artistici ma anche incontri di carattere culturale e sociale rivolti a tutto il maceratese. Nel Consiglio direttivo, per espressa volontà del fondatore, è rappresentato il Comune di Tolentino.', 'fondazione-franco-moschini.jpg', '2014 · Tolentino', 1],
    ['Design Hotel · Ospitalità d\'Eccellenza', 'Interno Marche', 'Sempre a Moschini si deve poi il recupero di uno dei palazzi simbolo della città di Tolentino, la mitica "Villa Gabrielli" che nel 2024 diviene Interno Marche: un design hotel che unisce accoglienza, progetto, memoria e cultura.\n\nL\'obiettivo è rafforzare l\'attrattività del tolentinate posizionandolo in un circuito internazionale di eccellenza.', 'interno-marche.jpg', '2024 · Villa Gabrielli, Tolentino', 2],
    ['Progetto Sociale · In Corso', 'Jeppe', 'Un progetto a vocazione sociale, gestito con la Cooperativa Esserci sotto l\'egida della Fondazione Design Terrae.\n\nLa sua missione è trasformare una proprietà della Moschini S.p.A. a San Severino Marche in un luogo capace di generare valore locale, rispondendo ai bisogni e alle vocazioni del territorio attraverso iniziative inclusive e sostenibili.', 'jeppe.jpg', '2026 · San Severino Marche', 3],
  ];
  for (const p of projects) {
    db.run('INSERT OR IGNORE INTO projects (badge, title, description, image, year_label, sort_order) VALUES (?, ?, ?, ?, ?, ?)', p);
  }

  // --- SEO settings ---
  const seoSettings = [
    ['site_url', 'https://moschinispa.it'],
    ['og_type', 'website'],
    ['theme_color', '#fafaf8'],
    ['ga_id', process.env.GA_MEASUREMENT_ID || ''],
  ];
  for (const s of seoSettings) {
    db.run('INSERT OR IGNORE INTO seo_settings (key, value) VALUES (?, ?)', s);
  }

  // --- Roles ---
  const roles = [
    ['admin', 'Amministratore', 'contents:view,contents:create,contents:delete,projects:view,projects:create,projects:delete,media:view,media:create,media:delete,menu:view,menu:create,menu:delete,footer:view,footer:create,footer:delete,seo:view,seo:create,seo:delete,users:view,users:create,users:delete', 0],
    ['content_manager', 'Content Manager', 'contents:view,contents:create,projects:view,projects:create,menu:view,menu:create,footer:view,footer:create', 1],
    ['media_manager', 'Media Manager', 'media:view,media:create,media:delete,contents:view', 2],
    ['editor', 'Editor', 'contents:view,contents:create', 3],
  ];
  for (const r of roles) {
    db.run('INSERT OR IGNORE INTO roles (name, label, permissions, sort_order) VALUES (?, ?, ?, ?)', r);
  }

  // --- Register static images in media library ---
  const path = require('path');
  const fs = require('fs');
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  const imageFiles = [
    { filename: 'logo-moschini.svg', category: 'brand', alt: 'Logo Moschini S.p.A.' },
    { filename: 'paesaggio-moschini.jpg', category: 'hero', alt: 'Paesaggio marchigiano' },
    { filename: 'franco-moschini.jpg', category: 'bio', alt: 'Franco Moschini' },
    { filename: 'fondazione-design-terrae.jpg', category: 'projects', alt: 'Fondazione Design Terrae' },
    { filename: 'fondazione-franco-moschini.jpg', category: 'projects', alt: 'Fondazione Franco Moschini' },
    { filename: 'interno-marche.jpg', category: 'projects', alt: 'Interno Marche' },
    { filename: 'jeppe.jpg', category: 'projects', alt: 'Jeppe' },
  ];
  for (const img of imageFiles) {
    const existing = db.get('SELECT id FROM media WHERE filename = ?', [img.filename]);
    if (!existing) {
      const filePath = path.join(imagesDir, img.filename);
      let size = 0;
      if (fs.existsSync(filePath)) {
        size = fs.statSync(filePath).size;
      }
      const ext = path.extname(img.filename).toLowerCase();
      const mimeMap = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
      db.run('INSERT INTO media (filename, original_name, mime_type, size, alt_text, category) VALUES (?, ?, ?, ?, ?, ?)',
        [img.filename, img.filename, mimeMap[ext] || 'image/jpeg', size, img.alt, img.category]);
    }
  }

  // --- Convert existing images to WebP variants ---
  const { convertStaticImage } = require('../middleware/imageProcessor');
  for (const img of imageFiles) {
    if (img.filename.endsWith('.svg')) continue;
    try {
      const variants = await convertStaticImage(img.filename);
      if (!variants) continue;
      const mediaRec = db.get('SELECT id FROM media WHERE filename = ?', [img.filename]);
      if (!mediaRec) continue;
      for (const v of variants) {
        db.run('INSERT OR REPLACE INTO media_variants (media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?)',
          [mediaRec.id, v.variant, v.filename, v.width, v.height, v.size]);
      }
      console.log(`  Converted ${img.filename}: ${variants.map(v => v.variant + '=' + (v.size/1024).toFixed(0) + 'KB').join(', ')}`);
    } catch(e) {
      console.log(`  Skip ${img.filename}: ${e.message}`);
    }
  }

  console.log('Database seeded successfully.');
}

module.exports = { seed };

if (require.main === module) {
  seed().then(() => process.exit(0));
}
