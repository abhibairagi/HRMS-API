const express = require("express");

const router = express.Router();

const  { verifyToken} = require("../middlewares/verifyToken")

const {createUser , login , AllUsers, allUsers} = require("../controllers/users")


router.post('/create' , createUser)
router.post('/login' , login)
router.post('/all'  , verifyToken, AllUsers)
router.get('/assdob' , allUsers)


module.exports = router;