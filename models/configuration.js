const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const configurationSchema = new mongoose.Schema(
  {
    department: {
      type: Array,
    },
    policies: {
      type: Array,
    },
    shifts: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("configuration", configurationSchema);
