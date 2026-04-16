const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
let urls = [];
const baseUrl = 'https://occultworldcup.com';

function walkDir(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (!filePath.includes('.vscode') && !filePath.includes('.idx') && !filePath.includes('.git') && !filePath.includes('node_modules')) {
                walkDir(filePath);
            }
        } else if (file.endsWith('.html')) {
            const relPath = path.relative(projectDir, filePath).replace(/\\/g, '/');
            if (relPath === 'index.html') {
                urls.push(`<url><loc>${baseUrl}/</loc><priority>1.0</priority></url>`);
            } else {
                urls.push(`<url><loc>${baseUrl}/${relPath}</loc><priority>0.8</priority></url>`);
            }
        }
    });
}
walkDir(projectDir);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\n  ')}
</urlset>`;

fs.writeFileSync(path.join(projectDir, 'sitemap.xml'), sitemap);
console.log('Sitemap built with ' + urls.length + ' URLs.');
