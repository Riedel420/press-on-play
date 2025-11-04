import express from 'express';
const app = express();

app.get('/', (req, res) => {
  console.log('Request received');
  res.send('ok');
});

app.listen(3000, '127.0.0.1', () => {
  console.log('Test server running on http://127.0.0.1:3000');
});