const mongoose = require("mongoose");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

const offboardingSchema = new mongoose.Schema({
  attachments: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  process: {
    type: Array,
    default: [],
  },
  user_id: {
    type: String,
    ref: "users",
  },
  process_type: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    default: "",
  },
  company_id: {
    type: String,
    ref: "companies",
  },
  status: {
    type: String,
    default: "",
  },
  last_workingDay: {
    type: Date,
  },
  stage_type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("offboardings", offboardingSchema);
