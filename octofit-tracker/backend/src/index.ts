import express from 'express';
import db from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening on http://0.0.0.0:${port}`);
});
