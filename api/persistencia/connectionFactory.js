import pg from 'pg';

function createDBConnection() {
  const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'fr0nt3nd2019',
    port: 5432, // Porta padrão do PostgreSQL
    connectTimeout: 60000
  });
  
  return pool;
}

export default createDBConnection;
