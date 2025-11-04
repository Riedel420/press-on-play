import express from 'express';
const app = express();

// Basic health check
app.get('/api/health', (req, res) => {
  console.log('[Health Check] Request received');
  res.json({ 
    ok: true, 
    time: new Date().toISOString(),
    address: '127.0.0.1',
    port: 4173
  });
});

// Explicitly bind to IPv4
const server = app.listen(4173, '127.0.0.1', () => {
  const addr = server.address();
  console.log('----------------------------------------');
  console.log('Server Configuration:');
  console.log(`Address: ${addr.address}`);
  console.log(`Port: ${addr.port}`);
  console.log(`Family: ${addr.family}`);
  console.log('----------------------------------------');
  console.log('🚀 Server ready at http://127.0.0.1:3000');
  console.log('🔍 Test API: http://127.0.0.1:3000/api/health');
});