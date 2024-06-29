const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");

const { createOffboarding } = require("../controllers/offboardings");

router.post("/create", verifyToken, createOffboarding);

module.exports = router;
