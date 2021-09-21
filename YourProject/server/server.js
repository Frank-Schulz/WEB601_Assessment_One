const express = require("express");
const connectDB = require("./config/db");
// const dotenv = require('dotenv');
require("dotenv").config();

/* ------------------------------- Get Routes ------------------------------- */
const userRoutes = require("./routes/userRoutes");

// console.log("Hello", process.env.PORT);

const app = express();
// dotenv.config();
connectDB()
app.use(express.json());

const PORT = process.env.PORT || 5000;

/* --------------------------------- App Get -------------------------------- */

app.get("/", (req, res) => {
    console.log(req.url);
    res.send("Hello, world!");
});

/* --------------------------------- App Use -------------------------------- */

app.use('/user', userRoutes)

/* ---------------------------------- Start --------------------------------- */

app.listen(PORT, () => {
    console.log(`Started on port: ${PORT}`);
});
