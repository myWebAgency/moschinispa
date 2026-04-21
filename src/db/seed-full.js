// SEED COMPLETO generato automaticamente il 2026-04-21T13:01:38.801Z
// Ripristina l'intero stato del DB dallo snapshot corrente.
// Uso: node src/db/seed-full.js
const { initDatabase } = require('./init');
const db = require('../../config/database');
require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });

async function seedFull() {
  await initDatabase();

  // --- users (1 righe) ---
  db.run('DELETE FROM users');
  db.run('INSERT INTO users (id, email, password, first_name, last_name, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [1, 'admin@moschinispa.it', '$2a$10$lOteRGTa/jfgR.MfYMPs7OmU5SSS8IHD8QH5OfTUslAnmfiuEfYda', 'Admin', 'Moschini', 'admin', '2026-04-02 07:23:21', '2026-04-02 07:23:21']);

  // --- contents (28 righe) ---
  db.run('DELETE FROM contents');
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [1, 'hero', 'eyebrow', 'Imprenditoria · Design · Territorio', 'text', 'Eyebrow hero', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [2, 'hero', 'title', 'Una storia<br>di <em>visione</em><br>e radici', 'html', 'Titolo hero', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [3, 'hero', 'subtitle', 'Moschini S.p.A. è la holding fondata nel 2002 da Franco Moschini. Un\'eredità che unisce cultura del progetto e profondo legame con le Marche.', 'text', 'Sottotitolo hero', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [4, 'visione', 'label', 'La Holding', 'text', 'Label sezione', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [5, 'visione', 'title', 'Visione, territorio, eredità', 'text', 'Titolo sezione', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [6, 'visione', 'body', 'Nata nel 2002 su iniziativa di Franco Moschini, quale holding operativa per una gestione più funzionale delle partecipazioni fino ad allora possedute personalmente. Negli anni la holding ha gestito diverse partecipazioni industriali, controllando per un lungo periodo il Gruppo Poltrona Frau e ampliando progressivamente il proprio perimetro con nuove acquisizioni, marchi e asset immobiliari.<br><br>Dal 2014 la governance di Moschini S.p.A. è affidata ad un family trust, proseguendo le proprie attività nel solco dei valori e della visione tracciati dal fondatore. Un modello alimentato dall\'integrità del patrimonio industriale e culturale costruito su radici profonde, capace di coniugare eredità storica e di proiettarsi nel futuro, nel rispetto dei principi del "bello, buono e ben fatto" che hanno sempre guidato il suo fondatore.', 'html', 'Testo holding', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [7, 'quote1', 'text', '«Come imprenditore ho cercato di coltivare l\'immaginazione, la <em>sperimentazione</em> e l\'<em>innovazione</em>. Ho guardato la storia, ho aggiunto un sogno e una <em>sana follia</em> senza la quale è imprudente vivere.»', 'html', 'Citazione 1', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [8, 'quote1', 'author', 'Franco Moschini — Fondatore', 'text', 'Autore citazione 1', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [9, 'fondatore', 'label', 'IL FONDATORE', 'text', 'Label fondatore', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [10, 'fondatore', 'name', 'Franco Moschini', 'text', 'Nome fondatore', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [11, 'fondatore', 'bio_p1', 'Nato a Macerata il 10 giugno 1934, Franco Moschini ha costruito una delle storie più significative del design e dell\'imprenditoria italiana, unendo cultura del progetto, qualità manifatturiera e visione internazionale.', 'text', 'Bio paragrafo 1', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [12, 'fondatore', 'bio_p2', 'Dopo il matrimonio con Isabella Brandi (1962), nipote di Nazareno Gabrielli, Moschini assunse la guida di Poltrona Frau e ne accompagnò l\'evoluzione per oltre cinquant\'anni. Con una scelta strategica e identitaria, trasferì la lavorazione da Torino a Tolentino, rafforzando un legame profondo con le competenze artigianali del territorio e valorizzando la tradizione marchigiana della lavorazione della pelle.', 'text', 'Bio paragrafo 2', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [13, 'fondatore', 'bio_p3', 'Sotto la sua guida Poltrona Frau si è affermata come marchio globale di eleganza e innovazione, dialogando con figure chiave del design e dell\'architettura, tra cui Gio Ponti, Gae Aulenti, Ferdinand Porsche e Michele De Lucchi. A De Lucchi Moschini affidò anche il progetto del Poltrona Frau Museum, realizzato in occasione del centenario dell\'azienda come luogo di incontro tra storia, cultura del prodotto e futuro del design.', 'text', 'Bio paragrafo 3', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [14, 'fondatore', 'bio_p4', 'Nel 2002 fondò Moschini S.p.A., avviando investimenti e iniziative anche in ambiti innovativi, e dedicando una parte importante del proprio impegno alla promozione culturale e artistica del territorio. Nel corso della sua carriera ha ricevuto riconoscimenti istituzionali e culturali, tra cui il titolo di Cavaliere del Lavoro, la laurea honoris causa in Economia Aziendale dall\'Università di Macerata e il Compasso d\'Oro alla carriera.', 'text', 'Bio paragrafo 4', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [15, 'fondatore', 'bio_p5', 'La sua filosofia racconta l\'anima di un uomo che ha voluto e saputo coniugare tradizione e innovazione, radici e visione globale, in un percorso unico e ispiratore.', 'text', 'Bio paragrafo 5', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [16, 'quote2', 'text', '«Ho sempre amato questa terra che, da sempre, mi ospita e da cui ho attinto risorse per le mie attività imprenditoriali. Ora ho deciso di rendere al territorio ciò che negli anni mi ha generosamente dato sotto forma di <em>cultura, conoscenza</em> e <em>indicazioni per le nuove generazioni</em>.»', 'html', 'Citazione 2', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [17, 'quote2', 'author', 'Franco Moschini', 'text', 'Autore citazione 2', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [18, 'projects', 'label', 'Impegno nel Territorio', 'text', 'Label progetti', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [19, 'projects', 'title', 'Quattro progetti,<br><em>una sola visione</em>', 'html', 'Titolo progetti', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [20, 'projects', 'subtitle', 'Franco Moschini è stato un mecenate vicino alla propria comunità, con l\'obiettivo di restituire valore al territorio e di sostenere soprattutto le nuove generazioni attraverso cultura, formazione e progetti concreti.', 'text', 'Sottotitolo progetti', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [21, 'footer', 'description', 'Holding italiana fondata da Franco Moschini. Imprenditoria, design e cultura nelle Marche.', 'text', 'Descrizione footer', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [22, 'footer', 'email', 'info@moschinispa.it', 'text', 'Email', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [23, 'footer', 'phone', '+39 0733 974511', 'text', 'Telefono', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [24, 'footer', 'copyright', '© 2026 Moschini S.p.A. — Tutti i diritti riservati', 'text', 'Copyright', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [25, 'seo', 'title', 'Moschini S.p.A. — Heritage, Visione, Territorio', 'text', 'Titolo pagina', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [26, 'seo', 'description', 'Moschini S.p.A. è la holding fondata da Franco Moschini nel 2002. Un\'eredità imprenditoriale e culturale radicata nel cuore delle Marche.', 'text', 'Meta description', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [27, 'seo', 'og_title', 'Moschini S.p.A. — Heritage, Visione, Territorio', 'text', 'Open Graph title', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO contents (id, section, key, value, type, label, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [28, 'seo', 'og_description', 'Holding fondata da Franco Moschini nel 2002. Imprenditoria, cultura, design e territorio nelle Marche.', 'text', 'Open Graph description', 0, '2026-04-02 07:23:21']);

  // --- media (7 righe) ---
  db.run('DELETE FROM media');
  db.run('INSERT INTO media (id, filename, original_name, mime_type, size, alt_text, category, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [1, 'logo-moschini.svg', 'logo-moschini.svg', 'image/svg+xml', 2660, 'Logo Moschini S.p.A.', 'brand', '2026-04-02 07:23:21']);
  db.run('INSERT INTO media (id, filename, original_name, mime_type, size, alt_text, category, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [2, 'paesaggio-moschini.jpg', 'paesaggio-moschini.jpg', 'image/jpeg', 545218, 'Paesaggio marchigiano', 'hero', '2026-04-02 07:23:21']);
  db.run('INSERT INTO media (id, filename, original_name, mime_type, size, alt_text, category, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [3, 'franco-moschini.jpg', 'franco-moschini.jpg', 'image/jpeg', 1451645, 'Franco Moschini', 'bio', '2026-04-02 07:23:21']);
  db.run('INSERT INTO media (id, filename, original_name, mime_type, size, alt_text, category, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [4, 'fondazione-design-terrae.jpg', 'fondazione-design-terrae.jpg', 'image/jpeg', 951762, 'Fondazione Design Terrae', 'projects', '2026-04-02 07:23:21']);
  db.run('INSERT INTO media (id, filename, original_name, mime_type, size, alt_text, category, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [5, 'fondazione-franco-moschini.jpg', 'fondazione-franco-moschini.jpg', 'image/jpeg', 575489, 'Fondazione Franco Moschini', 'projects', '2026-04-02 07:23:21']);
  db.run('INSERT INTO media (id, filename, original_name, mime_type, size, alt_text, category, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [6, 'interno-marche.jpg', 'interno-marche.jpg', 'image/jpeg', 1389981, 'Interno Marche', 'projects', '2026-04-02 07:23:21']);
  db.run('INSERT INTO media (id, filename, original_name, mime_type, size, alt_text, category, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [7, 'jeppe.jpg', 'jeppe.jpg', 'image/jpeg', 929431, 'Jeppe', 'projects', '2026-04-02 07:23:21']);

  // --- media_variants (18 righe) ---
  db.run('DELETE FROM media_variants');
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [1, 2, 'small', 'paesaggio-moschini-small.webp', 320, 115, 6764]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [2, 2, 'medium', 'paesaggio-moschini-medium.webp', 640, 231, 24918]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [3, 2, 'large', 'paesaggio-moschini-large.webp', 1200, 433, 76118]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [4, 3, 'small', 'franco-moschini-small.webp', 320, 356, 16398]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [5, 3, 'medium', 'franco-moschini-medium.webp', 640, 711, 62026]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [6, 3, 'large', 'franco-moschini-large.webp', 1200, 1333, 212434]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [7, 4, 'small', 'fondazione-design-terrae-small.webp', 320, 480, 23082]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [8, 4, 'medium', 'fondazione-design-terrae-medium.webp', 640, 960, 60186]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [9, 4, 'large', 'fondazione-design-terrae-large.webp', 1200, 1800, 150778]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [10, 5, 'small', 'fondazione-franco-moschini-small.webp', 320, 453, 13314]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [11, 5, 'medium', 'fondazione-franco-moschini-medium.webp', 640, 905, 34758]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [12, 5, 'large', 'fondazione-franco-moschini-large.webp', 1200, 1697, 76006]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [13, 6, 'small', 'interno-marche-small.webp', 320, 417, 18144]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [14, 6, 'medium', 'interno-marche-medium.webp', 640, 833, 73242]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [15, 6, 'large', 'interno-marche-large.webp', 1200, 1563, 242812]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [16, 7, 'small', 'jeppe-small.webp', 320, 427, 26082]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [17, 7, 'medium', 'jeppe-medium.webp', 640, 854, 107218]);
  db.run('INSERT INTO media_variants (id, media_id, variant, filename, width, height, size) VALUES (?, ?, ?, ?, ?, ?, ?)', [18, 7, 'large', 'jeppe-large.webp', 1200, 1601, 364480]);

  // --- menu_items (4 righe) ---
  db.run('DELETE FROM menu_items');
  db.run('INSERT INTO menu_items (id, label, href, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [1, 'Home', '#home-top', 0, 1, '2026-04-02 07:23:21']);
  db.run('INSERT INTO menu_items (id, label, href, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [2, 'Visione', '#home-visione', 1, 1, '2026-04-02 07:23:21']);
  db.run('INSERT INTO menu_items (id, label, href, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [3, 'Fondatore', '#home-fondatore', 2, 1, '2026-04-02 07:23:21']);
  db.run('INSERT INTO menu_items (id, label, href, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [4, 'Iniziative', '#home-progetti', 3, 1, '2026-04-02 07:23:21']);

  // --- footer_items (9 righe) ---
  db.run('DELETE FROM footer_items');
  db.run('INSERT INTO footer_items (id, column_name, label, href, type, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [1, 'initiatives', 'Home', '#home-top', 'link', 0, 1, '2026-04-02 07:35:50']);
  db.run('INSERT INTO footer_items (id, column_name, label, href, type, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [2, 'nav', 'Visione', '#', 'link', 1, 1, '2026-04-02 07:35:55']);
  db.run('INSERT INTO footer_items (id, column_name, label, href, type, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [3, 'nav', 'Fondatore', '#home-fondatore', 'link', 2, 1, '2026-04-02 07:23:21']);
  db.run('INSERT INTO footer_items (id, column_name, label, href, type, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [4, 'nav', 'Iniziative', '#home-progetti', 'link', 3, 1, '2026-04-02 07:23:21']);
  db.run('INSERT INTO footer_items (id, column_name, label, href, type, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [5, 'initiatives', 'Fondazione Franco Moschini', 'https://www.fondazionemoschini.it/', 'link', 0, 1, '2026-04-02 07:23:21']);
  db.run('INSERT INTO footer_items (id, column_name, label, href, type, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [6, 'initiatives', 'Politeama di Tolentino', 'https://www.politeama.org/', 'link', 1, 1, '2026-04-02 07:23:21']);
  db.run('INSERT INTO footer_items (id, column_name, label, href, type, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [7, 'initiatives', 'Design Terrae', 'https://www.designterrae.it/', 'link', 2, 1, '2026-04-02 07:23:21']);
  db.run('INSERT INTO footer_items (id, column_name, label, href, type, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [8, 'initiatives', 'Interno Marche', 'https://internomarche.it/', 'link', 3, 1, '2026-04-02 07:23:21']);
  db.run('INSERT INTO footer_items (id, column_name, label, href, type, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [9, 'nav', 'Jeppe', '#home-top', 'link', 4, 1, '2026-04-02 07:35:31']);

  // --- projects (4 righe) ---
  db.run('DELETE FROM projects');
  db.run('INSERT INTO projects (id, badge, title, description, image, year_label, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [1, 'Fondazione · Ente del Terzo Settore', 'Fondazione Design Terrae', 'Design Terrae lavora per accompagnare la valle del Chienti verso una traiettoria di evoluzione e innovazione ispirata ai principi del "bello, buono e ben fatto", parole che hanno guidato, negli anni, l\'incedere di Franco Moschini in ogni sua attività. Si occupa di eventi, esperienze formative, comunicazione e supporto ad altre istituzioni.', 'fondazione-design-terrae.jpg', '2011 · Valle del Chienti', 0, 1, '2026-04-02 07:23:21']);
  db.run('INSERT INTO projects (id, badge, title, description, image, year_label, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [2, 'Fondazione · Ente del Terzo Settore', 'Fondazione Franco Moschini', 'Nel 2014 istituì la Fondazione Franco Moschini, oggi Ente del Terzo Settore, nato per il recupero e la gestione del cine-teatro Politeama di Tolentino. Franco Moschini affidò il progetto a Michele De Lucchi, trasformando il Politeama, un luogo eclettico nato come cineteatro nel 1926, in un moderno hub creativo.

Il Politeama oggi ospita spettacoli, eventi artistici ma anche incontri di carattere culturale e sociale rivolti a tutto il maceratese. Nel Consiglio direttivo, per espressa volontà del fondatore, è rappresentato il Comune di Tolentino.', 'fondazione-franco-moschini.jpg', '2014 · Tolentino', 1, 1, '2026-04-02 07:23:21']);
  db.run('INSERT INTO projects (id, badge, title, description, image, year_label, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [3, 'Design Hotel · Ospitalità d\'Eccellenza', 'Interno Marche', 'Sempre a Moschini si deve poi il recupero di uno dei palazzi simbolo della città di Tolentino, la mitica "Villa Gabrielli" che nel 2024 diviene Interno Marche: un design hotel che unisce accoglienza, progetto, memoria e cultura.

L\'obiettivo è rafforzare l\'attrattività del tolentinate posizionandolo in un circuito internazionale di eccellenza.', 'interno-marche.jpg', '2024 · Villa Gabrielli, Tolentino', 2, 1, '2026-04-02 07:23:21']);
  db.run('INSERT INTO projects (id, badge, title, description, image, year_label, sort_order, visible, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [4, 'Progetto Sociale · In Corso', 'Jeppe', 'Un progetto a vocazione sociale, gestito con la Cooperativa Esserci sotto l\'egida della Fondazione Design Terrae.

La sua missione è trasformare una proprietà della Moschini S.p.A. a San Severino Marche in un luogo capace di generare valore locale, rispondendo ai bisogni e alle vocazioni del territorio attraverso iniziative inclusive e sostenibili.', 'jeppe.jpg', '2026 · San Severino Marche', 3, 1, '2026-04-02 07:23:21']);

  // --- seo_settings (4 righe) ---
  db.run('DELETE FROM seo_settings');
  db.run('INSERT INTO seo_settings (id, key, value, updated_at) VALUES (?, ?, ?, ?)', [1, 'site_url', 'https://moschinispa.it', '2026-04-02 07:23:21']);
  db.run('INSERT INTO seo_settings (id, key, value, updated_at) VALUES (?, ?, ?, ?)', [2, 'og_type', 'website', '2026-04-02 07:23:21']);
  db.run('INSERT INTO seo_settings (id, key, value, updated_at) VALUES (?, ?, ?, ?)', [3, 'theme_color', '#fafaf8', '2026-04-02 07:23:21']);
  db.run('INSERT INTO seo_settings (id, key, value, updated_at) VALUES (?, ?, ?, ?)', [4, 'ga_id', '', '2026-04-02 07:23:21']);

  // --- roles (4 righe) ---
  db.run('DELETE FROM roles');
  db.run('INSERT INTO roles (id, name, label, permissions, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [1, 'admin', 'Amministratore', 'contents:view,contents:create,contents:delete,projects:view,projects:create,projects:delete,media:view,media:create,media:delete,menu:view,menu:create,menu:delete,footer:view,footer:create,footer:delete,seo:view,seo:create,seo:delete,users:view,users:create,users:delete', 0, '2026-04-02 07:23:21']);
  db.run('INSERT INTO roles (id, name, label, permissions, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [2, 'content_manager', 'Content Manager', 'contents:view,contents:create,projects:view,projects:create,menu:view,menu:create,footer:view,footer:create', 1, '2026-04-02 07:23:21']);
  db.run('INSERT INTO roles (id, name, label, permissions, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [3, 'media_manager', 'Media Manager', 'media:view,media:create,media:delete,contents:view', 2, '2026-04-02 07:23:21']);
  db.run('INSERT INTO roles (id, name, label, permissions, sort_order, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [4, 'editor', 'Editor', 'contents:view,contents:create', 3, '2026-04-02 07:23:21']);

  console.log('Seed completo applicato.');
}

module.exports = { seedFull };

if (require.main === module) {
  seedFull().then(() => process.exit(0));
}
