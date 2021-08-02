
require('dotenv').config();

const CONFIG = {
    SECRET_KEY:'',
    DB_URL:process.env.DB_URL,
    DB_USERNAME:process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME:process.env.DB_NAME,
    PORT: process.env.NODE_ENV == 'production' ? process.env.PORT : 3000

}


module.exports = CONFIG;