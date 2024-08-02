const { Schema, model } = require('mongoose');

const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, {timestamps: true});

module.exports = model('Food', foodSchema);
