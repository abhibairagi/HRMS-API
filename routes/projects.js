const express = require("express");
const router = express.Router();
const  { verifyToken } = require("../middlewares/verifyToken")

const {  addgroups , addTaskTogroup , getAllTaskforWorkSpace} = require("../controllers/projects")


router.post('/addgroup/:id' , verifyToken , addgroups)
router.post('/add_task/:groupid' , verifyToken , addTaskTogroup)
router.post('/getAlltask' , verifyToken , getAllTaskforWorkSpace)




module.exports = router;