// Require
const express = require("express");
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/error.middleware')
require("dotenv").config();

// Connect to the database
require("./config/db.config")();

const app = express();

// Include session to application
require("./config/session.config.js")(app);

/* ------------------------------- ANCHOR Get Routes ------------------------------- */
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('public'));

/* --------------------------------- ANCHOR Routes -------------------------------- */

app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.use(notFound);
app.use(errorHandler);


/* ---------------------------------- ANCHOR Start --------------------------------- */

const {
  PORT,
} = process.env;

app.listen(PORT, () => {
  console.log(`Started on port: ${PORT}`);
});


// Seed the database
const seedAll = require("./seeder/seedAll");
// seedAll();
