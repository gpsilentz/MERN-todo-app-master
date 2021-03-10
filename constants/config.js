require('dotenv').config();

const APP_PORT = process.env.PORT || process.env.APP_PORT;
const DB_CON = process.env.DB_CON;
const APP_SECRET_KEY = process.env.APP_SECRET_KEY;

module.exports = {
    APP_PORT,
    DB_CON,
    APP_SECRET_KEY
};
