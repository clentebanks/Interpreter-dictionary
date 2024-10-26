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

// Route to create table and insert test data
app.get('/insert-test-data', async (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS palabras (
      id SERIAL PRIMARY KEY,
      palabra VARCHAR(255) NOT NULL,
      significado TEXT NOT NULL,
      traduccion TEXT NOT NULL,
      acronimo BOOLEAN NOT NULL
    );
  `;

  const insertDataQuery = `
    INSERT INTO palabras (palabra, significado, traduccion, acronimo) VALUES 
    ('A1C Test', 'Hemoglobin A1C', 'Prueba de Hemoglobina Glicosilada', TRUE),
    ('ADD', 'Attention Deficit Disorder', 'Trastorno de Déficit de Atención', TRUE),
    ('ADHD', 'Attention Deficit with Hyperactivity Disorder', 'Trastorno de Déficit de Atención con Hiperactividad', TRUE),
    ('AIDS', 'Acquired Immunodeficiency Syndrome', 'Síndrome de Inmunodeficiencia Adquirida', TRUE),
    ('BMI', 'Body Mass Index', 'Indice de masa corporal', TRUE),
    ('CBC', 'Complete Blood Count', 'Conteo Completo de Glóbulos', TRUE),
    ('CMV', 'Cytomegalovirus', 'Citomegalovirus', TRUE),
    ('COPD', 'Chronic Obstructive Pulmonary Disease', 'Enfermedad Pulmonar Obstructiva Crónica - EPOC', TRUE),
    ('CPAP', 'Continuous Positive Airway Pressure', 'Presión Continua de las Vías Respiratorias', TRUE),
    ('D&C', 'Dilation & Curettage', 'Legrado', TRUE),
    ('DNI', 'Do Not Intubate', 'Orden de No Intubar', TRUE),
    ('DNR', 'Do Not Resuscitate', 'Orden de No Resucitar', TRUE),
    ('DPT/T-DAP', 'Diphtheria Pertussis Tetanus', 'Difteria Tos ferina y Tétano', TRUE),
    ('DVT', 'Deep Vein Thrombosis', 'Trombosis Venosa Profunda', TRUE),
    ('EBT Card', 'Electronic Benefit Transfer Card', 'Tarjeta de Transferencia de Beneficios Electrónicos', TRUE),
    ('ECG', 'Echocardiogram', 'Ecocardiograma', TRUE),
    ('EEG', 'Electroencephalogram', 'Electroencefalograma', TRUE),
    ('EGD', 'Esophago-gastro-duodenoscopy', 'Esofagogastroduodenoscopía', TRUE),
    ('EKG', 'Electrocardiogram', 'Electrocardiograma', TRUE),
    ('GERD', 'Gastroesophageal Reflux Disease', 'Enfermedad de Reflujo Gastroesofágico', TRUE),
    ('HIV', 'Human Immunodeficiency Virus', 'Virus de Inmunodeficiencia Humana', TRUE),
    ('HMO', 'Health Maintenance Organization', 'Organización de Mantenimiento de la Salud', TRUE),
    ('HPV', 'Human Papillomavirus', 'Virus del Papiloma Humano', TRUE),
    ('ICU', 'Intensive Care Unit', 'Unidad de Cuidados Intensivos', TRUE),
    ('IEP', 'Individualized Education Program', 'Programa de Educación Individualizada', TRUE),
    ('INR', 'International Normalized Ratio', 'Prueba de Tiempo de Protrombina', TRUE),
    ('IUD', 'Intrauterine Device', 'Dispositivo Intrauterino', TRUE),
    ('MMR', 'Measles, Mumps & Rubella', 'Sarampión, Paperas y Rubéola', TRUE),
    ('MRI', 'Magnetic Resonance Image', 'Imagen de Resonancia Magnética', TRUE),
    ('MRN', 'Medical Record Number', 'Número de Expediente Médico', TRUE),
    ('MRSA', 'Methicillin-Resistant Staphylococcus Aureus', 'Estafilococo Aureus Resistente a la Meticilina', TRUE),
    ('NICU', 'Neonatal Intensive Care Unit', 'Unidad de Cuidados Intensivos Neonatales', TRUE),
    ('NP', 'Nurse Practitioner', 'Enfermera Especializada', TRUE),
    ('OT-PT', 'Occupational Therapy - Physical Therapy', 'Terapia Ocupacional - Terapia Física', TRUE),
    ('PET Scan', 'Positron Emission Tomography', 'Tomografía de Emisión de Positrones', TRUE),
    ('PICC', 'Peripherally Inserted Central Catheter', 'Catéter Central Insertado Periféricamente', TRUE),
    ('PKU', 'Phenylketonuria', 'Fenilcetonuria', TRUE),
    ('PMS', 'Premenstrual Syndrome', 'Síndrome Pre-Menstrual', TRUE),
    ('PPO', 'Preferred Provider Organization', 'Organización de Proveedor Preferido', TRUE),
    ('PTSD', 'Post-Traumatic Stress Disorder', 'Trastorno de Estrés Post Traumático', TRUE),
    ('RN', 'Registered Nurse', 'Enfermera Certificada', TRUE),
    ('SIDS', 'Sudden Infant Death Syndrome', 'Síndrome de Muerte Súbita Infantil', TRUE),
    ('STD', 'Sexually Transmitted Disease', 'Enfermedad de Transmisión Sexual', TRUE),
    ('TMJ', 'Temporomandibular Joint Disorder', 'Trastorno de la Articulación Temporomandibular', TRUE),
    ('UTI', 'Urinary Tract Infection', 'Infección del Tracto Urinario', TRUE);
  `;

  try {
    await pool.query(createTableQuery);
    await pool.query(insertDataQuery);
    res.send('Test data inserted successfully');
  } catch (err) {
    console.error('Error inserting test data:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
