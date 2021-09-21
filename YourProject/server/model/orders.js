const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    OrderShipName: {
        type: 'string',
        required: true
    },
    OrderShipAddress: {
        type: 'string',
        required: true
    },
    OrderShipAddress2: {
        type: 'string',
        required: true
    },
    OrderCity: {
        type: 'string',
        required: true
    },
    OrderState: {
        type: 'string'
    },
    OrderZip: {
        type: 'string',
        required: true
    },
    OrderCountry: {
        type: 'string',
        required: true
    },
    OrderShipping: {
        type: 'number',
        required: true
    },
    OrderEmail: {
        type: 'string',
        required: true
    },
    OrderDate: {
        timestamp: true,
        required: true
    },
    OrderShipped: {
        type: 'date'
    },
    OrderTrackingNumber: {
        type: 'number',
    }
});

const orders = mongoose.model("order", orderSchema);
module.exports = orders;
