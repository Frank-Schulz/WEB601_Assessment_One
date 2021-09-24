const faker = require('faker');

let usersData = [
    {
        email: "admin@example.com",
        password: "Password123",
        isAdmin: true,
        firstName: "Frank",
        lastName: "Admin",
        DoB: "11/09/1999",
        addresses: [ {
            city: "Nelson",
            state: "Nelson",
            zip: "7010",
            country: "New Zealand",
            address: "Nikau Apartments",
            address2: "85 Nile Street"
        } ],
    },
];

for (let i = 0; i < 10; i++) {
    usersData.push({
        email: faker.internet.email(),
        password: faker.internet.password(),
        isAdmin: faker.datatype.boolean(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        DoB: faker.date.past(),
        addresses: [ {
            city: faker.address.city(),
            state: faker.address.state(),
            zip: faker.address.zipCode(),
            country: faker.address.country(),
            address: faker.address.streetName(),
            address2: faker.address.streetAddress(),
        } ],
    });
};

module.exports = usersData;