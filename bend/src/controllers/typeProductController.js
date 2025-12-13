

// const User = require("../models/userModel")
const Type = require("../models/typeProductModel")
const typeProductService = require("../services/typeProductService")
// const t = require("../services/userService")

const typeProductController = {
    createTypeProduct: async (req, res) => {
        const { name } = req.body
        try {
            if (!name) {
                return res.status(200).json({
                    status: 400,
                    result: 'Err',
                    mes: "You need to enter required filed"
                })
            }
            const TypeAlreadyCheck = await Type.findOne({ name })
            if (TypeAlreadyCheck) {
                return res.status(200).json({
                    status: 409,
                    result: 'Error',
                    mes: 'Type already exists'
                })
            }
            const newType = await typeProductService.createTypeProduct(req.body)
            if (newType) {
                return res.status(200).json({
                    status: 200,
                    result: 'OKK',
                    mes: "Create type success",
                    type: newType
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
    getDetailTypeProduct: async (req, res) => {
        try {
            const idType = req.params.id
            const type = await typeProductService.getDetailTypeProduct(idType)
            if (type) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get detail type product success',
                    ...type
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
    getDetailTypeProductName: async (req, res) => {
        try {
            const nameType = req.params.name
            console.log('nameType', nameType);
            const type = await Type.findOne({name: nameType})
            if (type) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get detail Type product by name success',
                    type
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
    getManyDetailTypeProduct: async (req, res) => {
        try {
            const { idTypes } = req.body
            const goods = await Type.find({
                _id: { $in: idTypes }
            }, 'name _id');
            res.json(goods);
            // if (types) {
            //     return res.status(200).json({
            //         result: 'OKK',
            //         mes: 'Get detail types product success',
            //         ...types
            //     })
            // }
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                error: err
            })
        }
    },
    // loginUser: async (req, res) => {
    //     try {
    //         const { email, password } = req.body
    //         //Kiểm tra phải nhập input
    //         if (!email || !password) {
    //             return res.status(200).json({
    //                 result: 'Error',
    //                 mes: 'You need to enter all fields'
    //             })
    //         }
    //         //Kiểm tra trường email cần phải là email
    //         if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    //             return res.status(200).json({
    //                 result: 'Error',
    //                 mes: 'The email field must be a valid email'
    //             })
    //         }
    //         //Tất cả đều ổn --> gửi đến service
    //         const loginUser = await userService.loginUser({ email, password })
    //         if (loginUser) {
    //             const { refresh_token, ...newResponse } = loginUser
    //             res.cookie('refresh_token', refresh_token, {
    //                 httpOnly: true, // Cookie chỉ có thể được truy cập thông qua HTTP và không thể được truy cập thông qua JavaScript
    //                 secure: true, // Cookie chỉ được gửi qua HTTPS
    //                 sameSite: 'none'
    //             })
    //             return res.status(200).json(newResponse)
    //         }

    //     }
    //     catch (err) {
    //         return res.status(500).json({
    //             result: 'Error',
    //             error: err
    //         })
    //     }

    // },
    // logoutUser: async (req, res) => {
    //     try {
    //         res.clearCookie('refresh_token')
    //         return res.status(200).json({
    //             result: 'OK',
    //             mes: 'Logout user successfully',
    //             status: 200
    //         })
    //     }
    //     catch (err) {
    //         return res.status(500).json({
    //             result: 'Error',
    //             error: err
    //         })
    //     }

    // },
    getAllDetailTypeProduct: async (req, res) => {
        try {
            const types = await typeProductService.getAllDetailTypeProduct()
            if (types) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get all types success',
                    ...types
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
    getAllTypeProductName: async (req, res) => {
        try {
            const types = await typeProductService.getAllTypeProductName()
            if (types) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get all name types success',
                    ...types
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
    updateAddProducts: async (req, res) => {
        const { idsType, idProduct } = req.body

        try {
            const result = await Type.updateMany(
                { _id: { $in: idsType } },
                { $addToSet: { id_product_list: idProduct } }
            )
            if (result) {
                return res.status(200).json({
                    status: 200,
                    ...result
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
    updateDeleteProducts: async (req, res) => {
        const { idsType, idProduct } = req.body

        try {
            const result = await Type.updateMany(
                { _id: { $in: idsType } },
                { $pull: { id_product_list: idProduct } }
            )
            if (result) {
                return res.status(200).json({
                    status: 200,
                    ...result
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
    // getDetailUser: async (req, res) => {
    //     try {
    //         const idUser = req.params.id
    //         const user = await userService.getDetailUser(idUser)
    //         if (user) {
    //             return res.status(200).json({
    //                 result: 'OKK',
    //                 mes: 'Get detail users success',
    //                 ...user
    //             })
    //         }
    //     }
    //     catch (err) {
    //         return res.status(500).json({
    //             result: 'Error',
    //             error: err
    //         })
    //     }
    // },
    updateTypeProduct: async (req, res) => {
        try {
            const idType = req.params.id
            const dataUpdate = req.body
            console.log('first', idType)
            //Kiểm tra cần nhập thông tin thay đổi
            if (true) {
                const resultUpdateType = await typeProductService.updateTypeProduct(idType, dataUpdate)
                if (resultUpdateType) {
                    return res.status(200).json({
                        ...resultUpdateType
                    })
                }
            }
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                mes: 'Can not update type',
                error: err
            })
        }
    },
    deleteTypeProduct: async (req, res) => {
        try {
            const idType = req.params.id
            const resultDeleteType = await typeProductService.deleteTypeProduct(idType)
            if (resultDeleteType) {
                return res.status(200).json({
                    ...resultDeleteType
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
    // refreshToken: async (req, res) => {
    //     try {
    //         const refresh_token = req.cookies.refresh_token
    //         if (!refresh_token) {
    //             return res.status(200).json({
    //                 result: 'Error',
    //                 mes: 'Can not get token'
    //             })
    //         }
    //         const response = await JWT.refreshTokenService(refresh_token)
    //         if (response) {
    //             return res.status(200).json({
    //                 response
    //             })
    //         }
    //     }
    //     catch (err) {
    //         return res.status(500).json({
    //             result: 'Error',
    //             error: err
    //         })
    //     }
    // },

}

module.exports = typeProductController