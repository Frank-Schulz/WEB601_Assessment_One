require('dotenv').config()

// const connectDB = require('../Config/db')
// connectDB();

const usersData = require("../data/users.data")
const Users = require("../model/users.model")

const importData = async () => {
    try {
        await Users.deleteMany()

        await Users.insertMany(usersData)

        console.log("Users seeded successfully");

        // process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

importData();

module.exports = importData;