const express = require("express");
const router = express.Router();
const  { verifyToken } = require("../middlewares/verifyToken")

const {  addgroups , addTaskTogroup , getAllTaskforWorkSpace, updateTaskStatus} = require("../controllers/boards")


router.post('/addgroup/:id' , verifyToken , addgroups)
router.post('/add_task/:groupid' , verifyToken , addTaskTogroup)
router.post('/getAlltask' , verifyToken , getAllTaskforWorkSpace)
router.post('/update_taskStatus' , verifyToken , updateTaskStatus)





module.exports = router;