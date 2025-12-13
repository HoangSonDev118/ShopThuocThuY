// const productController = require('../Controllers/productController')

const notificationController = require('../controllers/notificationController')
const authMiddleware = require('../Middlewares/authMiddleware')


const router = require('express').Router()

router.post('/create-notification', notificationController.createNotification)
router.delete('/delete-notification/:id', notificationController.deleteNotification)
router.get('/get-detail-notification/:id', notificationController.getDetailNotification)
router.get('/get-all-notifications', notificationController.getAllNotification)

router.put('/checked/:id', notificationController.checked)

module.exports = router