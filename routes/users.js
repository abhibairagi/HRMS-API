const express = require("express");

const router = express.Router();

const  { verifyToken} = require("../middlewares/verifyToken")

const {createUser , login , AllUsers} = require("../controllers/users")


router.post('/create' , createUser)
router.post('/login' , login)
router.post('/all'  , verifyToken, AllUsers)



module.exports = router;