const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')

const generalAccessToken = async function (payload) {
    var access_token = await jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '60m' })
    return access_token
}
const generalRefreshToken = async (payload) => {
    var refresh_token = await jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: '30d' })
    return refresh_token
}
const refreshTokenService = async (refresh_token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(refresh_token, process.env.REFRESH_TOKEN_KEY, async (err, user) => {
                if (err) {
                    reject({
                        result: 'ERR',
                        mes: "Refresh Token is not valid"
                    })
                }
                if (user) {
                    const new_access_token = await generalAccessToken({
                        id: user.id,
                        is_admin: user.is_admin
                    })
                    resolve({
                        result: 'OK',
                        mes: "refresh token success",
                        new_access_token
                    })
                }
            })
        }
        catch (err) {
            reject({
                result: 'ERR',
                mes: "can not refresh token"
            })
        }
    })
}

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenService
}