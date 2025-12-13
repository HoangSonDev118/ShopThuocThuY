const Type = require("../models/typeProductModel")

const typeProductService = {
    createTypeProduct: (typeProductData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const newTypeProduct = await Type.create(typeProductData)
                if (newTypeProduct) {
                    resolve(newTypeProduct)
                }
                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    updateTypeProduct: (idType, updateDate) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { name, id_product, type_change } = updateDate
                console.log('name', name)
                if (name) {
                    console.log('update')
                    const typeProductBeforUpdate = await Type.findByIdAndUpdate(
                        idType,
                        { name },
                        { new: true }
                    )
                    if (typeProductBeforUpdate) {
                        resolve({
                            status: 200,
                            result: 'OK',
                            mes: 'Update type product success',
                            typeProductBeforUpdate
                        })
                    }
                } else if (id_product) {
                    if (!type_change) {
                        resolve({
                            status: 400,
                            result: 'Err',
                            mes: 'Can notu pdate type product success'
                        })
                    }
                    else if (type_change == 2) {
                        //remove
                        const typeProductBeforUpdate = await Type.findByIdAndUpdate(
                            idType,
                            { $pull: { id_product_list: id_product } },
                            { new: true }
                        )
                        if (typeProductBeforUpdate) {
                            resolve({
                                status: 200,
                                result: 'OK',
                                mes: 'Update type product success',
                                typeProductBeforUpdate
                            })
                        }
                    } else if (type_change == 1) {
                        //add
                        const typeProductBeforUpdate = await Type.findByIdAndUpdate(
                            idType,
                            { $push: { id_product_list: id_product } },
                            { new: true }
                        )
                        if (typeProductBeforUpdate) {
                            resolve({
                                status: 200,
                                result: 'OK',
                                mes: 'Update type product success',
                                typeProductBeforUpdate
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
    getDetailTypeProduct: (idType) => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy thông tin product và trả về
                console.log('first', idType)
                const type = await Type.findOne({ _id: idType })
                if (type) {
                    resolve({
                        type
                    })
                }
                reject({ status: 404, err: error, mes: 'Cant find type' })
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    // getManyDetailTypeProduct: (idType) => {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             //Tất cả đều Ok --> lấy thông tin product và trả về
    //             console.log('first', idType)
    //             const type = await Type.find({ _id: idType })
    //             if (type) {
    //                 resolve({
    //                     type
    //                 })
    //             }
    //             reject({ status: 404, err: error, mes: 'Cant find type' })
    //         }
    //         catch (err) {
    //             reject(err)
    //         }
    //     }
    //     )
    // },
    deleteTypeProduct: (idType) => {
        return new Promise(async (resolve, reject) => {
            try {
                const deleteTypeProduct = await Type.findByIdAndDelete(idType)
                if (deleteTypeProduct) {
                    resolve({
                        status: 200,
                        result: 'OK',
                        mes: 'Delete type product success'
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
    getAllDetailTypeProduct: () => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy tất cả users và trả về
                const types = await Type.find({}).lean()
                if (types) {
                    resolve({
                        types
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
    getAllTypeProductName: () => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy tất cả users và trả về
                const types = await Type.find({}, 'name _id important type_animal').lean()
                if (types) {
                    resolve({
                        types
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
module.exports = typeProductService