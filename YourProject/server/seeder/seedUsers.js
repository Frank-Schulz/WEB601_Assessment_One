require('dotenv').config()

// const connectDB = require('../Config/db')
// connectDB();

const usersData = require("../data/users.data")
const Users = require("../models/users.model")
const Cart = require("../models/cart.model")

const importData = async () => {
    try {
        await Users.deleteMany()
        await Cart.deleteMany()

        // await Users.insertMany(usersData)
        const userInsert = async (user) => { await Users.create(user) };
        const userCart = async (email) => { await Cart.create({ userId: email }) }

        usersData.forEach(user => {
            userInsert(user)
                .then(userCart(user.email));
        });

        console.log("Users seeded successfully");

        // process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

importData();

module.exports = importData;
