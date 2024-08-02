const {Schema, model} = require('mongoose');

const categeorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = model('Category', categeorySchema);