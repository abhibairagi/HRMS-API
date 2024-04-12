const express = require("express");

const router = express.Router();

const  { verifyToken , Admin} = require("../middlewares/verifyToken")

const {create, getAllCompanies} = require("../controllers/companies")


router.post('/create' , verifyToken , Admin ,create)
router.post('/getcompanies', getAllCompanies)

module.exports = router;