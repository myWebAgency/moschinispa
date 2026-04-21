const Role = require('../models/Role');

function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) return next();
  req.flash('error', 'Accesso richiesto.');
  res.redirect('/admin/login');
}

function isAdmin(req, res, next) {
  if (req.session && req.session.userRole === 'admin') return next();
  req.flash('error', 'Permessi insufficienti.');
  res.redirect('/admin');
}

function hasPermission(...perms) {
  return (req, res, next) => {
    const roleName = req.session.userRole || 'editor';
    const allowed = Role.getPermissionsForRole(roleName);
    const hasAll = perms.every(p => allowed.includes(p));
    if (hasAll) return next();
    req.flash('error', 'Non hai i permessi per questa azione.');
    res.redirect('/admin');
  };
}

function setLocals(req, res, next) {
  const roleName = req.session.userRole || 'editor';
  const perms = Role.getPermissionsForRole(roleName);
  res.locals.user = req.session.userId ? {
    id: req.session.userId,
    first_name: req.session.userFirstName,
    last_name: req.session.userLastName,
    fullName: [req.session.userFirstName, req.session.userLastName].filter(Boolean).join(' '),
    email: req.session.userEmail,
    role: req.session.userRole,
    permissions: perms,
  } : null;
  res.locals.can = (perm) => perms.includes(perm);
  res.locals.flash = {
    success: req.flash('success'),
    error: req.flash('error'),
  };
  next();
}

module.exports = { isAuthenticated, isAdmin, hasPermission, setLocals };
