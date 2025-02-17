const Submission = require("../models/SubmissionModel");
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

const getSubmissions =async(req,res) =>{
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

    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);

    const submissions = await Submission.find({
        managerId:userId,
        createdAt:{
            $gte:startOfDay
        }}).populate('employeeId')
    
    if(!submissions){
        return res.status(404).json({
            message:"no submissions done"
        });
    }    

    return res.status(200).json({
        message:"submissions are found", submissions:submissions
    })
} 
const getTasks = async(req,res) =>{
    const{userId, userType} = req.user;
    
    if(userType !== 'employee'){
        return res.status(400).json({message:"User is not employee"})
    }

    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);
    const tasks = await Task.find({userId, createdAt:{
        $gte:startOfDay }})

    return res.status(200).json({message:"tasks fetched successfully", tasks});
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
const submitTasks = async(req, res) =>{
    const {userId, userType} = req.user;
    if(userType !== 'employee'){
        return res.status(400).json({
            message:"user is not employee"
        })
    }
    const employee = await User.findById(userId)
    const response = await Submission.create({employeeId:userId, managerId:employee.managerId})
    return res.status(201).json({
        message:"tasks submitted successfully, task is no loger editable", response
    });
}

const editTask  =() =>{

}
const deleteTask = async(req,res)=>{
    const {TaskId} = req.params;

    const task =await Task.findByIdAndDelete(TaskId);
    
    return res.status(200).json({message:"Task is deleted"});
}
const getUserTasks = async(req,res) =>{
    const {userId} = req.params;
    
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);

    const tasks = await Task.find({userId, createdAt:{
        $gte:startOfDay }})
    return res.status(200).json({message:"tasks fetched successfully", tasks});
}
const rateEmployee = async(req,res) =>{

    const {userId,userType} = req.user;
    const {employeeId, rating} = req.body;
    
    if(userType == 'manager'){
        return res.status(400).json({message:"user is not manager"});
    }

    const startOfDay = new Date();
    const submission = await Submission.findOne({employeeId,managerId:userId, createdAt:{$gte:startOfDay}});

    if(!submission){
        return res.status(400).json({message:"No submission found"});
    }
    submission.rating = parseInt(rating);
    submission.save();
    res.status(200).json({message:"rating updated successfully"})
}
const rateEmployeeById = async(req,res) =>{
    const {submissionId,rating} = req.body;
    const submission = await Submission.findById(submissionId);
    submission.rating = rating;
    submission.save();
    res.status(200).json({message:"rating updated successfully"})
}
const searchUsers = async(req,res) =>{
    const {name} = req.body;

    const users = await User.find({name})

    if(!users){
        return res.status(404).json({message:"user not found"});
        
    }
    res.status(200).json({message:"Please find the users", users});
}
module.exports = {
    addEmployee:asyncHandler(addEmployee),
    // getUserTasks:asyncHandler(getUserTasks),
    getTasks:asyncHandler(getTasks),    
    addTask:asyncHandler(addTask),
    getSubmissions:asyncHandler(getSubmissions),
    editTask,
    submitTasks:asyncHandler(submitTasks),
    deleteTask:asyncHandler(deleteTask),
    getUserTasks:asyncHandler(getUserTasks),
    rateEmployee:asyncHandler(rateEmployee),
    rateEmployeeById:asyncHandler(rateEmployeeById),
    searchUsers:asyncHandler(searchUsers)
}