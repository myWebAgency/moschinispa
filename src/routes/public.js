const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const MenuItem = require('../models/MenuItem');
const FooterItem = require('../models/FooterItem');
const Project = require('../models/Project');
const SeoSetting = require('../models/SeoSetting');
const Media = require('../models/Media');

/**
 * Build a map of original filename -> webp variants
 * e.g. { "franco-moschini.jpg": { small: "/uploads/franco-moschini-small.webp", ... } }
 */
function getWebpMap() {
  const allMedia = Media.getAll();
  const map = {};
  for (const m of allMedia) {
    const variants = Media.getVariants(m.id);
    if (variants.length > 0) {
      const vObj = {};
      for (const v of variants) {
        vObj[v.variant] = '/uploads/' + v.filename;
        vObj[v.variant + '_w'] = v.width;
      }
      map[m.filename] = vObj;
    }
  }
  return map;
}

router.get('/', (req, res) => {
  const contents = Content.getGrouped();
  const menuItems = MenuItem.getVisible();
  const footerItems = FooterItem.getGrouped();
  const projects = Project.getVisible();
  const seo = SeoSetting.getAll();
  const webp = getWebpMap();

  res.render('pages/home', {
    contents,
    menuItems,
    footerItems,
    projects,
    seo,
    webp,
    layout: 'layouts/public',
  });
});

// Sitemap.xml
router.get('/sitemap.xml', (req, res) => {
  const seo = SeoSetting.getAll();
  const baseUrl = seo.site_url || 'https://moschinispa.it';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  res.set('Content-Type', 'application/xml');
  res.send(xml);
});

// Robots.txt
router.get('/robots.txt', (req, res) => {
  const seo = SeoSetting.getAll();
  const baseUrl = seo.site_url || 'https://moschinispa.it';
  res.set('Content-Type', 'text/plain');
  res.send(`User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml`);
});

module.exports = router;
