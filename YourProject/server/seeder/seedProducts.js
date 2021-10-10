require('dotenv').config()

// const connectDB = require('../Config/db')
// connectDB();

const productsData = require("../data/products.data")
const Products = require("../models/products.model")

const importData = async () => {
    try {
        await Products.deleteMany()

        await Products.insertMany(productsData)

        console.log("Products seeded successfully");

        // process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

importData();

module.exports = importData;
