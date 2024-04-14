const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const projectsSchema = new mongoose.Schema({
    group_name: {
        type : String
    },
    tasks: [{
        name: String,
        description: String,
        priority: String,
        user_access: Array, 
        assigned_to : String,
        sub_tasks: [{
            priority: String,
            user_access: Array,
            owner: String, 
            completionDate: String,
            chats: [{
                userId: String,
                message: String,
                date: Date,
            }]
        }],
        files: Array,
        timeline: Object,
        owner: String,
        completionDate: String,
        chats: [{
            userId: String,
            message: String,
            files: Array,
            date: Date,
        }],
        created: Date
    }],
    work_space: {
        type: ObjectId
    }
}, { timestamps: true }
)




module.exports = mongoose.model("projects", projectsSchema);