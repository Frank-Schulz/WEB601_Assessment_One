const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    CatName: {
        type: 'string',
        required: true
    }
});

const categories = mongoose.model("category", categorySchema);
module.exports = categories;
