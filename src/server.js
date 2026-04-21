require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path');
const { initDatabase } = require('./db/init');
const { setLocals } = require('./middleware/auth');
const db = require('../config/database');

const app = express();
const PORT = process.env.PORT || 3001;

async function start() {
  // Initialize DB
  await initDatabase();

  // Auto-seed if no users exist
  const userCount = db.get('SELECT COUNT(*) as c FROM users');
  if (!userCount || userCount.c === 0) {
    const { seed } = require('./db/seed');
    await seed();
  }

  // View engine
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.use(ejsLayouts);

  // Body parsing
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Static files
  app.use(express.static(path.join(__dirname, 'public')));

  // Sessions
  app.use(session({
    secret: process.env.SESSION_SECRET || 'moschini-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }));

  app.use(flash());
  app.use(setLocals);

  // Routes
  app.use('/', require('./routes/public'));
  app.use('/admin', require('./routes/admin'));

  // 404
  app.use((req, res) => {
    res.status(404).render('pages/404', { layout: false });
  });

  app.listen(PORT, () => {
    console.log(`Moschini running at http://localhost:${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
  });
}

start().catch(err => {
  console.error('Failed to start:', err);
  process.exit(1);
});
