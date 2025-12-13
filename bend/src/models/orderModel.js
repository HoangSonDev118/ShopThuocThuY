const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    order_id: { type: Number, required: true },
    order_customer_infor: {
        id: { type: String },
        name: { type: String, required: true },
        email: { type: String },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        address_detail: { type: String, required: true },
        note: { type: String },
    },

    order_products_infor: [{
        id: {
            type: String,
        },
        id_type: {
            type: String,
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    }],

    order_status: {

        total_price: { type: Number, required: true },
        total_shipping_cost: { type: Number, required: true },
        total_discount: { type: Number, required: true },
        total_final_price: { type: Number, required: true },

        payment_method: { type: String, required: true },
        payment_status: { type: Boolean, required: true, default: false },
        shipping_method: { type: String, required: true },

        delivery_status: { type: Number, required: true, default: 0 },
        order_status: { type: Number, required: true, default: 0 },

        ///  -1 : Đơn hàng đã hủy
        ///  0 : Chờ xác nhận
        ///  1 : Chờ đóng hàng
        ///  2 : Chờ vận chuyển
        ///  3 : Giao hàng thành công


    }

}, {
    timestamps: true
})

const Order = new mongoose.model("Order", orderSchema)
module.exports = Order
