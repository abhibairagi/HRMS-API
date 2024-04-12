const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const announcementSchema = new mongoose.Schema({
    announcementName: {
        type: String,    
    },
    description: {
        type: String,    
    },
    closure_date: {
        type: Date,
    },
    image : {
        type : String,
    }, 
    companies: [{type:ObjectId, ref: 'Companies'}]

}, { timestamps: true }
)

module.exports = mongoose.model("announcements", announcementSchema);