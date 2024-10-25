const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configurar la conexión con PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render establece esta variable automáticamente
  ssl: {
    rejectUnauthorized: false, // Necesario para Render en producción
  },
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
const port = process.env.PORT || 5000; // Render asigna automáticamente un puerto, usa el de la variable de entorno
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
