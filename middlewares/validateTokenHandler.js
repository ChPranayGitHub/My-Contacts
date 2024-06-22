const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.header('Authorization'); 
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                const error = new Error("User is not authorized");
                error.statusCode = StatusCodes.UNAUTHORIZED;
                throw error;
            }
            req.user = decoded.user;
            next();
        });
    } else {
        const error = new Error("Authorization header is missing or invalid");
        error.statusCode = StatusCodes.UNAUTHORIZED;
        throw error;
    }
});

module.exports = validateToken;
