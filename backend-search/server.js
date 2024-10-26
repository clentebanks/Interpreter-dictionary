const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// PostgreSQL client setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
// Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Search route
app.get('/buscar', async (req, res) => {
  console.log('Request received at /buscar');
  const { palabra } = req.query;
  try {
    const result = await pool.query('SELECT * FROM palabras WHERE palabra ILIKE $1 OR acronimo IS TRUE AND palabra ILIKE $1', [palabra]);
    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Route to serve the HTML file
app.get('/popup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'popup.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

