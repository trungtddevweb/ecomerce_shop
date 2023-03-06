import jwt from 'jsonwebtoken'
import responseHandler from '../handler/responseHandler.js'

export const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log("token", token)
    if (!token) return next(responseHandler.unAuthorized(res))
    try {
        const payload = jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) return next(responseHandler.tokenNotValid(res))
            req.user = user
            console.log("payload", payload)
            next()
        })
    } catch (error) {
        next(responseHandler.error(res, error))
    }
}