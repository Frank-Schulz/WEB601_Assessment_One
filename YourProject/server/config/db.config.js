const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

module.exports = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit();
    }
};
