const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required: true
    },
    password : {
        type : String,
        maxLength : 10 // 10 se kam hosakta he pswd lkn zyada nahi
    }
});

const model = mongoose.model("express" , loginSchema);

module.exports = model;