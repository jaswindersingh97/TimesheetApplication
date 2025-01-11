const mongoose = require('mongoose');
const SubmissionModel = new mongoose.Schema({
    rating:{
        type:Number,
        default:0
    },
    managerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
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

const Submission = mongoose.model('Submission',SubmissionModel);

module.exports = Submission;