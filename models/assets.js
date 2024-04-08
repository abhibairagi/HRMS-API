const mongoose = require("mongoose");
const crypto = require("crypto");
// const uuidv1 = require("uuid/v1");

const assetsSchema = new mongoose.Schema(
  {
    asset_history: {
      type: Array,
    },
    asset_notes: {
      type: Array,
    },
    attachments: {
      type: Array,
      
    },
    internal_inventory_id: {
        type: String,    
    },
    asset_info_id: {
        type: String,    
    },
    associated_user_id: {
        type: String,    
    },
    status: {
        type: String,    
    },
    asset_location: {
        type: String,    
    },
    purchase_date: {
        type: String,    
    },
    asset_info: {
        type: Object,
        description: {
            type: String,
        },
        category: {
            type: String,
        },
        size: {
            type: String,
        },
        serial_number: {
            type: String,
        },
        model_number: {
            type: String,
        },
        manufacture: {
            type: String,
        },
        warranty_info: {
            type: String,
        }, 
        warranty_expiry: {
            type: String,
        }, 
        purchased_info: {
            type: String,
        }, 
        cost: {
            type: String,
        }, 
        old_ref_id: {
            type: String,
        },
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("assets", assetsSchema);