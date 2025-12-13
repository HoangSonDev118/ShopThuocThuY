const mongoose = require('mongoose')

const distributorProductSchema = new mongoose.Schema({

    img: {},
    name: { type: String, required: true },
    id_product_list: { type: Array },
})

const Distributor = new mongoose.model("Distributor", distributorProductSchema)
module.exports = Distributor