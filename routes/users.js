const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");

const {
  createUser,
  login,
  AllUsers,
  upcomingevents,
  getAllUsers,
} = require("../controllers/users");

router.post("/create", createUser);
router.get("/allusers", getAllUsers);
router.post("/login", login);
router.post("/all", verifyToken, AllUsers);
router.post("/upcoming_events", verifyToken, upcomingevents);

module.exports = router;
