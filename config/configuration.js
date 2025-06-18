const mongoose = require('mongoose');
const path = require('path');

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL || process.env.DATABASE_URI);
        console.log(`Connected to MongoDB at ${process.env.DATABASE_URL}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDb;