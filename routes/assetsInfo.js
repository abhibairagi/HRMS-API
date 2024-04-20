const express = require("express");

const router = express.Router();

const {createAssetsInfo} = 
require("../controllers/assetsInfo")

// router.param("assetsInfoId", getAssetsInfoById);

router.post("/create", createAssetsInfo)


module.exports = router;