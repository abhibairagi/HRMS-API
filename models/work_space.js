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
    }

}, { timestamps: true }
)

module.exports = mongoose.model("workspace", workSpaceSchema);