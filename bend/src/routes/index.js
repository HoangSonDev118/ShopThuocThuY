const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const uploadRouter = require('./uploadRouter')
const typeRouter = require('./typesProductRouter')
const distributorRouter = require('./distributorProductRouter')
const orderRouter = require('./orderRouter')
const notificationRouter = require('./notificationRouter')
// const productRouter = require('./productRouter')


const routes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    // app.use('/api/type-product', productRouter)
    app.use('/api/upload', uploadRouter)
    app.use('/api/type-product', typeRouter)
    app.use('/api/distributor-product', distributorRouter)
    
    app.use('/api/order', orderRouter)
    app.use('/api/notification', notificationRouter)
}

module.exports = routes