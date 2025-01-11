const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select:false,
    },
    userType:{
      required:true,
      type:String,
      enum:['manager', 'employee'], 
    },
    employee:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        select:false
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        select:false
    },
},{
    timestamps: true
  });

const User = mongoose.model('User', userSchema);

module.exports = User;