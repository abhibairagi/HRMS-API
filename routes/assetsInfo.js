const express = require("express");

const router = express.Router();

const {createAssetsInfo, getassetCategory, getassetTypes, getallAssets} = 
require("../controllers/assetsInfo")

// router.param("assetsInfoId", getAssetsInfoById);

router.post("/create", createAssetsInfo)
router.get("/getcategory", getassetCategory)
router.post("/getassetTypes", getassetTypes)
router.get("/getallAssets", getallAssets)



module.exports = router;