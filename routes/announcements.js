const express = require("express");

const router = express.Router();

const {createAnnoun, getAnnouncements, getEventsById, updateAnnouncements, getAannoun} = 
require("../controllers/announcements")

// router.param("eventId", getEventsById);


router.post("/create", createAnnoun)
router.get("/ongoing", getAnnouncements)
router.get("/eventId/:eventId", getAannoun);
router.put("/update/:id", updateAnnouncements)

module.exports = router;