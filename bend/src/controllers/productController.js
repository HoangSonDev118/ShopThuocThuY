const Product = require("../models/productModel");
const productService = require("../services/productService");
const { toLowerCaseNonAccentVietnamese } = require("../utils/toLowerCaseNonAccentVietnamese");

const productController = {
    createProduct: async (req, res) => {
        try {
            const {
                product_imgs,
                product_name
            } = req.body
            if (!product_imgs || !product_name) {
                return res.status(200).json({
                    result: 'Error',
                    mes: 'You need to enter all fields required'
                })
            }
            // Tất cả đều ổn --> gửi đến service
            const newProduct = await productService.createProduct(req.body)
            if (newProduct) {
                return res.status(200).json({
                    status: 200,
                    result: 'OKK',
                    mes: "Create product success",
                    product: newProduct
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
    getInforDeleteProduct: async (req, res) => {
        try {
            const idProduct = req.params.id
            const product = await Product.findOne({ _id: idProduct }, 'product_imgs product_goods product_distributor product_name')
            if (product) {
                return res.status(200).json({
                    product
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



    /// KKKKKKKK
    updateProduct: async (req, res) => {
        try {
            const idProduct = req.params.id
            const dataUpdate = req.body
            console.log(idProduct);
            console.log(dataUpdate);
            //Kiểm tra cần nhập thông tin thay đổi



            const resultUpdateProduct = await productService.updateProduct(idProduct, dataUpdate)
            if (resultUpdateProduct) {
                return res.status(200).json({
                    ...resultUpdateProduct
                })
            }
            return res.status(200).json({
                result: 'Error',
                mes: 'update faild'
            })
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                mes: 'Can not update product',
                error: err
            })
        }
    },






    getDetailProduct: async (req, res) => {
        try {
            const slugifyProduct = req.params.id
            const product = await productService.getDetailProduct(slugifyProduct)
            if (product) {
                return res.status(200).json({
                    ...product
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
    getDetailProductById: async (req, res) => {
        try {
            const id = req.params.id
            const product = await productService.getDetailProductById(id)
            if (product) {
                return res.status(200).json({
                    ...product
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
    deleteProduct: async (req, res) => {
        try {
            const idProduct = req.params.id
            const resultDeleteProduct = await productService.deleteProduct(idProduct)
            if (resultDeleteProduct) {
                return res.status(200).json({
                    ...resultDeleteProduct
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
    getAllProduct: async (req, res) => {

        try {
            const { limit, page } = req.query
            const products = await productService.getAllProduct(limit, page)
            if (products) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get all products success',
                    ...products
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
    getAllProductId: async (req, res) => {
        const { id_product_list } = req.body;
        try {
            const { limit, page } = req.query
            const products = await productService.getAllProductId(id_product_list)
            if (products) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get all products success',
                    ...products
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
    getAllProductCard: async (req, res) => {
        try {
            const limit = Number(req.query.limit) || 20
            const page = Number(req.query.page) || 1
            const products = await productService.getAllProductCard(limit, page)
            if (products) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get all products type card success',
                    ...products
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
    SearchProductName: async (req, res) => {
        try {
            const searchQuery = req.query.q;
            const convertSearch = toLowerCaseNonAccentVietnamese(searchQuery)
            console.log(convertSearch);
            const typeQuery = req.query.type || 'less'
            const limit = typeQuery === 'less' ? 3 : 10
            if (!searchQuery) {
                return res.status(200).json({ message: 'Query string is required' });
            }

            // Tìm các sản phẩm có product_name chứa giá trị trong query
            const products = await Product.find({
                product_slugify: { $regex: convertSearch, $options: 'i' }
            })
            .limit(limit)
            ;

            res.json(products);
        } catch (error) {
            res.status(200).json({ message: error.message });
        }
    }
}

module.exports = productController