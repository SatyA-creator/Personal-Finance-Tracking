const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);  // <-- FIXED HERE
        console.log('Db Connected');
    } catch (error) {
        console.log('DB Connection Error', error.message);
    }
}

module.exports = { db };
