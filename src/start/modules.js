const fileUpload = require('express-fileupload');

const { errorHandler } = require('../middlewares/error-handler.middleware');
const routes = require('../routes');
const { connectToDatabase } = require('../utils/connection');

const modules = (app, express) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(fileUpload());

    connectToDatabase();

    app.use('/api', routes);

    app.use(errorHandler);
}

module.exports = modules;
