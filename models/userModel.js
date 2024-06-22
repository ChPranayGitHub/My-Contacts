const mongoose  = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required: [true,"Please provide username"]
    },
    email:{
        type:String,
        required:[true,"Please provide email"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter a valid email address"],
        unique: [true,"Email already registered"]
    },
    password:{
        type:String,
        required: [true,"Please provide password"],
        minlength: [6, "Password must be at least 6 characters long"],
        maxlength: [128, "Password cannot be more than 128 characters long"]
    }
}, {timestamps:true})

module.exports = mongoose.model('Users',userSchema);