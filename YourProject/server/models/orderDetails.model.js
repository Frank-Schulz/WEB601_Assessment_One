const mongoose = require('mongoose');

const orderDetailsSchema = new mongoose.Schema({
    OrderDetailName: {
        type: 'string',
        required: true
    },
    OrderDetailPrice: {
        type: 'number',
        required: true
    }
});

const orderDetails = mongoose.model("orderDetails", orderDetailsSchema);
module.exports = orderDetails;
