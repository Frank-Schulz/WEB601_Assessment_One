const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: 'string',
            required: true
        },
        price: {
            type: 'number',
            required: true
        },
        cartDesc: {
            type: 'string'
        },
        shortDesc: {
            type: 'string',
            required: true
        },
        longDesc: {
            type: 'string',
            required: true
        },
        thumbPath: {
            type: 'string',
            required: true
        },
        imagePath: {
            type: 'string',
            required: true
        },
        stock: {
            type: 'number',
            required: true
        },
        live: {
            type: 'boolean',
            required: true
        },
        unlimited: {
            type: 'boolean',
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Products = mongoose.model("product", productSchema);
module.exports = Products;
