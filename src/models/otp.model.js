const {Schema, model} = require('mongoose');

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Otp', otpSchema);