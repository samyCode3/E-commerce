const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true},
    products: 
    [
        {
            productId: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
       
    ]
    
},

)

const MyCart = mongoose.model("Cart", CartSchema)

module.exports = MyCart