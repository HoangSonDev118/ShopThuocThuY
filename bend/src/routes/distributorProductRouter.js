// const productController = require('../Controllers/productController')
const distributorProductController = require('../controllers/distributorProductController')
const authMiddleware = require('../Middlewares/authMiddleware')



const router = require('express').Router()

router.post('/create-new-distributor-product', distributorProductController.createDistributorProduct)
router.get('/get-detail-distributor-product/:id', distributorProductController.getDetailDistributorProduct)


router.get('/get-detail-distributor-product-name/:name', distributorProductController.getDetailDistributorProductName)


router.put('/update-distributor-product/:id', distributorProductController.updateDistributorProduct)
router.delete('/delete-distributor-product/:id', distributorProductController.deleteDistributorProduct)
router.get('/get-all-distributor-product/', distributorProductController.getAllDetailDistributorProduct)
router.get('/get-all-distributor-product-name/', distributorProductController.getAllDistributorProductName)


router.post('/check-already-name/', distributorProductController.checkAlreadyName)
// router.post('/create-new-type-product', authMiddleware.adminMiddleware, typeProductController.createTypeProduct)
// router.put('/update-product/:id', authMiddleware.adminMiddleware, productController.updateProduct)
// router.delete('/delete-product/:id', authMiddleware.adminMiddleware, productController.deleteProduct)

// router.get('/get-detail-product/:id', productController.getDetailProduct)
// router.get('/get-all-products', productController.getAllProduct)


module.exports = router