import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import responseHandler from '../handler/responseHandler.js'
import jwt from 'jsonwebtoken'

// REGISTER
export const register = async (req, res) => {
    const { email, password, confirmPassword } = req.body
    const picture = req.file

    try {
        const user = await User.findOne({ email })
        if (user) return responseHandler.badRequest(res, 'Email đã được sử dụng!')
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        if (password !== confirmPassword)
            return responseHandler.badRequest(res, 'Xác nhận mật khẩu không giống mật khẩu!')
        const newUser = await User({
            ...req.body,
            picture: picture?.path,
            password: hashPassword
        })
        await newUser.save()
        responseHandler.created(res, newUser)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

// LOGIN
export const login = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return responseHandler.badRequest(res, 'Tài khoản hoặc mật khẩu chưa chính xác!')
        const checkPassword = await bcrypt.compare(req.body.password, user.password)
        if (!checkPassword) return responseHandler.badRequest(res, 'Tài khoản hoặc mật khẩu chưa chính xác!')

        if (!user.isActive) {
            return res.status(400).json('Tài khoản của bạn đã bị khóa!')
        }

        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_KEY, { expiresIn: '30d' })
        const newToken = {
            token,
            signedAt: Date.now().toString()
        }

        let oldTokens = user.tokens || []
        if (oldTokens.length) {
            oldTokens = oldTokens.filter(t => {
                const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000
                if (timeDiff < 86_400) {
                    return t
                }
            })
        }
        const updatedUser = await User.findOneAndUpdate({ email }, { $push: { tokens: newToken } }, { new: true })

        const userInfo = { ...updatedUser._doc }
        delete userInfo.password
        res.status(200).json({ userInfo, token })
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const logout = async (req, res) => {
    try {
        if (!req.headers?.authorization) {
            return
        }
        const authHeaders = req.headers.authorization
        const token = authHeaders.split(' ')[1]
        if (!token) {
            return res.status(401).json({ success: false, message: 'Token không hợp lệ!' })
        }

        const tokens = req.user.tokens
        const newTokens = tokens.filter(t => t.token !== token)

        await User.findByIdAndUpdate(req.user._id, { tokens: newTokens })
        res.status(200).json({ success: true, message: 'Đăng xuất thành công!' })
    } catch (error) {
        res.status(500).json({ sucess: false, message: error })
    }
}
