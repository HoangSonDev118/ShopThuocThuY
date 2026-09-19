const Product = require("../models/productModel")
const { slugify } = require("../utils/stringToSlugify")

const productService = {
    createProduct: (productData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { product_name } = productData
                const product_slugify = slugify(product_name)
                const newProductData = { ...productData, product_slugify }
                const newProduct = await Product.create(newProductData)
                if (newProduct) {
                    resolve(newProduct)
                }
                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    updateProduct: (idProduct, productData) => {
        return new Promise(async (resolve, reject) => {
            try {

                const { product_name } = productData

                const product_slugify = slugify(product_name)
                const newProductData = { ...productData, product_slugify }

                console.log(newProductData);

                const productBeforUpdate = await Product.findByIdAndUpdate(
                    idProduct,
                    newProductData,
                    { new: true }
                )
                if (productBeforUpdate) {
                    resolve({
                        status: 200,
                        result: 'OK',
                        mes: 'Update product success',
                        productBeforUpdate
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
    getDetailProduct: (slugifyProduct) => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy thông tin product và trả về
                console.log('slugifyProduct', slugifyProduct);
                const product = await Product.findOne({ product_slugify: slugifyProduct })
                if (product) {
                    resolve({
                        status: 200,
                        result: 'OK',
                        mes: 'get detail product success',
                        product
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
    getDetailProductById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const product = await Product.findOne({ _id: id })
                if (product) {
                    resolve({
                        status: 200,
                        result: 'OK',
                        mes: 'get detail product success',
                        product
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
    deleteProduct: (idProduct) => {
        return new Promise(async (resolve, reject) => {
            try {
                const deleteProduct = await Product.findByIdAndDelete(idProduct)
                if (deleteProduct) {
                    resolve({
                        status: 200,
                        result: 'OK',
                        mes: 'Delete product success'
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
    getAllProduct: (limit = 8, page = 1) => {
        console.log('limit', limit);
        console.log('page', page);
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy tất cả users và trả về
                const totalProduct = await Product.countDocuments()
                const products = await Product.find({}, 'product_imgs product_name product_discount').lean().limit(Number(limit)).skip((Number(page) - 1) * Number(limit)).sort({ createdAt: -1 })
                if (products) {
                    resolve({
                        products,
                        totalProduct,
                        curentPage: page,
                        totalPage: Math.ceil(totalProduct/Number(limit))
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
    getAllProductId: (id_product_list) => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy tất cả users và trả về
                const products = await Product.find({ _id: { $in: id_product_list } }, 'product_imgs product_name product_slugify product_types product_discount product_status').lean()
                if (products) {
                    resolve({
                        products
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
    getAllProductCard: (limit = 8, page = 1) => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy tất cả users và trả về
                const products = await Product.find({},
                    'product_imgs product_name product_slugify product_types product_discount product_status').limit(limit).skip((page - 1) * limit)
                if (products) {
                    resolve({
                        products
                    })
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
module.exports = productService