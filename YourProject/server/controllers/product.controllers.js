const asyncHandler = require('express-async-handler');
const Products = require('../models/products.model');


//@description     Display the product browsing page
//@route           GET /products/
//@access          Public
const showBrowseProductsPage = asyncHandler(async (req, res) => {
  Products.find({})
    .then((products) => { res.send(products) });
});

//@description     Display the product page
//@route           GET /products/:parameter
//@access          Public
const showProductPage = asyncHandler(async (req, res) => {
  const productId = req.params.parameter;

  Products.findOne({ _id: productId })
    .then((product) => { res.send(product) })
});

//@description     Add new product to the database
//@route           POST /products/add_product
//@access          Admin
const performProductAdd = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    imagePath,
    stock,
    live,
    unlimited,
  } = req.body;

  if (!name) {
    res.status(401);
    throw new Error("Name is required!")
  } if (!price) {
    res.status(401);
    throw new Error("Price is required!")
  } if (!description) {
    res.status(401);
    throw new Error("Description is required!")
  } if (!imagePath) {
    res.status(401);
    throw new Error("Image path is required!")
  } if (!unlimited && !stock) {
    res.status(401);
    throw new Error("Stock is required!")
  }

  const faker = require('faker');
  _id = faker.datatype.uuid()

  Products.create({
    _id,
    name,
    price,
    description,
    imagePath,
    stock,
    live,
    unlimited,
  }).then((product) => {
    res.send(product);
  });
});

//@description     Update a products details
//@route           POST /products/update/:parameter
//@access          Admin
const performProductUpdate = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    imagePath,
    stock,
    live,
    unlimited,
  } = req.body;

  if (!name) {
    res.status(401);
    throw new Error("Name is required!")
  } if (!price) {
    res.status(401);
    throw new Error("Price is required!")
  } if (!description) {
    res.status(401);
    throw new Error("Description is required!")
  } if (!imagePath) {
    res.status(401);
    throw new Error("Image path is required!")
  } if (!unlimited && !stock) {
    res.status(401);
    throw new Error("Stock is required!")
  }

  await Products.findOneAndUpdate(
    { _id: req.params.parameter },
    {
      $set: {
        name: name,
        price: price,
        description: description,
        imagePath: imagePath,
        stock: stock,
        live: live,
        unlimited: unlimited
      }
    });
  Products.findOne({ _id: req.params.parameter })
    .then((product) => {
      res.send(product);
    })
    .catch((error) => {
      res.status(401);
      throw new Error(error.message);
    });
});

//@description     Deletes a product
//@route           POST /products/delete/:parameter
//@access          Admin
const performProductDelete = asyncHandler(async (req, res) => {
  const productId = req.params.parameter;

  Products.findOneAndDelete({ _id: productId })
    .then((product) => {
      res.send(product);
    });

});


module.exports = {
  showBrowseProductsPage,
  showProductPage,
  performProductAdd,
  performProductUpdate,
  performProductDelete
};
