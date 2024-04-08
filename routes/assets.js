const express = require("express");

const router = express.Router();

const {createAssets, getAllAssets, getAssetsById, getAssets, updateAssets} = 
require("../controllers/assets")

router.param("assetsId", getAssetsById);

router.post("/assets/create", createAssets)

router.get("/assets" ,getAllAssets )
router.get("/assets/:assetsId", getAssets);

router.put("/assets/update/:assetsId", updateAssets)

// router.delete("/assetsInfo/delete/:assetsInfoId", deleteAssetsInfo )

module.exports = router;