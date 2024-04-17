const express = require("express");

const router = express.Router();

const  { verifyToken , Admin} = require("../middlewares/verifyToken")

const {create, getAllCompanies, getCompaniesById, holidayCalender, getAllHolidayCalender} = require("../controllers/companies")


// router.param("companyId", getCompaniesById);

router.post('/create' , verifyToken , Admin ,create)
router.post('/getcompanies', getAllCompanies)
router.put('/holidaycalender/:id', holidayCalender)
router.get('/allholidays/:id', getAllHolidayCalender)

module.exports = router;