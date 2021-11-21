const express = require('express');
const {
    showAdminPage,
    showAddProductPage,
    showOrderManagementPage,
    showOrderPage,
    performEditOrder } = require('../controllers/admin.controllers');
const router = express.Router();


// GET route ==> to check if the current user is an admin
router.get("/", showAdminPage);

// GET route ==> to show the add product page
router.get("/add_product", showAddProductPage);

// GET route ==> to show the order management page
router.get("/manage_orders", showOrderManagementPage);

// GET route ==> to show an order page
router.get("/manage_orders/:parameter", showOrderPage);

// POST route ==> to edit an order
router.post("/manage_orders/:parameter", performEditOrder);


module.exports = router;
