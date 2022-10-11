const  mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")
const AdminSchema = new mongoose.Schema({
    unique_id : {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
       required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        
    }
}, { timestamps: true});
AdminSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id =  returnedObject._id.toString(),
        delete returnedObject._id;
        delete returnedObject._V;
        delete returnedObject.password;
    }
})
AdminSchema.plugin(uniqueValidator, {message: "Email already in use"})
const Admin = mongoose.model('Admin', AdminSchema)
module.exports = Admin