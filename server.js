const express = require('express');
const router = require('./routes/contactRoutes');
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./routes/userRoutes')
const mongoose  = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json()); // body-parser

app.use('/api/contacts', router);
app.use('/api/users', userRoutes);


app.use(errorHandler);

const start=async()=>{
    try {
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to db");

        const server = app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server running on port ${process.env.SERVER_PORT}`);
        });
    }
        catch (error) {
            console.error("Failed to connect to the database", error);
            process.exit(1);
        }
}
start()

