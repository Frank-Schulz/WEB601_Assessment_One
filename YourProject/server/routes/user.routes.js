const express = require('express');
const {
    registerUser,
    authUser,
    account,
    editDetails,
    updateDetails,
    logout } = require('../controllers/user.controllers');
const router = express.Router();

router.get('/', (reg, res) => {
    res.redirect('/')
})

router.get("/register", (req, res) => {
    res.render('register', {
        errorMessage: ""
    });
});

router.get("/login", (req, res) => {
    res.render('login', {
        email: "",
        errorMessage: ""
    });
});

// 1. POST route ==> to register the user
router.post('/register', registerUser);

// 2. POST route ==> to log in user
router.post('/login', authUser);

// 3. GET route ==> to render the profile page of the user.
router.get("/account/", account);

// 4. GET route ==> to render the edit details page of the account.
router.get("/account/edit-details", editDetails);

// 5. POST route ==> to edit the account details.
router.post("/account/edit-details", updateDetails);

// 6. POST route ==> to log out user and destroy the session
router.post("/logout", logout);

module.exports = router;
