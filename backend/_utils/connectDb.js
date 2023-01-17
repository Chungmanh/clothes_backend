const mongoose = require('mongoose');
const db = require('../_config/db');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/shop_web', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connect cuccessfully!!!')
    } catch (error) {
        console.log('connect failure!!!')
    }
}

module.exports = connect;





