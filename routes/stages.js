const express = require("express");

const router = express.Router();

const { verifyToken, Admin } = require("../middlewares/verifyToken");

const { create, findStage, updateOne } = require("../controllers/stages");

router.post("/create", verifyToken, Admin, create);

router.post("/:stage_type", verifyToken, Admin, findStage);

router.put("/update", updateOne);

module.exports = router;
