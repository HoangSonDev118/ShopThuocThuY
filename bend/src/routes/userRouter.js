const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = require('express').Router()


router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)

router.put('/update-user/:id', authMiddleware.authenticated, userController.updateUser)
router.delete('/delete-user/:id', authMiddleware.authenticated, userController.deleteUser)

router.get('/get-all-users', authMiddleware.adminMiddleware, userController.getAllUsers)

router.get('/get-detail-user/:id', authMiddleware.authenticated, userController.getDetailUser)









router.post('/refresh-token/', userController.refreshToken)


module.exports = router