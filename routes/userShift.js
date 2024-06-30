const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");

const { createUserShifts, getAllShifts } = require("../controllers/userShift");

router.post("/create", createUserShifts);
router.get("/getallshifts", getAllShifts);

module.exports = router;
