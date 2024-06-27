const mongoose = require("mongoose");

const assetsInfoSchema = new mongoose.Schema(
  {
    asset_type: {
      type: String,
      required: true,
    },
    asset_category: {
      type: String,
      required: true,
      // unique: true,
    },
    asset_keys: {
      type: Array,
      required: true,
    },
    asset_uniq_id: {
      type: String,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("assetsInfo", assetsInfoSchema);
