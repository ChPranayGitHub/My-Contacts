const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const registerUser = asyncHandler(async(req,res)=>{
    const username= req.body.username;
    const email= req.body.email;
    const password= req.body.password;

    if(!username || !email || !password){
        const error = new Error("All fields are mandatory")
        error.StatusCode = StatusCodes.BAD_REQUEST;
        throw error;
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
        const error = new Error("Email alraedy exsits")
        error.StatusCode = StatusCodes.CONFLICT;
        throw error;
    }
    
    const salt  = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const user  = await users.create({username,email,password: hashedPassword});
    if(user){
        res.status(StatusCodes.CREATED).json(user);
    }
    else{
        const error = new Error("Unable to register")
        error.StatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }



})

const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        const error = new Error("All fields are mandatory")
        error.StatusCode = StatusCodes.BAD_REQUEST;
        throw error;
    }
    const user = await users.findOne({email});
    if(user && await bcrypt.compare(password,user.password)){
        const accessToken = jwt.sign({
            user:{username: user.username,
                email: user.email,
                id: user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30d'})
        res.status(StatusCodes.OK).json({accessToken});
    }
    else{
        const error = new Error("Not authenticated user")
        error.StatusCode = StatusCodes.UNAUTHORIZED;
        throw error;
    }
})

const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user);
})

module.exports = {registerUser,loginUser,currentUser};