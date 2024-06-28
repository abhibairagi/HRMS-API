const express = require("express");
const router = express.Router();
const { saveConfiguration, getConfiguration } = require("../controllers/redis");

// Route to save configuration
router.post("/save-configuration", saveConfiguration);

// Route to get configuration
router.get("/get-configuration", getConfiguration);

module.exports = router;
