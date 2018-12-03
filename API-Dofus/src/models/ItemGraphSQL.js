const graphql = require('graphql')
const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types;

const Item = mongoose.model('Item')


ObjectId.prototype.valueOf = function () {
	return this.toString();
};


class itemType {
    constructor(_id, name, description, effects, createdAt, _v){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.effects = effects;
        this.createdAt = createdAt;
        this._v = _v;
    }
}

class itemQuerys {
    async getItem( {id} ){
        return await Item.findOne({_id:id});
    }

    async updateItem({id, input}){
        //console.log("[itemQuerys] - updateItem: (input => "+id+")");
        return await Item.findByIdAndUpdate(id, input, {new: true})
    }

    async createItem({input}){
        return await Item.create(input);
    }

    async allItems(){
        return await Item.find({});
    }
}

let ItemSchemaGraph = graphql.buildSchema(`
    type itemType {
        _id: String!
		name: String!
		description: String
		effects: String
        createdAt: String
        _v: Int
    }

    input ItemInput {
		name: String
		description: String
		effects: String
        createdAt: String
        _v: Int
    }

    type itemQuerys {
        allItems: [itemType]
        getItem(id: ID!): itemType!
        updateItem(id: ID!, input: ItemInput): itemType!
        createItem(input: ItemInput!): itemType!
    }

    type Query {
        qItem: itemQuerys
    }

    type Mutation {
        mItem: itemQuerys
    }
`)

var ItemRootGraph = {
    qItem: () => {return new itemQuerys()},
    mItem: () => {return new itemQuerys()}
    //updadeItemTest: async ({id, input}) => {return await Item.findByIdAndUpdate(id, input, {new: true})}
}

module.exports = { ItemSchemaGraph, ItemRootGraph }