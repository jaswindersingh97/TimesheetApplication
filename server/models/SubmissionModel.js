const mongoose = require('mongoose');
const SubmissionModel = new mongoose.Schema({
    rating:Number,
    managerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    TaskId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tasks'
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

const Submission = mongoose.model('Submission',SubmissionModel);

module.exports = Submission;