import Joi from 'joi'

export const addProductSchema = Joi.object({
    productId: Joi.string().required(),
    color: Joi.string().required(),
    size: Joi.string().required(),
    quantity: Joi.number().required()
})
