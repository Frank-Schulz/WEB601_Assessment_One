const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    ProductName: {
        type: 'string',
        required: true
    },
    ProductPrice: {
        type: 'number',
        required: true
    },
    ProductCartDesc: {
        type: 'string'
    },
    ProductShortDesc: {
        type: 'string',
        required: true
    },
    ProductLongDesc: {
        type: 'string',
        required: true
    },
    ProductThumbPath: {
        type: 'string',
        required: true
    },
    ProductImagePath: {
        type: 'string',
        required: true
    },
    ProductUpdateTime: {
        timestamp: true
    },
    ProductStock: {
        type: 'number',
        required: true
    },
    ProductLive: {
        type: 'boolean',
        required: true
    },
    ProductUnlimited: {
        type: 'boolean',
        required: true
    }
});

const products = mongoose.model("product", productSchema);
module.exports = products;
