const Order = require("../models/orderModel");

async function generateRandomId() {
    let isUnique = false;
    let randomId;

    while (!isUnique) {
        randomId = Math.floor(100000 + Math.random() * 900000);
        const existingDoc = await Order.findOne({ order_id: randomId });

        if (!existingDoc) {
            isUnique = true;
        }
    }

    return randomId;
}

module.exports = { generateRandomId }