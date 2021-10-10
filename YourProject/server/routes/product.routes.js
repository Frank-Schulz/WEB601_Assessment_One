const express = require('express');
const { browseProducts, searchProducts, getProductPage, addProduct, editProduct, updateProduct } = require('../controllers/product.controllers');
const router = express.Router();


// Display the main product page
router.get("/", browseProducts);

// Display the main product page
router.get("/search/", searchProducts);

// Display product that matches the id in the url
router.get('/:parameter', getProductPage);

// Add a new product to the database
router.post('/add_product', addProduct);

// Load an edit page for the product
router.get('/edit/:parameter', editProduct);

// Update the details of the product
router.post('/update/:parameter', updateProduct);


module.exports = router;
