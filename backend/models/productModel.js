const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: String,
    specification:String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    selling: Number,
},{
    timestamps : true
})


const productModel = mongoose.model("product",productSchema)

module.exports = productModel