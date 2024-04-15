import createDBConnection from './connectionFactory.js';

const montaEstruturaBase = () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS cadernos (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(60),
        page VARCHAR(20), 
        cor VARCHAR(7),
        conteudo TEXT
      );
    `;
  
  async function createTable() {
    try {
      const client = await createDBConnection().connect();
      await client.query(createTableQuery);
      console.log('Tabela cadernos criada com sucesso!');
      client.release();
    } catch (err) {
      console.error('Erro ao criar tabela cadernos:', err);
    }
  }
  
  createTable();
}

export default montaEstruturaBase;
