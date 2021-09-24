const asyncHandler = require('express-async-handler');
const User = require('../model/users.model');
const generateToken = require("../utils/generateToken.js");

const registerUser = asyncHandler(async (req, res) => {
    const { email,
        password,
        isAdmin,
        firstName,
        lastName,
        addresses: [ {
            city,
            state,
            zip,
            country,
            address,
            address2
        } ] } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(404);
        throw new Error("User already exists");
    }

    const user = await User.create({
        email,
        password,
        isAdmin,
        firstName,
        lastName,
        addresses: [ {
            city,
            state,
            zip,
            country,
            address,
            address2
        } ]
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            email,
            isAdmin,
            firstName,
            lastName,
            addresses: [ {
                city,
                state,
                zip,
                country,
                address,
                address2
            } ],
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        // res.json({
        //     _id: user._id,
        //     email: user.email,
        //     password: user.password,
        //     isAdmin: user.isAdmin,
        //     firstName: user.firstName,
        //     lastName: user.lastName,
        //     addresses: user.addresses,
        //     token: generateToken(user._id),
        // });
        res.render('home', {
            startContent: "Logged in",
            products: require("../data/products.data"),
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password!");

    }
});

module.exports = { registerUser, authUser };
