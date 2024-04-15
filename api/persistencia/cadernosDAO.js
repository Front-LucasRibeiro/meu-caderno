class CadernosDAO {
  constructor(connection) {
    this._connection = connection;
  }

  listaCadernos() {
    return new Promise((resolve, reject) => {
      this._connection.query('SELECT * FROM cadernos', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  criaCaderno(data, callback) {
    this._connection.query('INSERT INTO cadernos(nome, page, cor, conteudo) VALUES ($1, $2, $3, $4)', [
      data.nome, data.page, data.cor, data.conteudo
    ], callback);
  }
}

export default CadernosDAO;
