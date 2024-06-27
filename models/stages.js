const mongoose = require("mongoose");
const StageSchema = new mongoose.Schema({
  template_name: {
    type: String,
    required: true,
  },
  steps: [
    {
      email_link: String,
      process_name: String,
      sms_link: String,
      admin_upload: String,
      client_upload: String,
      post_question: String,
      stage_visible: String,
      stage_emp_visible: String,
      attach_visible: String,
      tasks: Array,
    },
  ],
  stage_type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Stages", StageSchema);
