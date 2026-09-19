const productController = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')



const router = require('express').Router()

router.post('/create-pruduct', authMiddleware.adminMiddleware, productController.createProduct)
router.put('/update-product/:id', productController.updateProduct)
router.delete('/delete-product/:id', authMiddleware.adminMiddleware, productController.deleteProduct)

router.get('/get-detail-product/:id', productController.getDetailProduct)
router.get('/get-detail-product-by-id/:id', productController.getDetailProductById)
router.get('/get-all-products', productController.getAllProduct)

router.post('/get-all-products-id', productController.getAllProductId)

router.get('/get-all-products-card', productController.getAllProductCard)

router.get('/get-infor-delete-product/:id', productController.getInforDeleteProduct)

router.get('/search', productController.SearchProductName)



module.exports = router