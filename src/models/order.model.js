const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    foodId: {
        type: Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    count: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = model('Order', orderSchema);
