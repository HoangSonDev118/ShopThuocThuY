const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    full_name: {type: String, minLength: 3, maxLength: 30},
    email: {required: true, type: String, minLength: 10, maxLength: 50, unique: true},
    phone_number: {type: String, minLength: 8, maxLength: 15},
    gender: {type: String},
    birthday: {type: Date},
    address: {type: String},
    address_detail: {type: String, minLength: 6, maxLength: 200},

    // last_name: {required: true, type: String, maxLength: 30},
    // first_name: {required: true, type: String, maxLength: 30},
    user_name: {required: true, type: String, minLength: 3, maxLength: 30},
    password: {required: true, type: String, minLength: 6, maxLength: 100},


    is_admin: {type: Boolean, default: false},
})

const User = new mongoose.model("Users", userSchema)
module.exports = User