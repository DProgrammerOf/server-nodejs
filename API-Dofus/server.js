const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authorization = require('./auth');

// Iniciando APP
const app = express();
app.use(express.json());

// Conectando no MongoDB
mongoose.connect(
    'mongodb://localhost:27017/test',
     { useNewUrlParser : true }
);

// Models do Banco de Dados
require('./src/models/Item');


// Rotas da API
app.use(cors());

// Authentificação JSon Web Token + Passport
const auth  = authorization(app);
const AuthMiddleware = require('./src/auth/AuthController');
app.use(auth.initialize());
app.auth = auth;

app.post('/auth', AuthMiddleware.authentication);

app.use('/api', auth.authenticate(), require('./src/routes'));


app.listen(3005);

module.exports = app;