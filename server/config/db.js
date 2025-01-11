const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const connectDB = () =>{
    try{
        mongoose.connect(MONGO_URI);
        console.log("Mongo Db connnected Successfully");
    }
    catch(error){
        console.log("Something went wrong while connecting db", error.message);
        process.exit(1);
    }    
}
module.exports = connectDB;