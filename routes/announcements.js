const express = require("express");

const router = express.Router();

const {createAnnoun, getAnnouncements} = 
require("../controllers/announcements")

router.post("/create", createAnnoun)
router.get("/ongoing", getAnnouncements)

module.exports = router;