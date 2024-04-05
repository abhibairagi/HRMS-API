const mongoose = require('mongoose')
const rolesSchema = new mongoose.Schema({
    role_name: {
        type: String, 
        required: true
    },
    hierarchy: {
        type: Number, 
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    }
  })

  module.exports = mongoose.model('Roles', rolesSchema)