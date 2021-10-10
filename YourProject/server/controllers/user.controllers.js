const asyncHandler = require('express-async-handler');
const Users = require('../models/users.model');
const Cart = require('../models/cart.model');
const generateToken = require("../utils/generateToken.js");
const bcryptjs = require("bcryptjs");

//@description     Register new user
//@route           POST /users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName,
        DoB } = req.body;

    const userExists = await Users.findOne({ email });

    if (userExists) {
        res.status(404);
        throw new Error("User already exists");
    }

    const user = await Users.create({
        email,
        password,
        firstName,
        lastName,
        DoB
    });

    const userCart = await Cart.create({ userId: email })

    if (user) {
        res.redirect("/users/account");
    } else {
        res.status(400);
        throw new Error("Failed to create user");
    }
});

//@description     Auth the user
//@route           POST /users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // const user = await Users.findOne({ email });

    // console.log(await user.matchPassword(password));

    // if (user && (await user.matchPassword(password))) {
    //     res.render('home', {
    //         startContent: "Logged in",
    //         products: require("../data/products.data"),
    //     });
    // } else {
    //     res.status(400);
    //     throw new Error("Invalid email or password!");

    // }
    // find user and send correct response


    Users.findOne({ userId: email })
        .then((user) => {
            // check if found user was an object or null
            if (!user) {
                res.render("login", {
                    email,
                    errorMessage: "Email is not registered. Try with other email.",
                });
                return;
            } else if (user.matchPassword(password, user.password)) {
                // Adding user to session so we can have an eye.
                // redirect to the route for the profile
                req.session.user = user.email;
                // req.session.save(err => {
                //     if (err) {
                //         console.log(err);
                //     } else {
                //         res.send(req.session.user) // YOU WILL GET THE UUID IN A JSON FORMAT
                //     }
                // }); //THIS SAVES THE SESSION.
                res.redirect("/users/account");
                // console.log(req.session);
            } else {
                res.render("login", {
                    email,
                    errorMessage: "Incorrect password",
                });
            }
        })
        .catch((error) => console.log(error));
});

//@description     Display account page
//@route           GET /users/account
//@access          Public
const account = (req, res) => {
    // console.log(req.session);
    Users.findOne({ email: `${req.session.user}` })
        .then((user) => {
            res.render("account", { email, password, firstName, lastName, DoB, addresses } = user);
        });
}

//@description     Display edit account details page
//@route           GET /users/account
//@access          Public
const editDetails = (req, res) => {
    Users.findOne({ email: `${req.session.user}` })
        .then((user) => {
            res.render("edit-account-details", { email, password, firstName, lastName } = user);
        });
}

//@description     Update account details
//@route           POST /users/account/edit-details
//@access          Public
const updateDetails = asyncHandler(async (req, res) => {
    const {
        email,
        firstName,
        lastName,
        // oldPassword,
        // newPassword,
    } = req.body;

    // Users.findOne({ email: email })
    //     .then((user) => {
    //         if (Users.matchPassword(oldPassword, user.password)) {

    //     }
    // })

    await Users.findOneAndUpdate(
        { email: `${req.session.user}` },
        {
            $set: {
                email: email,
                firstName: firstName,
                lastName: lastName,
            }
        }
    )

    await Cart.findOneAndUpdate(
        { userId: `${req.session.user}` },
        {
            $set: {
                userId: email
            }
        }
    )

    req.session.user = email;

    res.redirect("/users/account")
})

//@description     Log out the user
//@route           POST /users/logout
//@access          Public
const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
}


module.exports = {
    registerUser,
    authUser,
    account,
    editDetails,
    updateDetails,
    logout
};
