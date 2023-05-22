import { validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req)
    /* Checking if there are any errors in the validation result. If there are, it will return a 400
    status code with the message of the first error. */
    if (!errors.isEmpty()) return res.status(400).json({
        message: errors.array()[0].msg
    })
    next()
}

export default { validate }