const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UserAdmin: {
        type: 'boolean',
        required: true
    },
    UserEmail: {
        unique: true,
        type: 'string',
        trim: true,
        required: true
    },
    UserPassword: {
        type: 'string',
        trim: true,
        required: true
    },
    UserFirstName: {
        type: 'string',
        trim: true,
        required: true
    },
    UserLastName: {
        type: 'string',
        trim: true,
        required: true
    },
    UserRegistrationDate: {
        timestamp: true
    },
    UserCity: {
        type: 'string',
        trim: true,
        required: true
    },
    UserState: {
        type: 'string',
        trim: true
    },
    UserZip: {
        type: 'string',
        trim: true,
        required: true
    },
    UserCountry: {
        type: 'string',
        trim: true,
        required: true
    },
    UserAddress: {
        type: 'string',
        trim: true,
        required: true
    },
    UserAddress2: {
        type: 'string',
        trim: true,
        required: true
    }
});

const users = mongoose.model("user", userSchema);
module.exports = users;
