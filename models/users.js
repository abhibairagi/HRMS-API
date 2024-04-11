const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { ObjectId } = mongoose.Schema;
const Roles = require("./roles")

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: { 
        type: String
    },
    password: {
        type: String, 
    },
    companyId : {
        type : ObjectId 
    }, 
    email: {
        type: String,
        required : true, 
        unique : true 
    },
    Accesstag : {
        type : Array,
    },
    salaryInfo : {
        type : Object, 
        default : {}
    } , 
    personal_info : {
        type : Object, 
        default : {
            profile_photo : "",
            phone : "", 
            gender : "", 
            nationality : "", 
            martial_status : "", 
            dob : "", 
            doj : "",
            work_location : ""
        }
    }, 
    documents : {
        type : Object, 
        default : {}
    },
    insurance : {
        type : Object,
        default : {}
    },
    company_ID : {
        type : ObjectId,
    }, 
    reporting : {
        type : Object, 
        default : {
            manager : "", 
            type : "", 
            department : "",
            team : ""
        }
    }, 
    bank_details : {
        type : Object, 
        default : {
            account_number : "0", 
            ifsc : "", 
            name : "",
            branch_name : ""
        }
    }, 
    role_ID: {
        type: String, 
    },
    designation: {
        type: String,
    },
    tokens: {
        type : String,
    },
    status : {
        type : String, 
        default : "active"
    },
    emergency : {
        type : Object, 
        default : {
            name : "", 
            phone : "", 
            relation : ""
        }
    },
    emp_id : {
        type  : String,
    }, 
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
  }, {timestamps : true})

usersSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next() 
})

usersSchema.pre('findOneAndUpdate', async function (next) {
    // Hash the password before saving the user model
    
    const user = this
    if(user._update.password != undefined){
        if (user._update.password.substr(0,7) != '$2a$08$') {
            user._update.password = await bcrypt.hash(user._update.password, 8)
        }
    } 
    next()
})

usersSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    //await user.save()
    return token
}

usersSchema.methods.checkIsAdmin = async function() {
    // Generate an auth token for the user
    const user = this
    let isAdmin = false

    if(user.role_ID == '5e2ec39af3185a0b5036ef01' || user.role_ID == '60f409ba7d4fad65903c05aa') {
        isAdmin = true
    }
    //await user.save()
    return isAdmin
}


usersSchema.methods.checkIsRecruiter = async function() {
    // Generate an auth token for the user
    const user = this
    let isRecruiter = false

    if(user.role_ID == '5e2ec3a7f3185a0b5036ef02') {
        isRecruiter = true
    }
    //await user.save()
    return isRecruiter
}

usersSchema.methods.checkIsCEO = async function() {
    // Generate an auth token for the user
    const user = this
    let isCEO = false

    if(user.role_ID == '64c1029af849516d1b6ad41b') {
        isCEO = true
    }
    //await user.save()
    return isCEO
}

usersSchema.methods.checkIsHR= async function() {
    // Generate an auth token for the user
    const user = this
    let isHRMgr = false

    if(user.role_ID == '5e2ec3a7f3185a0b5036ef03') {
        isHRMgr = true
    }
    //await user.save()
    return isHRMgr
}

// usersSchema.methods.checkIsEmployee = async function() {
//     // Generate an auth token for the user
//     const user = this
//     let isEmployee = false

//     if(user.role_ID == '5e438bda1c9d4400000db544') {
//         isEmployee = true
//     }
//     //await user.save()
//     return isEmployee
// }

usersSchema.methods.checkIsCEO = async function() {
    // Generate an auth token for the user
    const user = this
    let isCEO = false

    if(user.role_ID == '64c1029af849516d1b6ad41b') {
        isCEO = true
    }
    //await user.save()
    return isCEO
}

usersSchema.statics.findByCredentials = async (email, password) => {

    try {
        const user = await Users.findOne({ email: email})
        console.log(user, "212")
        if (!user) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        const Role = await Roles.findOne({_id : user.role_ID})
        user.role_ID = Role.role_name
        const token = jwt.sign({_id: user._id, role_name : Role.role_name}, process.env.JWT_KEY)
        user.tokens = token
        return user
    } catch (error) {
        return error.message
    }
    // Search for a user by email and password.
   
}

const Users = mongoose.model('Users', usersSchema)
module.exports = Users
