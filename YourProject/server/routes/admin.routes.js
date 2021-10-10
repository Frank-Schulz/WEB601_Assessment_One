const express = require('express');
const { isAdmin } = require('../controllers/admin.controllers');
const router = express.Router();


router.get("/", isAdmin);

/* -------------------------------- Products -------------------------------- */
router.get("/manage_products", (req, res) => {
    res.render("admin/manageProducts")
});

router.get("/manage_products/add_product", (req, res) => {
    res.render("admin/addProduct")
});

router.get("/manage_products/edit_product", (req, res) => {
    res.render("admin/editProduct")
});

/* --------------------------------- Orders --------------------------------- */
router.get("/manage_orders", (req, res) => {
    res.render("admin/manageOrders")
});


module.exports = router;
