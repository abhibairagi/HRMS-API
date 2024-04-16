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
            task_number : Number,
            completionDate: String,
            chats: [{
                userId: String,
                message: String,
                date: Date,
            }]
        }],
        task_number : Number,
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
    group_number : Number,
    work_space: {
        type: ObjectId
    }
}, { timestamps: true }
)




module.exports = mongoose.model("boards", projectsSchema);