const asyncHandler = require('express-async-handler');
const Products = require('../models/products.model');
const Users = require('../models/users.model');
const _ = require('lodash');

// const products = require("../data/products.data");


async function getUser(req) {
    return await Users.findOne({ email: req.session.user })
        .then((user) => { return user; });
}


//@description     Display the product browsing page
//@route           GET /products/
//@access          Public
const browseProducts = asyncHandler(async (req, res) => {
    const products = await Products.find({})

    res.render('products', {
        products: products,
        message: '',
    });
})


//@description     Display the filtered product browsing page
//@route           GET /products/
//@access          Public
const searchProducts = asyncHandler(async (req, res) => {
    let message = '';

    if (req.query.search) {
        let query = [];


        // query =
        req.query.search.trim().split(' ').forEach(word => {
            query.push(word)
        })
        console.log(query);

        const products = await Products.find({ name: { $regex: /metal/ } })

        console.log(products);

        if (products == []) {
            message = "No products found that match the search criteria";
            res.render('products', {
                products: products,
                message: message,
            });
            return
        }

        res.render('products', {
            products: products,
            message: message,
        });
    } else {
        const products = await Products.find({})
        res.render('products', {
            products: products,
            message: "Please enter a search query",
        });
    }
})


//@description     Display the product page
//@route           GET /products/:parameter
//@access          Public
const getProductPage = asyncHandler(async (req, res) => {

    // Get user object
    const user = await getUser(req);

    const products = await Products.find({})

    products.forEach((product) => {
        if (req.params.parameter === product._id) {
            res.render('product', {
                user: user ? user : false,
                product: product,
                errorMessage: "",
            });
        }
    });

    // If product is not found in the database
    res.render('404', {
        message: 'Product not found'
    });
});


//@description     Add new product to the database
//@route           POST /products/add_product
//@access          Admin
const addProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        imagePath,
        stock,
        live,
        unlimited,
    } = req.body;

    const product = await Products.create({
        name,
        price,
        description,
        imagePath,
        stock,
        live,
        unlimited,
    });

    if (product) {
        res.status(201, "Product created successfully")
    }
})


// @description     Display the product edit page
// @route           GET /products/edit/:parameter
// @access          Admin
const editProduct = asyncHandler(async (req, res) => {

    // Get user object
    const user = await getUser(req);

    const products = await Products.find({})

    products.forEach((product) => {
        if (req.params.parameter === product._id) {
            res.render('admin/editProducts', {
                user: user ? user : false,
                product: product,
                errorMessage: "",
            });
        }
    });

    // If product is not found in the database
    res.render('404', {
        message: 'Product not found'
    });
});


//@description     Update a products details
//@route           POST /products/edit_product
//@access          Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        imagePath,
        stock,
        live,
        unlimited,
    } = req.body;

    const product = await Products.findOneAndUpdate(
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
        }
    )

    if (product) {
        res.status(201).json({
            name,
            price,
            description,
            imagePath,
            stock,
            live,
            unlimited,
        })
    }
})


module.exports = { browseProducts, searchProducts, getProductPage, addProduct, editProduct, updateProduct };
