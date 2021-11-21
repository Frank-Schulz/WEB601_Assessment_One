const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: 'string',
            trim: true,
            required: true,
            unique: true,
        },
        password: {
            type: 'string',
            trim: true,
            required: true
        },
        isAdmin: {
            type: 'boolean',
            required: true,
            default: false,
        },
        fullName: {
            type: 'string',
            trim: true,
            required: true
        },
        DoB: {
            type: Date,
            required: true,
        },
        addresses: [ {
            name: {
                type: 'string',
                trim: true,
            },
            streetName: {
                type: 'string',
                trim: true
            },
            streetAddress: {
                type: 'string',
                trim: true
            },
            city: {
                type: 'string',
                trim: true
            },
            zip: {
                type: 'string',
                trim: true
            },
            state: {
                type: 'string',
                trim: true
            },
            country: {
                type: 'string',
                trim: true
            },
        } ]
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
