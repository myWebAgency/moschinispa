const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { isAuthenticated, isAdmin, hasPermission } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { processImage } = require('../middleware/imageProcessor');
const User = require('../models/User');
const Role = require('../models/Role');
const Content = require('../models/Content');
const Media = require('../models/Media');
const MenuItem = require('../models/MenuItem');
const FooterItem = require('../models/FooterItem');
const Project = require('../models/Project');
const SeoSetting = require('../models/SeoSetting');

// --- LOGIN ---
router.get('/login', (req, res) => {
  if (req.session.userId) return res.redirect('/admin');
  res.render('admin/login', { layout: false });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = User.findByEmail(email);
  if (!user || !User.verifyPassword(password, user.password)) {
    req.flash('error', 'Credenziali non valide.');
    return res.redirect('/admin/login');
  }
  req.session.userId = user.id;
  req.session.userFirstName = user.first_name;
  req.session.userLastName = user.last_name;
  req.session.userEmail = user.email;
  req.session.userRole = user.role;
  req.flash('success', `Benvenuto, ${user.first_name}!`);
  res.redirect('/admin');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// --- All admin routes require auth ---
router.use(isAuthenticated);

// --- DASHBOARD ---
router.get('/', (req, res) => {
  const allMedia = Media.getAll();
  const allProjects = Project.getAll();
  const allUsers = User.getAll();
  const allContents = Content.getAll();

  // Media breakdown by category
  const mediaCats = {};
  let totalMediaSize = 0;
  allMedia.forEach(m => {
    mediaCats[m.category] = (mediaCats[m.category] || 0) + 1;
    totalMediaSize += (m.size || 0);
  });

  // Variants total size
  let totalVariantSize = 0;
  allMedia.forEach(m => {
    const variants = Media.getVariants(m.id);
    variants.forEach(v => { totalVariantSize += (v.size || 0); });
  });

  const stats = {
    contents: allContents.length,
    media: allMedia.length,
    projects: allProjects.length,
    users: allUsers.length,
    totalMediaSize,
    totalVariantSize,
    mediaCats,
    recentMedia: allMedia.slice(0, 6),
    projectsList: allProjects,
  };

  res.render('admin/dashboard', { stats, layout: 'layouts/admin' });
});

// ══════════════════════════════════════════════════════
// SEZIONE routes — each section of the page is its own page
// ══════════════════════════════════════════════════════

// --- HERO ---
router.get('/sezione/hero', hasPermission('contents:view'), (req, res) => {
  const c = Content.getGrouped();
  res.render('admin/sezione-hero', {
    data: c.hero || {},
    panoramaImg: 'paesaggio-moschini.jpg',
    allMedia: Media.getAll(),
    layout: 'layouts/admin',
  });
});

router.post('/sezione/hero', hasPermission('contents:create'), upload.single('panorama_image'), (req, res) => {
  const { eyebrow, title, subtitle } = req.body;
  Content.upsert('hero', 'eyebrow', eyebrow, 'text', 'Eyebrow hero');
  Content.upsert('hero', 'title', title, 'html', 'Titolo hero');
  Content.upsert('hero', 'subtitle', subtitle, 'text', 'Sottotitolo hero');

  if (req.file) {
    // Copy uploaded file to images directory with a known name
    const dest = path.join(__dirname, '..', 'public', 'images', 'paesaggio-moschini.jpg');
    fs.copyFileSync(req.file.path, dest);
    // Register in media
    Media.create({
      filename: 'paesaggio-moschini.jpg',
      original_name: req.file.originalname,
      mime_type: req.file.mimetype,
      size: req.file.size,
      alt_text: 'Paesaggio marchigiano',
      category: 'hero',
    });
  }

  req.flash('success', 'Sezione Hero aggiornata.');
  res.redirect('/admin/sezione/hero');
});

// --- VISIONE ---
router.get('/sezione/visione', hasPermission('contents:view'), (req, res) => {
  const c = Content.getGrouped();
  res.render('admin/sezione-visione', { data: c.visione || {}, layout: 'layouts/admin' });
});

router.post('/sezione/visione', hasPermission('contents:create'), (req, res) => {
  const { label, title, body } = req.body;
  Content.upsert('visione', 'label', label, 'text', 'Label sezione');
  Content.upsert('visione', 'title', title, 'text', 'Titolo sezione');
  Content.upsert('visione', 'body', body, 'html', 'Testo holding');
  req.flash('success', 'Sezione Visione aggiornata.');
  res.redirect('/admin/sezione/visione');
});

// --- FONDATORE ---
router.get('/sezione/fondatore', hasPermission('contents:view'), (req, res) => {
  const c = Content.getGrouped();
  res.render('admin/sezione-fondatore', {
    data: c.fondatore || {},
    fondatoreImg: 'franco-moschini.jpg',
    allMedia: Media.getAll(),
    layout: 'layouts/admin',
  });
});

router.post('/sezione/fondatore', hasPermission('contents:create'), upload.single('fondatore_image'), (req, res) => {
  const { label, name, bio_p1, bio_p2, bio_p3, bio_p4, bio_p5 } = req.body;
  Content.upsert('fondatore', 'label', label, 'text', 'Label fondatore');
  Content.upsert('fondatore', 'name', name, 'text', 'Nome fondatore');
  Content.upsert('fondatore', 'bio_p1', bio_p1 || '', 'text', 'Bio paragrafo 1');
  Content.upsert('fondatore', 'bio_p2', bio_p2 || '', 'text', 'Bio paragrafo 2');
  Content.upsert('fondatore', 'bio_p3', bio_p3 || '', 'text', 'Bio paragrafo 3');
  Content.upsert('fondatore', 'bio_p4', bio_p4 || '', 'text', 'Bio paragrafo 4');
  Content.upsert('fondatore', 'bio_p5', bio_p5 || '', 'text', 'Bio paragrafo 5');

  if (req.file) {
    const dest = path.join(__dirname, '..', 'public', 'images', 'franco-moschini.jpg');
    fs.copyFileSync(req.file.path, dest);
    Media.create({
      filename: 'franco-moschini.jpg',
      original_name: req.file.originalname,
      mime_type: req.file.mimetype,
      size: req.file.size,
      alt_text: 'Franco Moschini',
      category: 'bio',
    });
  }

  req.flash('success', 'Sezione Fondatore aggiornata.');
  res.redirect('/admin/sezione/fondatore');
});

// --- CITAZIONI ---
router.get('/sezione/citazioni', hasPermission('contents:view'), (req, res) => {
  const c = Content.getGrouped();
  res.render('admin/sezione-citazioni', {
    q1: c.quote1 || {},
    q2: c.quote2 || {},
    layout: 'layouts/admin',
  });
});

router.post('/sezione/citazioni', hasPermission('contents:create'), (req, res) => {
  const { quote1_text, quote1_author, quote2_text, quote2_author } = req.body;
  Content.upsert('quote1', 'text', quote1_text, 'html', 'Citazione 1');
  Content.upsert('quote1', 'author', quote1_author, 'text', 'Autore citazione 1');
  Content.upsert('quote2', 'text', quote2_text, 'html', 'Citazione 2');
  Content.upsert('quote2', 'author', quote2_author, 'text', 'Autore citazione 2');
  req.flash('success', 'Citazioni aggiornate.');
  res.redirect('/admin/sezione/citazioni');
});

// --- FOOTER CONTENT ---
router.get('/footer', hasPermission('footer:view'), (req, res) => {
  const c = Content.getGrouped();
  const items = FooterItem.getAll();
  res.render('admin/sezione-footer', {
    ft: c.footer || {},
    items,
    layout: 'layouts/admin',
  });
});

router.post('/footer', hasPermission('footer:create'), (req, res) => {
  const { description, email, phone, copyright } = req.body;
  Content.upsert('footer', 'description', description, 'text', 'Descrizione footer');
  Content.upsert('footer', 'email', email, 'text', 'Email');
  Content.upsert('footer', 'phone', phone, 'text', 'Telefono');
  Content.upsert('footer', 'copyright', copyright, 'text', 'Copyright');
  req.flash('success', 'Footer aggiornato.');
  res.redirect('/admin/footer');
});

// ══════════════════════════════════════════════════════
// PROJECTS
// ══════════════════════════════════════════════════════

router.get('/projects', hasPermission('projects:view'), (req, res) => {
  const projects = Project.getAll();
  const c = Content.getGrouped();
  res.render('admin/projects', { projects, projSection: c.projects || {}, layout: 'layouts/admin' });
});

router.get('/projects/new', hasPermission('projects:create'), (req, res) => {
  const allMedia = Media.getAll();
  res.render('admin/project-form', { project: null, allMedia, layout: 'layouts/admin' });
});

router.post('/projects', hasPermission('projects:create'), upload.single('project_image'), (req, res) => {
  const { badge, title, description, image, year_label, sort_order, visible } = req.body;
  let imageName = image || '';

  // Handle file upload for project image
  if (req.file) {
    const ext = path.extname(req.file.originalname).toLowerCase();
    const safeName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-') + ext;
    const dest = path.join(__dirname, '..', 'public', 'images', safeName);
    fs.copyFileSync(req.file.path, dest);
    imageName = safeName;
    Media.create({
      filename: safeName,
      original_name: req.file.originalname,
      mime_type: req.file.mimetype,
      size: req.file.size,
      alt_text: title,
      category: 'projects',
    });
  }

  if (req.body.id) {
    Project.update(req.body.id, { badge, title, description, image: imageName, year_label, sort_order: parseInt(sort_order) || 0, visible: visible === 'on' || visible === '1' });
    req.flash('success', 'Progetto aggiornato.');
  } else {
    Project.create({ badge, title, description, image: imageName, year_label, sort_order: parseInt(sort_order) || 0 });
    req.flash('success', 'Progetto creato.');
  }
  res.redirect('/admin/projects');
});

router.post('/projects/section', hasPermission('projects:create'), (req, res) => {
  const { label, title, subtitle } = req.body;
  Content.upsert('projects', 'label', label, 'text', 'Label progetti');
  Content.upsert('projects', 'title', title, 'html', 'Titolo progetti');
  Content.upsert('projects', 'subtitle', subtitle, 'text', 'Sottotitolo progetti');
  req.flash('success', 'Intestazione progetti aggiornata.');
  res.redirect('/admin/projects');
});

router.get('/projects/:id/edit', hasPermission('projects:create'), (req, res) => {
  const project = Project.getById(req.params.id);
  if (!project) return res.redirect('/admin/projects');
  const allMedia = Media.getAll();
  res.render('admin/project-form', { project, allMedia, layout: 'layouts/admin' });
});

router.post('/projects/:id/delete', hasPermission('projects:delete'), (req, res) => {
  Project.delete(req.params.id);
  req.flash('success', 'Progetto eliminato.');
  res.redirect('/admin/projects');
});

// ══════════════════════════════════════════════════════
// MENU
// ══════════════════════════════════════════════════════

router.get('/menu', hasPermission('menu:view'), (req, res) => {
  const items = MenuItem.getAll();
  res.render('admin/menu', { items, layout: 'layouts/admin' });
});

router.post('/menu', hasPermission('menu:create'), (req, res) => {
  const { label, href, sort_order, visible, id } = req.body;
  if (id) {
    MenuItem.update(id, { label, href, sort_order: parseInt(sort_order) || 0, visible: visible === 'on' || visible === '1' });
    req.flash('success', 'Voce aggiornata.');
  } else {
    MenuItem.create(label, href, parseInt(sort_order) || 0);
    req.flash('success', 'Voce creata.');
  }
  res.redirect('/admin/menu');
});

router.post('/menu/:id/delete', hasPermission('menu:delete'), (req, res) => {
  MenuItem.delete(req.params.id);
  req.flash('success', 'Voce eliminata.');
  res.redirect('/admin/menu');
});

// ══════════════════════════════════════════════════════
// FOOTER ITEMS (managed from /admin/footer)
// ══════════════════════════════════════════════════════

router.post('/footer/items', hasPermission('footer:create'), (req, res) => {
  const { column_name, label, href, type, sort_order, visible, id } = req.body;
  if (id) {
    FooterItem.update(id, { column_name, label, href, type, sort_order: parseInt(sort_order) || 0, visible: visible === 'on' || visible === '1' });
  } else {
    FooterItem.create({ column_name, label, href, type, sort_order: parseInt(sort_order) || 0 });
  }
  req.flash('success', 'Voce footer salvata.');
  res.redirect('/admin/footer');
});

router.post('/footer/:id/delete', hasPermission('footer:delete'), (req, res) => {
  FooterItem.delete(req.params.id);
  req.flash('success', 'Voce eliminata.');
  res.redirect('/admin/footer');
});

// ══════════════════════════════════════════════════════
// MEDIA
// ══════════════════════════════════════════════════════

router.get('/media', hasPermission('media:view'), (req, res) => {
  const media = Media.getAll();
  // Attach variants to each media item
  media.forEach(m => { m.variants = Media.getVariants(m.id); });
  res.render('admin/media', { media, layout: 'layouts/admin' });
});

// API endpoint for side panel to fetch variants
router.get('/media/:id/detail', hasPermission('media:view'), (req, res) => {
  const media = Media.getByIdWithVariants(req.params.id);
  if (!media) return res.status(404).json({ error: 'Not found' });
  res.json(media);
});

router.post('/media/upload', hasPermission('media:create'), upload.array('files', 20), async (req, res) => {
  const category = req.body.category || 'general';
  let count = 0;

  for (const file of req.files) {
    const isImage = /\.(jpg|jpeg|png|gif|webp|avif|tiff|bmp)$/i.test(file.originalname);

    // Store as WebP original if it's an image
    let finalFilename = file.filename;
    let finalSize = file.size;
    let finalMime = file.mimetype;

    if (isImage) {
      const sharp = require('sharp');
      const ext = path.extname(file.filename);
      const baseName = path.basename(file.filename, ext);
      const webpName = baseName + '.webp';
      const webpPath = path.join(__dirname, '..', 'public', 'uploads', webpName);

      // Convert original to WebP
      const info = await sharp(file.path).webp({ quality: 90 }).toFile(webpPath);
      finalFilename = webpName;
      finalSize = info.size;
      finalMime = 'image/webp';

      // Remove the non-webp original
      if (file.filename !== webpName && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }

    // Create media record
    Media.create({
      filename: finalFilename,
      original_name: file.originalname,
      mime_type: finalMime,
      size: finalSize,
      alt_text: '',
      category,
    });

    // Generate 3 variants for images
    if (isImage) {
      const mediaId = Media.getLastInsertId();
      if (mediaId) {
        try {
          const ext = path.extname(finalFilename);
          const baseName = path.basename(finalFilename, ext);
          const inputPath = path.join(__dirname, '..', 'public', 'uploads', finalFilename);
          const variants = await processImage(inputPath, baseName);
          for (const v of variants) {
            Media.addVariant(mediaId, v);
          }
        } catch (e) {
          console.error('Variant generation error:', e.message);
        }
      }
    }
    count++;
  }

  req.flash('success', `${count} file caricati e convertiti in WebP.`);
  res.redirect('/admin/media');
});

router.post('/media/:id/update', hasPermission('media:create'), (req, res) => {
  const { alt_text, category } = req.body;
  Media.update(req.params.id, { alt_text, category });
  req.flash('success', 'Media aggiornato.');
  res.redirect('/admin/media');
});

router.post('/media/:id/delete', hasPermission('media:delete'), (req, res) => {
  const media = Media.getByIdWithVariants(req.params.id);
  if (media) {
    // Delete variant files
    if (media.variants) {
      for (const v of media.variants) {
        const vPath = path.join(__dirname, '..', 'public', 'uploads', v.filename);
        if (fs.existsSync(vPath)) fs.unlinkSync(vPath);
      }
    }
    // Delete main file from uploads
    const uploadsPath = path.join(__dirname, '..', 'public', 'uploads', media.filename);
    if (fs.existsSync(uploadsPath)) fs.unlinkSync(uploadsPath);
    Media.delete(req.params.id);
    req.flash('success', 'Media e varianti eliminati.');
  }
  res.redirect('/admin/media');
});

// ══════════════════════════════════════════════════════
// USERS & ROLES
// ══════════════════════════════════════════════════════

router.get('/users', hasPermission('users:view'), (req, res) => {
  const users = User.getAll();
  const roles = Role.getAll();
  const allPermissions = Role.getAllPermissions();
  res.render('admin/users', { users, roles, allPermissions, layout: 'layouts/admin' });
});

router.get('/users/new', hasPermission('users:create'), (req, res) => {
  const roles = Role.getAll();
  res.render('admin/user-form', { editUser: null, roles, layout: 'layouts/admin' });
});

router.post('/users', hasPermission('users:create'), (req, res) => {
  const { email, password, first_name, last_name, role, id } = req.body;
  if (id) {
    const updateData = { first_name, last_name, email, role };
    if (password) updateData.password = password;
    User.update(id, updateData);
    req.flash('success', 'Utente aggiornato.');
  } else {
    if (!password) {
      req.flash('error', 'Password obbligatoria per un nuovo utente.');
      return res.redirect('/admin/users/new');
    }
    User.create({ email, password, first_name, last_name, role });
    req.flash('success', 'Utente creato.');
  }
  res.redirect('/admin/users');
});

router.get('/users/:id/edit', hasPermission('users:create'), (req, res) => {
  const editUser = User.findById(req.params.id);
  if (!editUser) return res.redirect('/admin/users');
  const roles = Role.getAll();
  res.render('admin/user-form', { editUser, roles, layout: 'layouts/admin' });
});

router.post('/users/:id/delete', hasPermission('users:delete'), (req, res) => {
  if (parseInt(req.params.id) === req.session.userId) {
    req.flash('error', 'Non puoi eliminare il tuo account.');
    return res.redirect('/admin/users');
  }
  User.delete(req.params.id);
  req.flash('success', 'Utente eliminato.');
  res.redirect('/admin/users');
});

// --- ROLES CRUD ---
router.get('/roles/new', hasPermission('users:create'), (req, res) => {
  const allPermissions = Role.getAllPermissions();
  const permSections = Role.getPermissionSections();
  const permActions = Role.getPermissionActions();
  res.render('admin/role-form', { editRole: null, allPermissions, permSections, permActions, layout: 'layouts/admin' });
});

router.post('/roles', hasPermission('users:create'), (req, res) => {
  const { name, label, permissions, id } = req.body;
  const permsArray = Array.isArray(permissions) ? permissions : (permissions ? [permissions] : []);
  if (id) {
    Role.update(id, { name, label, permissions: permsArray });
    req.flash('success', 'Ruolo aggiornato.');
  } else {
    Role.create(name, label, permsArray);
    req.flash('success', 'Ruolo creato.');
  }
  res.redirect('/admin/users');
});

router.get('/roles/:id/edit', hasPermission('users:create'), (req, res) => {
  const editRole = Role.getById(req.params.id);
  if (!editRole) return res.redirect('/admin/users');
  const allPermissions = Role.getAllPermissions();
  const permSections = Role.getPermissionSections();
  const permActions = Role.getPermissionActions();
  res.render('admin/role-form', { editRole, allPermissions, permSections, permActions, layout: 'layouts/admin' });
});

router.post('/roles/:id/delete', hasPermission('users:delete'), (req, res) => {
  const role = Role.getById(req.params.id);
  if (role && role.name === 'admin') {
    req.flash('error', 'Non puoi eliminare il ruolo admin.');
    return res.redirect('/admin/users');
  }
  if (role) Role.delete(req.params.id);
  req.flash('success', 'Ruolo eliminato.');
  res.redirect('/admin/users');
});

// ══════════════════════════════════════════════════════
// SEO & ANALYTICS
// ══════════════════════════════════════════════════════

router.get('/seo', hasPermission('seo:view'), (req, res) => {
  const seo = SeoSetting.getAll();
  const contents = Content.getGrouped();
  res.render('admin/seo', { seo, contents, layout: 'layouts/admin' });
});

router.post('/seo', hasPermission('seo:create'), (req, res) => {
  const fields = ['site_url', 'og_type', 'theme_color', 'ga_id', 'gsc_verification'];
  for (const f of fields) {
    if (req.body[f] !== undefined) SeoSetting.set(f, req.body[f]);
  }
  const seoContents = ['title', 'description', 'og_title', 'og_description'];
  for (const key of seoContents) {
    if (req.body[key] !== undefined) Content.upsert('seo', key, req.body[key], 'text', `SEO ${key}`);
  }
  req.flash('success', 'Impostazioni SEO, Analytics e Search Console aggiornate.');
  res.redirect('/admin/seo');
});

module.exports = router;
