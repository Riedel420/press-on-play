import http from 'http';

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: true, time: new Date().toISOString() }));
});

server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error('Port is already in use');
  }
});

server.listen(4173, '127.0.0.1', () => {
  const addr = server.address();
  console.log('----------------------------------------');
  console.log('Basic HTTP Server Configuration:');
  console.log(`Address: ${addr.address}`);
  console.log(`Port: ${addr.port}`);
  console.log(`Family: ${addr.family}`);
  console.log('----------------------------------------');
});