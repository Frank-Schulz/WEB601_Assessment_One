const faker = require('faker');

let productsData = [
    // {
    //     name: "ProductOne",
    //     price: 100.00,
    //     // cartDesc: "Lorem ipsum dolor sit amet, consectetur adip",
    //     // shortDesc: "Lorem ipsum dolor sit amet",
    //     description: "Lorem ipsum dolor sit amet",
    //     // thumbPath: "../images/products/thumb/productOne",
    //     imagePath: "../images/products/productOne",
    //     stock: 2314,
    //     live: true,
    //     unlimited: false,
    // }
];

for (var i = 0; i < 100; i++) {
    productsData.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        imagePath: faker.image.imageUrl(),
        stock: faker.datatype.number(1000),
        live: faker.datatype.boolean(),
        unlimited: faker.datatype.boolean(),
    });
};

module.exports = productsData;
