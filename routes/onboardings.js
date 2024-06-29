const express = require("express");
const router = express.Router();
const { create, getOnboarding } = require("../controllers/onboardings");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/create", create);
router.get("/getonboarding", getOnboarding);

module.exports = router;
