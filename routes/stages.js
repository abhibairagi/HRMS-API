const express = require("express");

const router = express.Router();

const  { verifyToken , Admin} = require("../middlewares/verifyToken")

const { create , findStage } = require("../controllers/stages")

router.post('/create' , verifyToken , Admin ,create)

router.post('/:stage_type' , verifyToken , Admin , findStage)



module.exports = router;