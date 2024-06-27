const express = require("express");

const router = express.Router();

const {
  getConfiguration,
  updateConfig,
} = require("../controllers/configuration");

// router.param("eventId", getEventsById);

router.post("/all", getConfiguration);
router.put("/update/:type", updateConfig);

module.exports = router;
