const productsData = require("../data/products.data")
const Products = require("../models/products.model")

// Seeder function for products
const seedProducts = async () => {
    console.log("Seeding product data...");
    try {
        await Products.deleteMany()
        await Products.insertMany(productsData)

        console.log("Products seeded successfully!");

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = seedProducts;
