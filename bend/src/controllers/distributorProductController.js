

// const User = require("../models/userModel")
const Distributor = require("../models/distributorProductModel")
const distributorProductService = require("../services/distributorProductService")
// const t = require("../services/userService")

const distributorProductController = {
    createDistributorProduct: async (req, res) => {
        const { name } = req.body
        try {
            if (!name) {
                return res.status(200).json({
                    status: 400,
                    result: 'Err',
                    mes: "You need to enter required filed"
                })
            }
            const DistributorAlreadyCheck = await Distributor.findOne({ name })
            if (DistributorAlreadyCheck) {
                return res.status(200).json({
                    status: 409,
                    result: 'Error',
                    mes: 'Distributor already exists'
                })
            }
            const newDistributor = await distributorProductService.createDistributorProduct(req.body)
            if (newDistributor) {
                return res.status(200).json({
                    status: 200,
                    result: 'OKK',
                    mes: "Create Distributor success",
                    Distributor: newDistributor
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
    getDetailDistributorProduct: async (req, res) => {
        try {
            const idDistributor = req.params.id
            console.log('idDistributor', idDistributor);
            const distributor = await distributorProductService.getDetailDistributorProduct(idDistributor)
            if (distributor) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get detail distributor product success',
                    ...distributor
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
    getDetailDistributorProductName: async (req, res) => {
        try {
            const nameDistributor = req.params.name
            const distributor = await Distributor.findOne({ name: nameDistributor }, 'name id_product_list')
            if (distributor) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get detail distributor product by name success',
                    distributor
                })
            }
            return res.status(200).json({
                status: 404
            })
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                error: err
            })
        }
    },
    getAllDetailDistributorProduct: async (req, res) => {
        try {
            const distributors = await distributorProductService.getAllDetailDistributorProduct()
            if (distributors) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get all distributors success',
                    ...distributors
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
    getAllDistributorProductName: async (req, res) => {
        try {
            const distributors = await distributorProductService.getAllDistributorProductName()
            if (distributors) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get all name distributors success',
                    ...distributors
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
    updateDistributorProduct: async (req, res) => {
        try {
            if (!req.params.id) return res.status(200).json({})
            const idDistributor = req.params.id
            const dataUpdate = req.body
            console.log('idDistributor', idDistributor);
            const resultUpdateDistributor = await distributorProductService.updateDistributorProduct(idDistributor, dataUpdate)
            if (resultUpdateDistributor) {
                return res.status(200).json({
                    ...resultUpdateDistributor
                })
            }
        }
        catch (err) {
            return res.status(200).json({})
        }
    },
    deleteDistributorProduct: async (req, res) => {
        try {
            const idDistributor = req.params.id
            const resultDeleteDistributor = await distributorProductService.deleteDistributorProduct(idDistributor)
            if (resultDeleteDistributor) {
                return res.status(200).json({
                    ...resultDeleteDistributor
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
    checkAlreadyName: async (req, res) => {
        try {
            const name = req.body.name
            const DistributorAlreadyCheck = await Distributor.findOne({ name })
            if (DistributorAlreadyCheck) {
                return res.status(200).json({
                    status: 409,
                    mes: 'Distributor already exists',
                    distributor: DistributorAlreadyCheck
                })
            } else {
                return res.status(200).json({
                    status: 200,
                    distributor: DistributorAlreadyCheck
                })
            }
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                error: err
            })
        }
    }
}

module.exports = distributorProductController