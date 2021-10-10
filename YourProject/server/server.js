// Require
const express = require("express");
const bodyParser = require('body-parser');
const logger = require('morgan');
const ejs = require('ejs');
const _ = require('lodash');
const { notFound, errorHandler } = require('./middlewares/error.middleware')
require("dotenv").config();

// Connect to the database
require("./config/db.config")();

const {
    PORT,
} = process.env;

const app = express();

// Include session to application
require("./config/session.config.js")(app);

/* ------------------------------- ANCHOR Page Content ------------------------------- */

const startContent = "Hello World";

const Products = require('./models/products.model');
// const test = async () => await Products.find({})
// products = test()

/* ------------------------------- ANCHOR Get Routes ------------------------------- */
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");

const { removeListener } = require("./models/users.model");

app.set('view engine', 'ejs');

// // Seed the database
// require("./seeder/seedAll");


app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json());
app.use(express.static('public'));

/* --------------------------------- ANCHOR Routes -------------------------------- */

app.get("/", async (req, res) => {
    const products = await Products.find({})

    res.render('home', {
        startContent: startContent,
        products: products,
    });
});

app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.use(notFound);
app.use(errorHandler);


/* ---------------------------------- ANCHOR Start --------------------------------- */

app.listen(PORT, () => {
    console.log(`Started on port: ${PORT}`);
});
