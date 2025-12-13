const notificationService = require("../services/notificationService")

const orderController = {
    createNotification: async (req, res) => {
        try {
            const newNotificaition = await notificationService.createNotification(req.body)
            if (newNotificaition) {
                return res.status(200).json({
                    status: 200,
                    result: 'OKK',
                    mes: "Create newNotificaition success",
                    product: newNotificaition
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
    getDetailNotification: async (req, res) => {
        try {
            const ID = req.params?.id
            const notification = await notificationService.getDetailNotification(ID)
            if (notification) {
                return res.status(200).json({
                    ...notification
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
    deleteNotification: async (req, res) => {
        try {
            const idOrder = req.params.id
            const resultDelete = await notificationService.deleteNotification(idOrder)
            if (resultDelete) {
                return res.status(200).json({
                    ...resultDelete
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
    getAllNotification: async (req, res) => {

        try {
            const { limit, page } = req.query
            const orders = await notificationService.getAllNotification(limit, page)
            if (orders) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get all notification success',
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
    },
    checked: async (req, res) => {

        try {
            const id = req.params?.id
            const orders = await notificationService.checked(id)
            if (orders) {
                return res.status(200).json({
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
}

module.exports = orderController