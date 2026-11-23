const http = require('http'), fs = require('fs'), path = require('path');
const file = path.join(__dirname, 'index.html');
http.createServer((q, r) => {
  r.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  fs.createReadStream(file).on('error', () => r.end('No se encontró index.html')).pipe(r);
}).listen(process.env.PORT || 3000, '0.0.0.0', () => console.log('Servidor activo'));
