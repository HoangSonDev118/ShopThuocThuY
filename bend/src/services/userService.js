const bcrypt = require('bcrypt')


const User = require('../models/userModel')
const JWT = require('./JWT')
const { upload } = require('../utils/multerImg')


const userService = {
    createUser: (userData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { last_name, first_name, email, password } = userData
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(password, salt)
                const user_name = `${first_name} ${last_name}`
                const newUser = await User.create({
                    user_name,
                    email,
                    password: hash
                })
                if (newUser) {
                    resolve(newUser)
                }
                reject()
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    loginUser: (userData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { email, password } = userData
                //Kiểm tra email có tồn tại không 
                const userCheck = await User.findOne({ email })
                if (!userCheck) {
                    resolve({
                        status: 404,
                        result: 'Error',
                        mes: 'Email or password is wrong (email)'
                    })
                }
                //Kiểm tra có đúng mật khẩu không 
                const passwordUserCheck = await bcrypt.compare(password, userCheck.password)
                if (!passwordUserCheck) {
                    resolve({
                        status: 404,
                        result: 'Error',
                        mes: 'Email or password is wrong (password)'
                    })
                }
                //Tất cả đều Ok --> tạo token
                const access_token = await JWT.generalAccessToken({
                    id: userCheck.id,
                    is_admin: userCheck.is_admin
                })
                const refresh_token = await JWT.generalRefreshToken({
                    id: userCheck.id,
                    is_admin: userCheck.is_admin
                })
                resolve({
                    status: 200,
                    result: 'OKK',
                    mes: 'Login success',
                    access_token,
                    refresh_token
                })
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    getAllUsers: () => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy tất cả users và trả về
                const users = await User.find({})


                ///////////////////////////////
                //Xóa tài khoản admin khỏi danh sách trước khi trả về

                const adminUser = users.find(item => item.is_admin === true);
                if (adminUser) {
                    const index = users.indexOf(adminUser);
                    if (index !== -1) {
                        users.splice(index, 1);
                    }
                }

                ///////////////////////////////

                if (users) {
                    resolve({
                        users
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
    getDetailUser: (idUser) => {
        return new Promise(async (resolve, reject) => {
            try {
                //Tất cả đều Ok --> lấy thông tin user và trả về
                const user = await User.findOne({ _id: idUser })
                if (user) {
                    resolve({
                        user
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
    updateUser: (idUser, dataUpdate) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userBeforUpdate = await User.findByIdAndUpdate(
                    idUser,
                    dataUpdate,
                    { new: true }
                )
                if (userBeforUpdate) {
                    resolve({
                        status: 200,
                        result: 'OK',
                        mes: 'Update users success',
                        userBeforUpdate
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
    deleteUser: (idUser) => {
        return new Promise(async (resolve, reject) => {
            try {
                // const user = await User.findOne({ _id: idUser })
                // if (!user) {
                //     resolve({
                //         result: 'Error',
                //         mes: 'User not found'
                //     })
                // }
                const deleteUser = await User.findByIdAndDelete(idUser)
                if (deleteUser) {
                    resolve({
                        status: 200,
                        result: 'OK',
                        mes: 'Delete users success'
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

module.exports = userService