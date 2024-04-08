const mongoose = require('mongoose')

const holiday_calendar_schema = new mongoose.Schema({
    holiday_name:String,
    created_by: String,
    created_date: Date,
    deleted: Boolean,
    from_date: Date,
    to_date: Date,
    year: String,
  });

const companiesSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    company_address: {
        type: String
    },
    company_email: {
        type: String
    },
    company_phone: {
        type: String
    },
    primary_user_id: {
        type: String,
    },
    U_ID: {
        type: String,
        required: true
    },
    documents: {
        type: Object,
    },
    doc: {
        type: Array,
        default : [],
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    letterDetail: {
        type: Object,
    },
    rejection_flow: {
        type: Object,
        default : {}
    },
    options: {
        type: Object,
        default : {}
    },
    logo: String,
    info: {
        name: String,
        address: String,
        phone: String,
        email: String,
    },
    holiday_calendar:[{
        type:holiday_calendar_schema
    }],
})

module.exports = mongoose.model('Companies', companiesSchema)
