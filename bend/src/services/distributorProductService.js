const Distributor = require("../models/distributorProductModel")

const distributorProductService = {
    createDistributorProduct: (distributorProductData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const newDistributorProduct = await Distributor.create(distributorProductData)
                if (newDistributorProduct) {
                    resolve(newDistributorProduct)
                }
                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    updateDistributorProduct: (idDistributor, updateDate) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { name, id_product, type_change, img } = updateDate
                if (name || img) {
                    console.log('update')
                    const distributorProductBeforUpdate = await Distributor.findByIdAndUpdate(
                        idDistributor,
                        {name, img},
                        { new: true }
                    )
                    if (distributorProductBeforUpdate) {
                        resolve({
                            status: 200,
                            result: 'OK',
                            mes: 'Update distributor product success',
                            distributorProductBeforUpdate: distributorProductBeforUpdate
                        })
                    }
                } else if (id_product) {
                    if (!type_change) {
                        resolve({
                            status: 400,
                            result: 'Err',
                            mes: 'Can not update distributor product success'
                        })
                    }
                    else if (type_change == 2) {
                        //remove
                        const distributorProductBeforUpdate = await Distributor.findByIdAndUpdate(
                            idDistributor,
                            { $pull: { id_product_list: id_product } },
                            { new: true }
                        )
                        if (distributorProductBeforUpdate) {
                            resolve({
                                status: 200,
                                result: 'OK',
                                mes: 'Update distributor product success',
                                distributorProductBeforUpdate
                            })
                        }
                    } else if (type_change == 1) {
                        //add
                        const distributorProductBeforUpdate = await Distributor.findByIdAndUpdate(
                            idDistributor,
                            { $addToSet: { id_product_list: id_product } },
                            { new: true }
                        )
                        if (distributorProductBeforUpdate) {
                            resolve({
                                status: 200,
                                result: 'OK',
                                mes: 'Update distributor product success',
                                distributorProductBeforUpdate
                            })
                        }
                    }
                }

                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    getDetailDistributorProduct: (idDistributor) => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy thông tin product và trả về
                const distributor = await Distributor.findOne({ _id: idDistributor })
                if (distributor) {
                    resolve({
                        distributor
                    })
                }
                reject({ status: 404, err: error, mes: 'Cant find distributor' })
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    deleteDistributorProduct: (idDistributor) => {
        return new Promise(async (resolve, reject) => {
            try {
                const deleteDistributorProduct = await Distributor.findByIdAndDelete(idDistributor)
                if (deleteDistributorProduct) {
                    resolve({
                        status: 200,
                        result: 'OK',
                        mes: 'Delete distributor product success'
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
    getAllDetailDistributorProduct: () => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy tất cả users và trả về
                const distributors = await Distributor.find({}).lean()
                if (distributors) {
                    resolve({
                        distributors
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
    getAllDistributorProductName: () => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy tất cả users và trả về
                const distributors = await Distributor.find({}, 'name _id img').lean()
                if (distributors) {
                    resolve({
                        distributors
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
module.exports = distributorProductService