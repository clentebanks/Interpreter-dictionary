const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL client setup using DATABASE_URL environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to fetch data from the database
app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM palabras');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data:', err);
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
