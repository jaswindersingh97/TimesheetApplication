const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json);

const cors = require('cors');
app.use(cors());

const connectDB = require('./config/db');

app.use((err, req,res,next)=>{
    console.log(err);
    res.status(err.status||500).json({message:err.message  ||'internal server error'});
});
