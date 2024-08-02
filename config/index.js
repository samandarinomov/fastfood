require('dotenv/config');

const config = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION,
    mongoURI: process.env.MONGO_URI,
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
}

module.exports = {config};