const express = require("express");

const router = express.Router();

const {createUser , login} = require("../controllers/users")


router.post('/create' , createUser)
router.post('/login' , login)


module.exports = router;