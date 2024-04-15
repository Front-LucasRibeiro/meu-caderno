import fs from 'fs'
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import https from 'https'

// controllers e persistências
import createDBConnection from './persistencia/connectionFactory.js';
import CadernosDao from './persistencia/cadernosDAO.js';
import cadernos from './controllers/cadernos.js';
import montaEstruturaBase from './persistencia/estruturaBanco.js';

const app = express();
const PORT = process.env.PORT || 5000;

// definindo metodos aceitos e origens permitidas 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// criar base inicial do banco de dados
montaEstruturaBase();

// cria os controllers para os requests
cadernos(app, CadernosDao, createDBConnection);


// Criando o servidor: 

// Configurações do SSL
const agent = new https.Agent({
  rejectUnauthorized: false,
});

try {
  const options = {
    key: fs.readFileSync('./certificates/chave_desbloqueada.key'),
    cert: fs.readFileSync('./certificates/certificado.crt'),
    agent: agent
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
  });
} catch (err) {
  console.error('Erro ao ler os certificados SSL:', err);
}

