const express = require('express');
const {
    showCart,
    performAddToCart
} = require('../controllers/cart.controllers');
const router = express.Router();

// 1. GET route ==> display the users cart
router.get("/", showCart);

// 2. POST route ==> add product to users cart
router.post("/add", performAddToCart);

module.exports = router;
