const seedAll = async () => {
    require('./seedUsers');
    require('./seedProducts');
}

seedAll();

module.exports = seedAll;
