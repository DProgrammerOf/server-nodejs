const mongoose = require('mongoose');

const Item = mongoose.model('Item');

async function indexItem(req, res) {
    // Listagem de Todos Itens
    let { page = 1 } = req.query;
    let Itens = await Item.paginate({}, { page, limit: 2 });

    return res.json(Itens);
}

async function showItem(req, res) {
    // Exibição de Item
    let infoItem = await Item.findById(req.params.id);

    return res.json(infoItem);
}

async function storeItem(req, res) {
    // Inserção de Item
    let addItem = await Item.create(req.body);

    return res.json(addItem);
}

async function updateItem(req, res){
    // Update de Item
    let updItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});
    
    return res.json(updItem);
}

async function deleteItem(req, res){
    // Delete de Item
    let delItem = await Item.findByIdAndRemove(req.params.id, (err) => {
        if(err)
            res.json({"error": true, "message": err});
        else
            res.json({"error": false, "message": "Sucesso em deletar o ObjectId."});
    });
}

module.exports = {
    indexItem, showItem, storeItem, updateItem, deleteItem
}