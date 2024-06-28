const mongoose = require("mongoose");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

const onboardingSchema = new mongoose.Schema(
  {
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
      type: ObjectId,
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
      type: ObjectId,
      ref: "companies",
    },
    status: {
      type: String,
      default: "",
    },
    stage_type: {
      type: String,
      required: true,
    },
    stage_id: {
      type: ObjectId,
      ref: "stages",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("onboardings", onboardingSchema);
