const { connect } = require('mongoose');
const { config } = require('../../config');

const connectToDatabase = async() => {
    try {
        await connect(config.mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

module.exports = { connectToDatabase };
