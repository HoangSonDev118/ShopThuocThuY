const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    product_slugify: {type: String, required: true},

    product_imgs: { required: true, type: Array },

    product_name: { required: true, type: String, maxLength: 200 },

    product_distributor: { type: String },

    product_goods: {type: Array},
    
    product_status: { required: true, type: Number },
    
    product_discount: { },

    contactToBuy: {type: Boolean, default: false},

    product_types: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        check: {
            type: Boolean,
            required: true,
            default: true
        }
    }],

    product_describe: {},

}, {
    timestamps: true
})

const Product = new mongoose.model("Product", productSchema)
module.exports = Product

