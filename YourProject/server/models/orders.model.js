const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userName: {
        type: 'string',
        required: true
    },
    userEmail: {
        type: 'string',
        required: true
    },
    price: {
        type: 'number',
        required: true
    },
    products: [ {
        name: {
            type: 'string'
        },
        price: {
            type: 'number'
        }
    } ],
    shipAddress: {
        type: 'string',
        required: true
    },
    shipAddress2: {
        type: 'string',
        required: true
    },
    city: {
        type: 'string',
        required: true
    },
    state: {
        type: 'string'
    },
    zip: {
        type: 'string',
        required: true
    },
    country: {
        type: 'string',
        required: true
    },
    shippingCost: {
        type: 'number',
        required: true
    },
    date: {
        timestamp: true,
        required: true
    },
    shipped: {
        type: 'date'
    },
    trackingNumber: {
        type: 'number',
    }
});

const Orders = mongoose.model("order", orderSchema);
module.exports = Orders;
