const mongoose = require("mongoose");

const assetsInfoSchema = new mongoose.Schema(
  {
    asset_type: {
      type: String,
    },
    asset_category: {
      type: String,
      // unique: true,
    },
    asset_keys: {
      type: Array,
      
    },
    asset_uniq_id: {
      type: String,
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("assetsInfo", assetsInfoSchema);
