// Require
const express = require("express");
const bodyParser = require('body-parser');
const logger = require('morgan');
const ejs = require('ejs');
const _ = require('lodash');
const { notFound, errorHandler } = require('./middlewares/error.middleware')
const connectDB = require("./config/db");

require("dotenv").config();

/* ------------------------------- ANCHOR Page Content ------------------------------- */

const startContent = "Hello World";

const products = require("./data/products.data");
// console.log(products);

/* ------------------------------- ANCHOR Get Routes ------------------------------- */
const userRoutes = require("./routes/user.routes");
const { removeListener } = require("./model/users.model");

// console.log("Hello", process.env.PORT);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('public'));

connectDB()

require("./seeder/seedAll");

/* --------------------------------- ANCHOR App Get -------------------------------- */

app.get("/", (req, res) => {
    res.render('home', {
        startContent: startContent,
        products: products,
    });
});

app.get("/login", (req, res) => {
    res.render('login');
});

app.get("/register", (req, res) => {
    res.render('register');
});

app.get("/products", (req, res) => {
    res.render('products', {
        products: products,
    });
});

app.get('/products/:parameter', function (req, res) {
    const requestTitle = _.lowerCase(req.params.parameter) // lowercase

    products.forEach(function (product) {
        const storedTitle = _.lowerCase(product.id)
        if (storedTitle === requestTitle) {
            res.render('product', {
                name: product.name,
                price: product.price,
                stock: product.stock,
                description: product.description,
            })
        }
    });
    // If product is not found in the database
    res.render('404', {
        message: 'Product not found'
    });
});

/* --------------------------------- ANCHOR App Use -------------------------------- */

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

/* --------------------------------- ANCHOR App post -------------------------------- */


/* ---------------------------------- ANCHOR Start --------------------------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Started on port: ${PORT}`);
});
