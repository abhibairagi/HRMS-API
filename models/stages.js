const mongoose = require('mongoose')
const StageSchema = new mongoose.Schema({
    template_name: {
        type: String,
        required: true,
    },
    steps: [{
        email_link: Boolean,
        process_name: String,
        sms_link: Boolean,
        admin_upload: Boolean,
        client_upload: Boolean,
        post_question: Boolean,
        stage_visible: Boolean,
        stage_emp_visible: Boolean,
        attach_visible: Boolean,
        tasks : Array
    }],
    stage_type: {
        type: String,
        required: true
    },


})

module.exports = mongoose.model('Stages', StageSchema)