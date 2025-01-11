const User = require("../models/UserModel");
const asyncHandler = require("../utils/asyncHandler")
const Task = require('./../models/TaskModel');
const addEmployee = async(req,res) =>{
    const {userId,userType} = req.user;
    if(userType !=='manager'){
        return res.status(400).json({message:"The user is not manager"})
    }
    const {employeeId} = req.body;
    const employee = await User.findOne({
        _id:employeeId,
        userType:'employee'
    })

    if(!employee){
        return res.status(400).json({message:"The employee doesn't exists or is a manager"})
    }

    if(employee.managerId){
        return res.status(400).json({message:"The employee already has a manager"});
    }

    const user = await User.findOne({
        _id:userId,
        userType:'manager'
    })

    if(!user){
        return res.status(400).json({
            message:"either the user is employee or doesn't exists"
        })
    }

    user.employees = [...user.employees , employeeId]

    employee.managerId = userId;
    user.save();
    employee.save();

    return res.status(200).json({message:"User added successfully"})
}

const getUserTasks =async(req,res) =>{
    const {userId,userType} = req.user;
    if(userType !=='manager'){
        return res.status(400).json({message:"The user is not manager"})
    }

    const user = await User.findOne({
        _id:userId,
        userType:'manager'
    })

    if(!user){
        return res.status(400).json({
            message:"either the user is employee or doesn't exists"
        })
    }

    const Tasks  = await Task.find(
        {

        }
    )
} 
const getTasks = async(req,res) =>{
    const{userId, userType} = req.user;
    
    if(userType !== 'employee'){
        return res.status(400).json({message:"User is not employee"})
    }

    const tasks = Task.find({userId})

    return res.status(200).json({message:"tasks fetched successfully", tasks:tasks});
} 
const addTask = async(req,res) =>{
    const {name,content} = req.body;
    const {userId,userType} = req.user;

    if(userType !== 'employee'){
        return res.status(400).json({message:"User is not employee"})
    }

    const response = await Task.create({name, content, userId});

    return res.status(201).json({message:"Task created successfully", response});
}
module.exports = {
    addEmployee:asyncHandler(addEmployee),
    getUserTasks:asyncHandler(getUserTasks),
    getTask:asyncHandler(getTask),    
    addTask,
    // editTask,
    // deleteTask
}