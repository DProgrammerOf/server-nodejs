const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    effects: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    age: {
        type: Number,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
});

ItemSchema.plugin(mongoosePaginate);

mongoose.model("User", UserSchema);
mongoose.model("Item", ItemSchema);
