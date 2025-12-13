const jwt = require('jsonwebtoken')
const authMiddleware = {
    authenticated: async (req, res, next) => {
        const token = req.headers.token
        try {
            if (token) {
                const access_token = token.split(" ")[1]
                jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
                    if (err) {
                        return res.status(200).json({
                            result: 'ERR',
                            mes: "Token is not valid"
                        })
                    }
                    if (user.id != req.params.id && !user.is_admin) {
                        return res.status(200).json({
                            result: 'ERR',
                            mes: "You can not to do that"
                        })
                    }
                    // ALL is right --> next
                    next()
                })
            }
            else {
                console.log(req.headers);
                return res.status(200).json({
                    result: 'ERR',
                    mes: "Can not get token"
                })
            }
        }
        catch (err) {
            return res.status(200).json({
                result: 'ERR',
                mes: "Something wrong (authMiddleware)",
                Error: err
            })
        }
    },
    adminMiddleware: async (req, res, next)=>{
        const token = req.headers.token
        try {
            if (token) {
                const access_token = token.split(" ")[1]
                jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
                    if (err) {
                        return res.status(200).json({
                            result: 'ERR',
                            mes: "Token is not valid"
                        })
                    }
                    if (!user.is_admin) {
                        return res.status(200).json({
                            result: 'ERR',
                            mes: "You can not to do that"
                        })
                    }
                    // ALL is right --> next
                    next()
                })
            }
            else {
                return res.status(200).json({
                    result: 'ERR',
                    mes: "Can not get token"
                })
            }
        }
        catch (err) {
            return res.status(200).json({
                result: 'ERR',
                mes: "Something wrong (authMiddleware)",
                Error: err
            })
        }
    }

}
module.exports = authMiddleware