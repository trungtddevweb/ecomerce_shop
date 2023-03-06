import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import responseHandler from "../handler/responseHandler.js"
import jwt from 'jsonwebtoken'

// REGISTER
export const register = async (req, res, next) => {
    const { email, password, confirmPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return next(responseHandler.badRequest(res, "Email has been taken by another user"))
        }
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        if (password !== confirmPassword) {
            return next(responseHandler.badRequest(res, "Confirm password not equal to your password!"))
        }
        const newUser = await User({
            ...req.body,
            password: hashPassword,
        })
        await newUser.save()
        responseHandler.created(res, newUser)

    } catch (error) {
        responseHandler.error(res, error)
    }
}

// LOGIN
export const login = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email });
        if (!user) return next(responseHandler.notFound(res));
        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if (!checkPassword) return next(responseHandler.badRequest(res, "Email or password is incorrect."));
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_KEY, { expiresIn: "3d" })
        const { password, ...other } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 8 * 3600000)
        }).status(200).json({
            data: other,
            token,
        })
    } catch (error) {
        next(responseHandler.error(error))
    }
}

export const logout = async (req, res) => {
    res.clearCookie('access_token', {
        sameSite: "none",
        secure: true
    }).status(200).json({
        massage: "You are has been logout!"
    })
}