const seedUsers = require('./seedUsers')
const seedProducts = require('./seedProducts')

// Caller for the various seeder functions
const seedAll = async () => {
    console.log("Seeding database with test data...");

    await seedUsers();
    await seedProducts();

    console.log("Data seeded successfully!");
}

module.exports = seedAll;
