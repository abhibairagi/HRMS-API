const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = mongoose.Schema;

const userShiftSchema = new mongoose.Schema({
  user_id: {
    type: String,
    ref: "users",
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  shiftType: {
    type: String,
  },
  start_time: {
    type: String,
  },
  end_time: {
    type: String,
  },
  status: {
    type: String,
    default: "Temperory",
  },
});

module.exports = mongoose.model("userShifts", userShiftSchema);
