const express = require("express");

const router = express.Router();

const  { verifyToken , Admin} = require("../middlewares/verifyToken")

const {create} = require("../controllers/companies")


router.post('/create' , verifyToken , Admin ,create)


module.exports = router;