// const productController = require('../Controllers/productController')

const orderController = require('../controllers/orderController')
const authMiddleware = require('../Middlewares/authMiddleware')


const router = require('express').Router()

router.post('/create-order', orderController.createOrder)
router.put('/update-order/:id', orderController.updateOrder)
router.delete('/delete-order/:id', orderController.deleteOrder)

router.get('/get-detail-order/:id', orderController.getDetailOrder)
router.get('/get-all-orders', orderController.getAllOrder)
// router.put('/update-status-orders/', orderController.updateStatusOrder)

module.exports = router