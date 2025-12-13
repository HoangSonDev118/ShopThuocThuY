const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    type: {},

    ///type 
    ///1 ---> bạn có order mới
    ///2 ---> tạo product thành công
    ///2.5 ---> Xóa sản phẩm thành công

    ///

    content: {},
    idLink: {},
    check: { type: Boolean, required: true, default: true }

}, {
    timestamps: true
})

const Notification = new mongoose.model("Notification", notificationSchema)
module.exports = Notification