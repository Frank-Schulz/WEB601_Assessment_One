const seedAll = async () => {
    require('./seedUsers');
    require('./seedProducts');
}

console.log("all seeded");

seedAll();

module.exports = seedAll;
