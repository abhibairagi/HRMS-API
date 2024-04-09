const express = require("express");

const router = express.Router();

const {createAssets, getAllAssets, getAssetsById, getAssets, updateAssets} = 
require("../controllers/assets")

router.param("assetsId", getAssetsById);

router.post("/create", createAssets)    

router.get("/allassets" ,getAllAssets )
router.get("/assetsId/:assetsId", getAssets);

router.put("/update/:assetsId", updateAssets)

// router.delete("/assetsInfo/delete/:assetsInfoId", deleteAssetsInfo )

module.exports = router;