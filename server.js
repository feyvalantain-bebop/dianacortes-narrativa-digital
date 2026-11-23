const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, 'public');
const T = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
http.createServer((q, r) => {
  const u = path.normalize(decodeURIComponent(q.url.split('?')[0])).replace(/^(\.\.[\/\\])+/, '');
  let f = path.join(root, u === '/' || u === '\\' ? 'index.html' : u);
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(root, 'index.html');
  r.writeHead(200, { 'Content-Type': T[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(r);
}).listen(process.env.PORT || 3000, '0.0.0.0', () => console.log('Servidor activo'));
