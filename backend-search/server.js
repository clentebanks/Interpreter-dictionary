const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 5000;

// PostgreSQL client setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/buscar', async (req, res) => {
  const { palabra } = req.query;
  try {
    const result = await pool.query('SELECT * FROM palabras WHERE palabra = $1', [palabra]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
