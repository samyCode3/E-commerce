const  mongoose = require('mongoose')

const Category = new mongoose.Schema({
    category_id: {
        type: String
    },
    category: {
        type: String,
        required: true
    }
})
const category = mongoose.model("categories", Category)

module.exports = category