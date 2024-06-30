const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = mongoose.Schema;

const attendanceSchema = new mongoose.Schema(
  {
    break_startTime: {
      type: Array,
      default: [],
    },
    break_endTime: {
      type: Array,
      default: [],
    },
    history: {
      type: Array,
      default: [],
    },
    startTime: {
      type: String,
      default: null,
    },
    endTime: {
      type: String,
      default: null,
    },
    is_auto_clock_out: {
      type: Boolean,
      default: true,
    },
    is_start_reminder: {
      type: Boolean,
      default: true,
    },
    is_end_reminder: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
    },
    user_id: {
      type: String,
      ref: "users",
    },
    breakFlag: {
      type: Boolean,
      default: true,
    },
    day: {
      type: String,
    },
    breakTime: {
      type: String,
    },
    total_break_time: {
      type: String,
    },
    manager_id: {
      type: String,
      default: "",
    },
    status: {
      type: String,
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("attendance", attendanceSchema);
