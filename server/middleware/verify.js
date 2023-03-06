import jwt from 'jsonwebtoken'
import responseHandler from '../handler/responseHandler.js'

export const verifyAdmin = (req, res, next) => {
    const accessToken = req.cookies.access_token
    if (accessToken) {
        jwt.verify(accessToken, process.env.JWT_KEY, (err, payload) => {
            if (err) return next(responseHandler.tokenNotValid(res))
            req.userId = payload.id
            if (!payload.isAdmin) return next(responseHandler.forbidden(res))
            next()
        })

    } else {
        return responseHandler.unAuthorized(res)
    }
}   
