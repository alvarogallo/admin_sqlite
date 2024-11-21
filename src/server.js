const mysql = require('mysql2/promise');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function testMySQLConnection() {
  try {
    // Log connection parameters
    // console.log('Attempting connection with:', {
    //   host: 'containers-us-west-17.railway.app',
    //   host: process.env.MYSQLUSER,
    //   user: process.env.MYSQLUSER,
    //   database: process.env.MYSQL_DATABASE,
    //   port: process.env.MYSQLPORT
    // });

        // Log connection parameters
    console.log('Attempting connection with:', {
      mi_variable: process.env.MIVARIABLE,
    });
    

    const connection = await mysql.createConnection({
      host: 'containers-us-west-17.railway.app',
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQLPORT
    });

    // Test database connection
    const [rows] = await connection.execute('SELECT 1');
    console.log('Connection successful!');
    
    // Verify database details
    const [dbInfo] = await connection.execute('SELECT DATABASE() as db');
    const [userInfo] = await connection.execute('SELECT USER() as user');
    const [portInfo] = await connection.execute('SELECT @@port as port');

    console.log('Connected Database:', dbInfo[0].db);
    console.log('Connected User:', userInfo[0].user);
    console.log('Connected Port:', portInfo[0].port);

    await connection.end();
  } catch (error) {
    console.error('Connection error with MYSQL:', error);
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