const orderService = require("../services/orderService")

const orderController = {
    createOrder: async (req, res) => {
        try {
            const {
                order_customer_infor,
                order_products_infor,
                order_status
            } = req.body
            if (!order_customer_infor || !order_products_infor || !order_status) {
                return res.status(200).json({
                    result: 'Error',
                    mes: 'You need to enter all fields required'
                })
            }
            // Tất cả đều ổn --> gửi đến service
            const newOrder = await orderService.createOrder(req.body)
            if (newOrder) {
                return res.status(200).json({
                    status: 200,
                    result: 'OKK',
                    mes: "Create order success",
                    product: newOrder
                })
            }

        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                error: err
            })
        }
    },
    updateOrder: async (req, res) => {
        try {
            const idProduct = req.params.id
            const dataUpdate = req.body
            console.log(idProduct);
            console.log(dataUpdate);
            //Kiểm tra cần nhập thông tin thay đổi



            const resultUpdateProduct = await orderService.updateOrder(idProduct, dataUpdate)
            if (resultUpdateProduct) {
                return res.status(200).json({
                    ...resultUpdateProduct
                })
            }
            return res.status(200).json({
                result: 'Error',
                mes: 'update faild'
            })
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                mes: 'Can not update product',
                error: err
            })
        }
    },
    getDetailOrder: async (req, res) => {
        try {
            const idOrder = req.params?.id
            const order = await orderService.getDetailOrder(idOrder)
            if (order) {
                return res.status(200).json({
                    ...order
                })
            }
        }
        catch (err) {
            return res.status(200).json({
                result: 'Error',
                error: err
            })
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const idOrder = req.params.id
            const resultDeleteOrder = await orderService.deleteOrder(idOrder)
            if (resultDeleteOrder) {
                return res.status(200).json({
                    ...resultDeleteOrder
                })
            }
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                error: err
            })
        }
    },
    getAllOrder: async (req, res) => {

        try {
            const orders = await orderService.getAllOrder()
            if (orders) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get all orders success',
                    ...orders
                })
            }
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                error: err
            })
        }
    }
    // updateStatusOrder: async (req, res) => {

    //     try {
    //         const orders = await orderService.updateStatusOrder()
    //         if (orders) {
    //             return res.status(200).json({
    //                 result: 'OKK',
    //                 mes: 'Get all orders success',
    //                 ...orders
    //             })
    //         }
    //     }
    //     catch (err) {
    //         return res.status(500).json({
    //             result: 'Error',
    //             error: err
    //         })
    //     }
    // }
}

module.exports = orderController