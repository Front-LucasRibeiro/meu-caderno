const Cadernos = (app, CadernosDAO, createDBConnection) => {
 
  app.post('/cadernos/criar', async function (req, res) {
    try {
      const data = req.body;
      const connection = createDBConnection();
      const cadernosDAO = new CadernosDAO(connection);
      
      cadernosDAO.criaCaderno(data, function (erro, dados) {
        if (erro) {
          console.log(`Erro ao criar caderno: ${erro}`)
          res.status(400).send(erro);
        } else {
          console.log('Caderno criado com sucesso.');
          res.status(200).send(dados);
        }
      });
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
      res.status(500).send('Erro interno do servidor.');
    }
  });

  app.get('/cadernos/lista', async (req, res) => {
    try {
      const connection = createDBConnection();
      const cadernosDAO = new CadernosDAO(connection);
      const dados = await cadernosDAO.listaCadernos();

      console.log('Listagem de cadernos feita com sucesso');
      res.status(200).send(dados.rows);
    } catch (error) {
      console.error(`Erro ao obter listagem: ${error}`);
      res.status(400).send(error);
    }
  });
}

export default Cadernos;
