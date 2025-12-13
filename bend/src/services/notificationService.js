const Notification = require("../models/notificationModal")

const notificationService = {
    createNotification: (Data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const newNotification = await Notification.create(Data)
                if (newNotification) {
                    resolve(newNotification)
                }
                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    getDetailNotification: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const notification = await Notification.findOne({ _id: id })
                if (notification) {
                    resolve({
                        status: 200,
                        result: 'OK',
                        mes: 'get detail Notification success',
                        notification
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
    deleteNotification: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Notification.findByIdAndDelete(id)
                if (result) {
                    resolve({
                        status: 200,
                        result: 'OK',
                        mes: 'Delete Notification success'
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
    getAllNotification: (limit = 20, page = 1) => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy tất cả users và trả về
                const totalNotification = await Notification.countDocuments()
                const totalNewNotification = await Notification.countDocuments({ check: true });
                const notification = await Notification.find({}).sort({ createdAt: -1 })
                    .lean()
                    .limit(Number(limit))
                    .skip((Number(page) - 1) * Number(limit))

                if (notification) {
                    resolve({
                        notification,
                        totalNewNotification,
                        totalNotification,
                        curentPage: page,
                        totalPage: Math.ceil(totalNotification / Number(limit))
                        // total
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
    checked: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy tất cả users và trả về
                const notification = await Notification.findByIdAndUpdate(id, { check: false }, { new: true })

                if (notification) {
                    resolve({result: 'checked'})
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
module.exports = notificationService