import { optionsMessage } from '../utils/const.js'
import { addProductSchema, flashSaleProduct } from '../utils/schemaJoi.js'

export const validateAddProduct = (req, res, next) => {
    const { error } = addProductSchema.validate(req.body, optionsMessage)
    if (error) return res.status(400).json({ error: error.details[0].message })
    next()
}

export const validateFlashSaleProduct = (req, res, next) => {
    const { error } = flashSaleProduct.validate(req.body, optionsMessage)
    if (error) return res.status(400).json({ error: error.details[0].message })
    next()
}
