const Users = require("../models/users")


const findUser = async (email) => {
    return await Users.findOne({email : email}.exec())
}


module.exports = {
    findUser
}