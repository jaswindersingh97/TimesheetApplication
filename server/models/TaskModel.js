const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
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

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;