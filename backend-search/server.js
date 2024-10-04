const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configurar la conexión con PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'diccionario',
  password: 'test',
  port: 5432,
});

// Ruta para buscar palabras
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
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Iniciar el servidor
const port = 5000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
