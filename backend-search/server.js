const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL client setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Search route
app.get('/buscar', async (req, res) => {
  const { query } = req.query;
  try {
    const result = await pool.query(
      'SELECT * FROM palabras WHERE palabra ILIKE $1 OR acronimo IS TRUE AND palabra ILIKE $1',
      [`%${query}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
