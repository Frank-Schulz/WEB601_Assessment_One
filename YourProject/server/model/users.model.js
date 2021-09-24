const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        firstName: {
            type: 'string',
            trim: true,
            required: true
        },
        lastName: {
            type: 'string',
            trim: true,
            required: true
        },
        DoB: {
            type: Date,
            required: true,
        },
        addresses: [ {
            city: {
                type: 'string',
                trim: true
            },
            state: {
                type: 'string',
                trim: true
            },
            zip: {
                type: 'string',
                trim: true
            },
            country: {
                type: 'string',
                trim: true
            },
            address: {
                type: 'string',
                trim: true
            },
            address2: {
                type: 'string',
                trim: true
            }
        } ]
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;