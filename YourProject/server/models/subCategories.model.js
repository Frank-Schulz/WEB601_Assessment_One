const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    SubCatName: {
        type: 'string',
        required: true
    }
});

const subCategories = mongoose.model("subCategory", subCategorySchema);
module.exports = subCategories;
