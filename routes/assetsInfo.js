const express = require("express");

const router = express.Router();

const {createAssetsInfo, getassetCategory} = 
require("../controllers/assetsInfo")

// router.param("assetsInfoId", getAssetsInfoById);

router.post("/create", createAssetsInfo)
router.get("/getcategory", getassetCategory)

module.exports = router;