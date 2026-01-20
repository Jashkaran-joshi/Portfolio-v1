// generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Correct path: public is in the same directory as this script
const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, xml, 'utf8');
console.log('Sitemap generated at', outputPath);
