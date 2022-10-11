const  mongoose = require('mongoose')
const AdminStoreSchema = new mongoose.Schema({
    store_id : {
        type: String,
        required: true
    },
    store: {
        type: String,
        required: true
    },
    avater: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    Bank :{
        type: Object
    },
    address: {
       type: Object
    },
    date: {
        type: String,
        Default: Date.now()
    }

}, {timestamps: true});

const AdminStore = mongoose.model('store', AdminStoreSchema)
module.exports = AdminStore 