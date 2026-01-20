// generate-sitemap.js
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://jaskaranjoshi.online';
const pages = [
    '/',
    '/about',
    '/projects',
    '/contact',
    '/skills',
    '/experience',
    '/certifications'
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
const today = new Date().toISOString();
pages.forEach(p => {
    xml += `  <url>\n    <loc>${baseUrl}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
});
xml += `</urlset>`;

const outputPath = path.join(__dirname, 'client', 'public', 'sitemap.xml');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, xml, 'utf8');
console.log('Sitemap generated at', outputPath);
