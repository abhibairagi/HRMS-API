const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const workSpaceSchema = new mongoose.Schema({
    owner: {
        type: String,    
    },
    access : [{
        type : ObjectId
    }],
    restricted_acesss : [{
        type : ObjectId
    }], 
    name : {
        type : String,
    }, 
    is_deleted : {
        type : Boolean, 
        default : false
    }, 
    archive : {
        type : Boolean, 
        default  : false
    }

}, { timestamps: true }
)

module.exports = mongoose.model("workspace", workSpaceSchema);