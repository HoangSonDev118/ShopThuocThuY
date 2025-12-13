const Order = require("../models/orderModel")
const { generateRandomId } = require("../utils/generateRandomId")

const orderService = {
    createOrder: (orderData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const idOrder = await generateRandomId()
                const newOrder = await Order.create({ ...orderData, order_id: idOrder })
                if (newOrder) {
                    resolve(newOrder)
                }
                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    getDetailOrder: (idOrder) => {
        return new Promise(async (resolve, reject) => {
            try {
                const order = await Order.findOne({ _id: idOrder })
                if (order) {
                    resolve({
                        status: 200,
                        result: 'OK',
                        mes: 'get detail order success',
                        order
                    })
                }
                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    deleteOrder: (idOrder) => {
        return new Promise(async (resolve, reject) => {
            try {
                const deleteOrder = await Order.findByIdAndDelete(idOrder)
                if (deleteOrder) {
                    resolve({
                        status: 200,
                        result: 'OK',
                        mes: 'Delete order success'
                    })
                }
                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    getAllOrder: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const product_status0 = await Order.countDocuments({ "order_status.order_status": 0 });
                const product_status1 = await Order.countDocuments({ "order_status.order_status": 1 });
                const product_status2 = await Order.countDocuments({ "order_status.order_status": 2 });
                const product_status3 = await Order.countDocuments({ "order_status.order_status": 3 });
                const product_status_1 = await Order.countDocuments({ "order_status.order_status": -1 });
                const orders = await Order.find({})
                    // .select('order_id order_customer_infor.name order_customer_infor.phone order_customer_infor.address order_status.total_final_price order_status.payment_status order_status.order_status')
                    // .select({ "order_products_infor.name": 1, "order_products_infor.type": 1, "order_products_infor.price": 1, "order_products_infor.count": 1, _id: 0 })
                    .lean()
                if (orders) {
                    resolve(
                        {
                            orders,
                            product_status0,
                            product_status1,
                            product_status2,
                            product_status3,
                            product_status_1

                        }
                    )
                }
                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },




    ///LÀM SAU
    updateOrder: (idProduct, productData) => {
        return new Promise(async (resolve, reject) => {

            

            try {
                const productBeforUpdate = await Order.findByIdAndUpdate(
                    idProduct,
                    productData,
                    { new: true }
                )
                if (productBeforUpdate) {
                    resolve({
                        status: 200,
                        result: 'OK',
                        mes: 'Update order success',
                        productBeforUpdate
                    })
                }
                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    }
}
module.exports = orderService