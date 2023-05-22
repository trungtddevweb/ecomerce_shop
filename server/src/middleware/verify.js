import jwt from 'jsonwebtoken'
import responseHandler from '../handler/responseHandler.js'
import User from '../models/User.js'

export const verifyAdmin = (req, res, next) => {
    const authHeaders = req.headers.authorization
    const token = authHeaders?.split(' ')[1]

    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
            if (err) return res.status(400).json({ message: 'Token không hợp lệ!' })
            req.user = payload
            if (!payload.isAdmin) return res.status(403).json({ message: 'Bạn không có quyền làm điều này!' })
            next()
        })
    } else {
        return responseHandler.unAuthorized(res)
    }
}

export const verifyUser = async (req, res, next) => {
    if (req.headers?.authorization) {
        const authHeaders = req.headers.authorization
        const token = authHeaders.split(' ')[1]
        if (!token) return res.status(400).json({ message: 'Token không hợp lệ!' })
        jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
            if (err) {
                if (err.name === 'JsonWebTokenError')
                    return res.status(400).json({ success: false, message: 'Token không đúng!' })
                if (err.name === 'TokenExpiredError')
                    return res.status(400).json({
                        success: false,
                        message: 'Token đã hết hạn!'
                    })
            }
            const user = await User.findById(payload.userId)
            if (!user) return res.json({ success: false, message: 'Không tìm thấy người dùng!' })
            req.user = user
            next()
        })
        return
    }
    return res.status(400).json({ success: false, message: 'Token không hợp lệ!' })
}
