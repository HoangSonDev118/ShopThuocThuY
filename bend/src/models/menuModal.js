const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({})

const Type = new mongoose.model("Type", menuSchema)
module.exports = Type