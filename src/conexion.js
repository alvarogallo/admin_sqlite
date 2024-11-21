const Database = require('better-sqlite3');
const path = require('path');

// Ruta al archivo SQLite
const dbPath = path.resolve(__dirname, '../../database.sqlite');

// Crear la conexión
try {
  const db = new Database(dbPath, { verbose: console.log });
  console.log('Conexión a SQLite establecida correctamente.');
  module.exports = db;
} catch (error) {
  console.error('Error al conectar con SQLite:', error.message);
  process.exit(1); // Salir si hay un error
}
