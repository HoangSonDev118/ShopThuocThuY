// const productController = require('../controllers/productController')
const typeProductController = require('../controllers/typeProductController')
const authMiddleware = require('../middlewares/authMiddleware')



const router = require('express').Router()

router.post('/create-new-type-product', typeProductController.createTypeProduct)
router.get('/get-detail-type-product/:id', typeProductController.getDetailTypeProduct)
router.get('/get-detail-type-product-name/:name', typeProductController.getDetailTypeProductName)

router.post('/get-many-detail-type-product/', typeProductController.getManyDetailTypeProduct)


router.put('/update-type-product/:id', typeProductController.updateTypeProduct)
router.delete('/delete-type-product/:id', typeProductController.deleteTypeProduct)

router.get('/get-all-type-product/', typeProductController.getAllDetailTypeProduct)

router.get('/get-all-type-product-name/', typeProductController.getAllTypeProductName)

router.patch('/update-add-products/', typeProductController.updateAddProducts)
router.patch('/update-delete-products/', typeProductController.updateDeleteProducts)
// router.post('/create-new-type-product', authMiddleware.adminMiddleware, typeProductController.createTypeProduct)
// router.put('/update-product/:id', authMiddleware.adminMiddleware, productController.updateProduct)
// router.delete('/delete-product/:id', authMiddleware.adminMiddleware, productController.deleteProduct)

// router.get('/get-detail-product/:id', productController.getDetailProduct)
// router.get('/get-all-products', productController.getAllProduct)


module.exports = router