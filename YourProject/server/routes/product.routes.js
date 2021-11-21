const express = require('express');
const {
    showBrowseProductsPage,
    showProductPage,
    performProductAdd,
    performProductUpdate,
    performProductDelete
} = require('../controllers/product.controllers');
const router = express.Router();


// GET route ==> to show the products page
router.get("/", showBrowseProductsPage);

// GET route ==> Display product that matches the id in the url
router.get('/:parameter', showProductPage);

// POST route ==> Add a new product to the database
router.post('/add_product', performProductAdd);

// POST route ==> Update the details of the product
router.post('/update/:parameter', performProductUpdate);

// POST route ==> Delete a product
router.delete('/delete/:parameter', performProductDelete);


module.exports = router;
