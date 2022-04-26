const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        howToUse: {
            type: String,
            trim: true
        },
        rate: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            required: true
        },
        category: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Category',
                required: true
            }
        ]

    }
);


const Product = mongoose.model('Product', productSchema);

module.exports = Product;