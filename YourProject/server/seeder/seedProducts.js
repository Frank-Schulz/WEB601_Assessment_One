require('dotenv').config()

import connectDB from '../Config/db';

import productsData from "../data/productsData";
import { deleteMany, insertMany } from "../model/products";

connectDB();

const importData = async () => {
    try {
        await deleteMany()

        await insertMany(productsData)

        process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

importData();
