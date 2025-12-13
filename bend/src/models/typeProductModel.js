const mongoose = require('mongoose')

const typeProductSchema = new mongoose.Schema({



    name: { type: String, required: true },
    id_product_list: { type: Array },
    important: {type: Boolean, required: true, default: false},
    type_animal: {type: Boolean, required: true, default: false},
})

const Type = new mongoose.model("Type", typeProductSchema)
module.exports = Type