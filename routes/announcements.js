const express = require("express");

const router = express.Router();

const {createAnnoun, getAnnouncements, getEventsById, updateEvents, getAannoun} = 
require("../controllers/announcements")

router.param("eventId", getEventsById);


router.post("/create", createAnnoun)
router.get("/ongoing", getAnnouncements)
router.get("/eventId/:eventId", getAannoun);
router.put("/editEvents/:eventId", updateEvents)

module.exports = router;