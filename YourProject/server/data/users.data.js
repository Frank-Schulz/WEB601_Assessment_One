const faker = require('faker');

let usersData = [ {
    email: "admin@example.com",
    password: "Password123",
    isAdmin: true,
    fullName: "Frank Schulz",
    // firstName: "Frank",
    // lastName: "Schulz",
    DoB: "11/09/1999",
    addresses: [ {
        name: "Address 1",
        streetName: "Nikau Apartments",
        streetAddress: "85 Nile Street",
        city: "Nelson",
        zip: "7010",
        state: "Nelson",
        country: "New Zealand",
    } ],
}, ];

for (let i = 0; i < 10; i++) {
    usersData.push({
        email: faker.internet.email(),
        password: faker.internet.password(),
        isAdmin: faker.datatype.boolean(),
        fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        DoB: faker.date.past(),
        addresses: [ {
            name: `Address 1`,
            streetName: faker.address.streetName(),
            streetAddress: faker.address.streetAddress(),
            city: faker.address.city(),
            zip: faker.address.zipCode(),
            state: faker.address.state(),
            country: faker.address.country(),
        } ],
    });
};

module.exports = usersData;
