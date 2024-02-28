require('dotenv').config();

module.exports = {
    db_localhost: process.env.DB_HOST,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_database: process.env.DB_DATABASE,
    db_port: process.env.DB_PORT,
    jwt_secret: process.env.jwt_secret
}