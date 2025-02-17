const express= require('express');
const router = express.Router();

const {
    addEmployee,
    getUserTasks,
    getTasks,
    getSubmissions,
    addTask,
    editTask,
    deleteTask,
    submitTasks,
    rateEmployee,
    rateEmployeeById,
    searchUsers
} = require('./../controllers/secureControllers');
const validationMiddleware = require('../middleware/validationMiddleware');

//manager routes
router.post("/addEmployee",validationMiddleware("addEmployee"), addEmployee);
router.get("/getSubmissions",getSubmissions);
router.get("/getUserTasks/:userId",getUserTasks)
router.post("/rateEmployee", rateEmployee);
router.post("/rateEmployeebyId", rateEmployeeById);
router.get("/searchUsers", searchUsers)
//common routes
router.get("/getTasks",getTasks)        // get all tasks of a particular user 

//employee routes
router.post("/addTask",addTask) // done
router.patch("/editTask/:TaskId",editTask)  // to be done
router.delete("/deleteTask/:TaskId",deleteTask) // to be done
router.post("/submitTasks",submitTasks);    //done
module.exports = router;