const fs = require('node:fs');
const path = require('node:path');

const target = path.join(__dirname, '../node_modules/@astrojs/sitemap/dist/index.js');
if (!fs.existsSync(target)) process.exit(0);
let s = fs.readFileSync(target, 'utf8');
if (s.includes('(_routes ?? []).reduce')) process.exit(0);
s = s.replace(
  'const routeUrls = _routes.reduce((urls, r) => {',
  'const routeUrls = (_routes ?? []).reduce((urls, r) => {',
);
fs.writeFileSync(target, s);
