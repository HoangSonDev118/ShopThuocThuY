const bcrypt = require('bcryptjs')


const User = require("../models/userModel")
const userService = require("../services/userService")
const JWT = require('../services/JWT')

const userController = {
    registerUser: async (req, res) => {
        try {
            const { last_name, first_name, email, password, confirm_password } = req.body
            //Kiểm tra phải nhập input
            if (!last_name || !first_name || !email || !password || !confirm_password) {
                return res.status(200).json({
                    result: 'Error',
                    mes: 'You need to enter all fields'
                })
            }
            //Kiểm tra trường email cần phải là email
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                return res.status(200).json({
                    result: 'Error',
                    mes: 'The email field must be a valid email'
                })
            }
            //Kiểm tra password và confirm password phải giống nhau
            if (password !== confirm_password) {
                return res.status(200).json({
                    result: 'Error',
                    mes: 'The password field and the password confirmation field need to be the same'
                })
            }
            //Kiểm tra email đăng ký đã tồn tại trong database chưa
            const emailUserCheck = await User.findOne({ email })
            if (emailUserCheck) {
                return res.status(200).json({
                    status: 409,
                    result: 'Error',
                    mes: 'The registration email entered already exists'
                })
            }

            // Tất cả đều ổn --> gửi đến service
            const newUser = await userService.createUser({
                last_name,
                first_name,
                email,
                password
            })
            if (newUser) {
                return res.status(200).json({
                    status: 200,
                    result: 'OKK',
                    mes: "Create user success",
                    user: newUser
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
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body
            //Kiểm tra phải nhập input
            if (!email || !password) {
                return res.status(200).json({
                    result: 'Error',
                    mes: 'You need to enter all fields'
                })
            }
            //Kiểm tra trường email cần phải là email
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                return res.status(200).json({
                    result: 'Error',
                    mes: 'The email field must be a valid email'
                })
            }
            //Tất cả đều ổn --> gửi đến service
            const loginUser = await userService.loginUser({ email, password })
            if (loginUser) {
                const { refresh_token, ...newResponse } = loginUser
                res.cookie('refresh_token', refresh_token, {
                    httpOnly: true, // Cookie chỉ có thể được truy cập thông qua HTTP và không thể được truy cập thông qua JavaScript
                    secure: true, // Cookie chỉ được gửi qua HTTPS
                    sameSite: 'none'
                })
                return res.status(200).json(newResponse)
            }

        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                error: err
            })
        }

    },
    logoutUser: async (req, res) => {
        try {
            res.clearCookie('refresh_token')
            return res.status(200).json({
                result: 'OK',
                mes: 'Logout user successfully',
                status: 200
            })
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                error: err
            })
        }

    },
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers()
            if (users) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get all users success',
                    ...users
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
    getDetailUser: async (req, res) => {
        try {
            const idUser = req.params.id
            const user = await userService.getDetailUser(idUser)
            if (user) {
                return res.status(200).json({
                    result: 'OKK',
                    mes: 'Get detail users success',
                    ...user
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
    updateUser: async (req, res) => {
        console.log(req.body);
        try {
            const idUser = req.params.id
            const dataUpdate = req.body
            //Kiểm tra cần nhập thông tin thay đổi
            const { user_name, gender, birthday, phone_number, address, address_detail, user_avatar, full_name } = dataUpdate
            if (user_name || gender || birthday || phone_number || address || address_detail || user_avatar || full_name) {
                const resultUpdateUser = await userService.updateUser(idUser, dataUpdate)
                if (resultUpdateUser) {
                    return res.status(200).json({
                        ...resultUpdateUser
                    })
                }
            }
            if (Object.keys(dataUpdate).length == 0) {
                return res.status(200).json({
                    result: 'Error',
                    mes: 'you need to enter something to update the user'
                })
            }
            return res.status(200).json({
                result: 'Error',
                mes: 'Data update invalid'
            })
        }
        catch (err) {
            return res.status(500).json({
                result: 'Error',
                mes: 'Can not update user',
                error: err
            })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const idUser = req.params.id
            const resultDeleteUser = await userService.deleteUser(idUser)
            if (resultDeleteUser) {
                return res.status(200).json({
                    ...resultDeleteUser
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
    refreshToken: async (req, res) => {
        try {
            const refresh_token = req.cookies.refresh_token
            if (!refresh_token) {
                return res.status(200).json({
                    result: 'Error',
                    mes: 'Can not get token'
                })
            }
            const response = await JWT.refreshTokenService(refresh_token)
            if (response) {
                return res.status(200).json({
                    response
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


    test1: async (req, res) => {
        return res.status(200).json({data: 'This is data'})
    },
    test2: async (req, res) => {
        console.log(req.body);
        return res.status(200).json({data2: 'Data 2'})
    }
}
module.exports = userController