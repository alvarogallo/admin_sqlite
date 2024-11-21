const mysql = require('mysql2/promise');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function testMySQLConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQLPORT
    });
    
    // Prueba simple
    const [rows] = await connection.execute('SELECT 1');
    console.log('MySQL Connection successful!', rows);
    await connection.end();
  } catch (error) {
    console.error('MySQL Connection error:', error);
  }
}

async function testSQLiteConnection() {
  try {
    const db = await open({
      filename: 'sqlite3.railway.internal',
      driver: sqlite3.Database
    });
    
    // Prueba simple
    const result = await db.get('SELECT 1');
    console.log('SQLite Connection successful!', result);
    await db.close();
  } catch (error) {
    console.error('SQLite Connection error:', error);
  }
}

async function main() {
  console.log('Testing database connections...');
  await testMySQLConnection();
  await testSQLiteConnection();
}

main();