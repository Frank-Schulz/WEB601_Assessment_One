const asyncHandler = require('express-async-handler');
const Users = require('../models/users.model');
const Cart = require('../models/cart.model');
const generateToken = require("../utils/generateToken.js");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/users.model');

const saltRounds = 10;

//@description     Show the login page
//@route           GET /users/login
//@access          Public
const showLoginPage = (req, res, next) => {
  res.send({
    email: "",
    password: "",
    errorMessage: ""
  });
};

//@description     Show the register page
//@route           GET /users/register
//@access          Public
const showRegisterPage = (req, res, next) => {
  res.send({
    email: "",
    password: "",
    fullName: "",
    DoB: "",
    errorMessage: ""
  });
};

//@description     Show the account page
//@route           GET /users/account
//@access          Public
const showAccountPage = (req, res) => {
  res.send({ user: req.session.user });
}

//@description     Show edit account details page
//@route           GET /users/account
//@access          Public
const showDetailsPage = (req, res) => {
  res.send({ user: req.session.user });
};

//@description     Auth the user
//@route           POST /users/login
//@access          Public
const performUserAuthentication = asyncHandler(async (req, res, next) => {
  // Get login form data
  const { email, password } = req.body;
  // Validate that email and password are not empty.
  if (!email || !password) {
    res.status(401);
    throw new Error("All fields are mandatory. Please provide your email and password!");
  }

  Users.findOne({ email })
    .then((user) => {
      // check if found user was an object or null
      // check if entered password is correct
      if (user && bcrypt.compareSync(password, user.password)) {
        // Add user to session and redirect to the user's account page
        req.session.user = user;
        res.redirect("/users/account");
      } else {
        res.status(401);
        throw new Error("Incorrect email or password!");
      }
    })
    .catch((error) => next(error));
});

//@description     Log out the user
//@route           POST /users/logout
//@access          Public
const performLogout = (req, res) => {
  req.session.destroy();
  res.send(true);
};

//@description     Register new user
//@route           POST /users/register
//@access          Public
const performUserRegistration = asyncHandler(async (req, res, next) => {
  const {
    email,
    password,
    fullName,
    DoB, } = req.body;

  if (!email || !password || !fullName || !DoB) {
    res.status(401);
    throw new Error("All fields are required!");
  }

  const emailFormatRegex = /^\S+@\S+\.\S+$/;

  if (!emailFormatRegex.test(email)) {
    res.status(401);
    throw new Error("Please use a valid email address!");
  }

  // Strong password pattern.
  const strongPasswordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  // Validate that incoming password matches regex pattern.
  if (!strongPasswordRegex.test(password)) {
    res.status(401);
    throw new Error("Password needs to have at least 6 characters and must contain at least one number, one lowercase and one uppercase letter!")
  }

  // First use bcrypt to hash incoming password
  bcrypt
    .hash(password, saltRounds)
    // Create new user with the hashed password
    .then((hashedPassword) =>
      Users.create({
        email,
        password: hashedPassword,
        fullName,
        DoB,
      })
        .then((newUser) => {
          // create a cart for the new user
          Cart.create({ userId: newUser.email })

          // add user to session.
          req.session.user = newUser;

          // redirect to user profile.
          res.redirect("/users/account");
        })
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
            res.status(500);
            throw new Error(error.message);
          } else if (error.code === 11000) {
            res.status(500);
            throw new Error("Email is already used, your email needs to be unique!");
          } else {
            next(error);
          }
        })
    )
    .catch((err) => next(err));
});

//@description     Update account details
//@route           POST /users/account/editDetails
//@access          Public
const performUpdateUserDetails = asyncHandler(async (req, res) => {
  const { userInfo, fullName, email } = req.body;

  if (!fullName && !email) {
    res.status(401);
    throw new Error("You cannot submit empty fields!")
  }

  const emailFormatRegex = /^\S+@\S+\.\S+$/;

  if (!emailFormatRegex.test(email)) {
    res.status(401);
    throw new Error("Please use a valid email address!");
  }
  await Users.findOne({ email: email })
    .then(() => {
      res.status(401);
      throw new Error("Email address is already in use!");
    });

  await Users.findOneAndUpdate(
    { email: userInfo.email },
    {
      email: email,
      fullName: fullName,
    });
  Users.findOne({ email: userInfo.email })
    .then((user) => {
      req.session.user = user;
      res.send({ user: req.session.user });
    })
    .catch((err) => next(err));
});

//@description     Add address to account
//@route           POST /users/account/addAddress
//@access          Public
const performAddAddress = asyncHandler(async (req, res, next) => {
  const { user, addressName, streetName, streetAddress, city, zip, state, country, } = req.body;

  if (!addressName) {
    res.status(401);
    throw new Error("You must provide a name! e.g. Address 2");
  }
  if (!(streetName || streetAddress || city || zip || state || country)) {
    res.status(401);
    throw new Error("Please enter at least one field!");
  }

  user.addresses.forEach(address => {
    if (addressName == address.name) {
      res.status(401);
      throw new Error("You must provide a unique name!")
    }
  });

  const address = { name: addressName, streetName, streetAddress, city, zip, state, country, };

  Users.findOneAndUpdate(
    { email: user.email },
    { $push: { addresses: address } })
    .then(() => {
      Users.findOne({ email: user.email })
        .then((user) => {
          req.session.user = user;
          res.send({ user: req.session.user });
        })
    })
    .catch((err) => next(err));
});

//@description     Delete an address
//@route           DELETE /users/account/address
//@access          Public
const performDeleteAddress = asyncHandler(async (req, res, next) => {
  const { userEmail, addressName } = req.body;

  Users.findOne({ email: userEmail })
    .then((user) => {
      let addresses = user.addresses;

      for (let i = 0; i < addresses.length; i++) {
        const address = addresses[ i ];
        if (address.name == addressName) {
          const deleted = addresses.splice(i, 1);

          Users.findOneAndUpdate(
            { email: user.email },
            { addresses: addresses })
            .then(() => {
              Users.findOne({ email: user.email })
                .then((user) => {
                  req.session.user = user;
                  res.send({ user: req.session.user });
                })
            })
        }
      }
    });

});

//@description     Delete an account
//@route           POST /account/delete
//@access          Public
const performDeleteAccount = asyncHandler((req, res, next) => {
  const { email } = req.body;

  Users.findOneAndDelete({ email: email })
    .then(() => {
      res.send(email);
    })

});


module.exports = {
  showLoginPage,
  showRegisterPage,
  showAccountPage,
  showDetailsPage,
  performUserAuthentication,
  performUserRegistration,
  performUpdateUserDetails,
  performAddAddress,
  performLogout,
  performDeleteAddress,
  performDeleteAccount,
};
