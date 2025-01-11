const express= require('express');
const router = express.Router();

const {
    addEmployee,
    getUserTasks,
    getTask,
    addTask,
    editTask,
    deleteTask
} = require('./../controllers/secureControllers');
const validationMiddleware = require('../middleware/validationMiddleware');

//manager routes
router.post("/addEmployee",validationMiddleware("addEmployee"), addEmployee);
router.get("/getUserTasks",getUserTasks);
router.post("/rateEmployee", rateEmployee);

//common routes
router.get("/getTasks",getTasks)        // get all tasks of a particular user 

//employee routes
router.post("/addTask",addTask)
router.patch("/editTask/:TaskId",editTask)
router.delete("/deleteTask/:TaskId",deleteTask)
router.post("/submitTasks",submitTasks);

module.exports = router;