const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true},
    desc: {type: String, required: true},
    categories: {type: Array},
    size: {type: String, required: true},
    color: {type: String, required: true},
    price: {type: Number, required: true},
    likes: {type: Number, default: 0},
    unlikes: {type: Number, default: 0}

}, { timestamps: true})

const MyProduct = mongoose.model("product", ProductSchema)

module.exports = MyProduct