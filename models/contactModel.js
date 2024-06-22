const mongoose  = require("mongoose");
const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    name:{
        type:String,
        required: [true,"Please provide name"]
    },
    email:{
        type:String,
        required:[true,"Please provide email"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter a valid email address"]
    },
    phone:{
        type:String,
        required: [true,"Please provide phone number"]
    }
}, {timestamps:true})

module.exports = mongoose.model("Contacts",contactSchema)