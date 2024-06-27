const mongoose = require("mongoose");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema

// const uuidv1 = require("uuid/v1");

const assetsSchema = new mongoose.Schema(
  {
    asset_history: {
      type: Array,
      default : [],
    },
    asset_notes: {
      type: Array,
      default : []
    },
    attachments: {
      type: Array,
      default : []
    },
    // internal_inventory_id: {
    //     type: String,    
    // },
    asset_info_id: {
        type: ObjectId,
        ref: "assetsInfo",    
        required : true
    },
    associated_user_id: {
        type: String, 
        default : ""   
    },
    status: {
        type: String,  
        default : ""  
    },
    asset_location: {
        type: String,    
        default : ""  
    },
    purchase_date: {
        type: Date,      
    },
    asset_info: {
        type : Object ,
        default : {}
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("assets", assetsSchema);