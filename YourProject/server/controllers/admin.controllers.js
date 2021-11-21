const asyncHandler = require('express-async-handler');
const Users = require('../models/users.model');
const Products = require('../models/products.model');


//@description     Show the admin page if user is an admin
//@route           GET /admin
//@access          Admin
const showAdminPage = asyncHandler(async (req, res) => {
  const { isAdmin } = req.session.user;

  if (isAdmin) {
    res.redirect('/admin');
  } else {
    res.redirect('/');
  }
});

//@description     Show the admin page if user is an admin
//@route           GET /admin/add_product
//@access          Admin
const showAddProductPage = asyncHandler(async (req, res) => {
  res.redirect("admin/addProduct");
});

//@description     Show the admin page if user is an admin
//@route           GET /admin/manage_orders
//@access          Admin
const showOrderManagementPage = asyncHandler(async (req, res) => {
  res.redirect("admin/manageOrders");
});

//@description     Show the admin page if user is an admin
//@route           GET /admin/manage_orders
//@access          Admin
const showOrderPage = asyncHandler(async (req, res) => {
  res.render("admin/manageOrders");
});

//@description     Add a product to the database
//@route           POST /admin/add_product
//@access          Admin
const performEditOrder = asyncHandler(async (req, res) => {
  
});


module.exports = {
  showAdminPage,
  showAddProductPage,
  showOrderManagementPage,
  showOrderPage,
  performEditOrder
};
