const express = require("express");

const router = express.Router();

const  { verifyToken } = require("../middlewares/verifyToken")

const { CreateWorkSpace , getAllWorkspace } = require("../controllers/work_space")


router.post('/create' , verifyToken , CreateWorkSpace)
router.post('/all' , verifyToken , getAllWorkspace)



module.exports = router;