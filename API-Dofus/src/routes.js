const express = require('express');
const mongoose = require('mongoose');
const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');


const routes = express.Router();

const ItemController = require('./controllers/ItemController');
const ItemGraph = require('./models/ItemGraphSQL');


routes.get('/item', ItemController.indexItem);
// Exibição de Todos Itens

/* CRUD GRAPHQL */
routes.use('/itemgraph', graphqlHTTP({schema: ItemGraph.ItemSchemaGraph, rootValue: ItemGraph.ItemRootGraph, graphiql:true}));


/* CRUD REST */
routes.get('/item/:id', ItemController.showItem);
// Exibição do Item

routes.post('/item', ItemController.storeItem);
// Criação do Item

routes.put('/item/:id', ItemController.updateItem);
// Atualização do Item

routes.delete('/item/:id', ItemController.deleteItem);
// Deletamento do Item


routes.get('/user', (req, res) => {
    res.json(req.user);
});

module.exports = routes;