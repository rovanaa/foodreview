// Importação de Pacotes Necessários

import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes.js';
import connetcion from './config/db.js';
import dotenv from 'dotenv';

// Carregar as configuraçoes

dotenv.config({ path: './config/config.env' });

// Rodar o Servidor Express

const server = express();
const port = process.env.PORT || 5000;

server.listen(port, console.log(`Servidor rodando na porta ${port}...`))

const testConn = async () => {
    try {
        await connetcion.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

testConn();


server.use(bodyParser.urlencoded( { extended: true } ));
server.use(bodyParser.json());
server.use(router);

