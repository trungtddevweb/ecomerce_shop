import responseHandler from '../handler/responseHandler.js'
import Product from '../models/Product.js'

export const createAProduct = async (req, res) => {
    const filepaths = req.files?.map(file => file.path)
    try {
        const newProduct = await Product({
            ...req.body,
            productImages: filepaths
        })
        await newProduct.save()
        responseHandler.created(res, newProduct)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getAProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const product = await Product.findById(productId)
        res.status(200).json(product)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const getAllProduct = async (req, res) => {
    const { page, limit, category, brand, sizes, price } = req.query
    const options = {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        sort: { createdAt: 'desc' },
        query: {
            ...(sizes && { sizes }),
            ...(category && { category: { $regex: new RegExp(category, 'i') } }),
            ...(brand && { brand: { $regex: new RegExp(brand, 'i') } }),
            ...(price &&
                (() => {
                    let [minPrice, maxPrice] = price.split('-').map(p => parseInt(p))
                    if (minPrice && maxPrice) {
                        return { price: { $gte: minPrice, $lte: maxPrice } }
                    } else if (minPrice) {
                        minPrice = parseInt(price.substring(2))
                        return { price: { $gte: minPrice } }
                    } else if (maxPrice) {
                        maxPrice = parseInt(price.substring(2))
                        return { price: { $lte: maxPrice } }
                    } else if (price.startsWith('lt')) {
                        const upperBound = parseInt(price.substring(2))
                        return { price: { $lt: upperBound } }
                    } else if (price.startsWith('gt')) {
                        const lowerBound = parseInt(price.substring(2))
                        return { price: { $gt: lowerBound } }
                    }
                })())
        }
    }
    try {
        const products = await Product.paginate(options.query, options)
        responseHandler.getData(res, products)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getProductsByHot = async (req, res) => {
    const { limit, page } = req.query
    const options = {
        limit,
        page,
        sort: { createdAt: 'desc' }
    }
    try {
        const products = await Product.paginate({ isHot: true }, options)
        responseHandler.getData(res, products)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const getRandomProducts = async (req, res) => {
    try {
        const numProducts = req.query.num || 10 // Lấy số lượng sản phẩm từ query parameter
        const products = await Product.aggregate([
            { $sample: { size: parseInt(numProducts) } } // Lấy ngẫu nhiên numProducts sản phẩm
        ])
        responseHandler.success(res, products)
    } catch (error) {
        console.error(error)
        responseHandler.error(res, error)
    }
}

export const deletedProduct = async (req, res) => {
    try {
        const { selectedIds } = req.body
        if (!selectedIds) return res.status(400).json({ status: false, message: 'SelectedIds is not specified' })
        const checkIds = await Product.find({
            _id: {
                $in: selectedIds
            }
        }).exec()
        const existingIds = checkIds.map(id => id.id)
        const nonExistingIds = selectedIds.filter(id => !existingIds.includes(id))
        if (nonExistingIds.length > 0) return responseHandler.notFound(res)

        await Product.deleteMany({ _id: { $in: selectedIds } })
        res.status(200).json({ success: true, message: 'List products has been deleted!' })
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const updatedProduct = async (req, res) => {
    try {
        const updateFields = req.body
        const { productId } = req.body
        if (!productId) return responseHandler.notFound(res)
        const updatedProduct = await Product.findByIdAndUpdate(productId, { $set: updateFields }, { new: true })
        responseHandler.success(res, updatedProduct)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

// Query
export const searchByName = async (req, res) => {
    const queryValue = decodeURIComponent(req.query.q)
    const { limit, page } = req.query
    const query = { name: { $regex: new RegExp(queryValue, 'i') } }
    const options = {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        sort: { createdAt: 'desc' }
    }
    try {
        const products = await Product.paginate(query, options)
        responseHandler.success(res, products)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const searchByField = async (req, res) => {
    const { page, limit } = req.query
    const queryField = Object.keys(req.query)[0]
    const queryValue = req.query[queryField]
    const options = {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        sort: { createdAt: 'desc' }
    }
    try {
        const query = { [queryField]: { $regex: new RegExp(queryValue, 'i') } }
        const collection = await Product.paginate(query, options)
        responseHandler.success(res, collection)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

// Flashsale
export const flashSaleProduct = async (req, res) => {
    try {
        const { name, salePrice, flashSaleStart, flashSaleEnd } = req.body
        // Kiểm tra xem sản phẩm có tồn tại không
        const product = await Product.findOne({ name })
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' })
        }
        // Kiểm tra xem sản phẩm đã có trong khuyến mãi hay chưa
        if (product.flashSaleStart && product.flashSaleEnd) {
            return res.status(400).json({ message: 'Sản phẩm đã đang trong khuyến mãi' })
        }
        // Lưu giá chính vào trường regularPrice
        product.regularPrice = product.price

        // Cập nhật thông tin khuyến mãi cho sản phẩm
        product.price = salePrice
        product.flashSaleStart = flashSaleStart
        product.flashSaleEnd = flashSaleEnd

        await product.save()

        return res.status(200).json({ message: 'Tạo khuyến mãi thành công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const getALlProductsInflashSale = async (req, res) => {
    const { limit, page } = req.query
    const options = {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        sort: { createdAt: 'desc' }
    }

    try {
        const localTime = new Date()
        const currentUTCTime = new Date(localTime.getTime() + localTime.getTimezoneOffset() * 60000)

        const query = {
            flashSaleStart: { $lte: currentUTCTime },
            flashSaleEnd: { $gte: currentUTCTime }
        }

        const collections = await Product.paginate(query, options)

        res.status(200).json(collections)
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const deleteFlashSaleProduct = async (req, res) => {
    try {
        const { selectedIds } = req.body

        if (!selectedIds) {
            return res.status(400).json({ status: false, message: 'SelectedIds is not specified' })
        }

        // Lặp qua danh sách selectedIds
        for (const productId of selectedIds) {
            const product = await Product.findById(productId)

            if (!product) {
                return res.status(404).json({ message: 'Sản phẩm không tồn tại' })
            }

            // Kiểm tra xem sản phẩm có đang trong khuyến mãi hay không
            if (!product.flashSaleStart || !product.flashSaleEnd) {
                return res.status(400).json({ message: 'Sản phẩm không đang trong khuyến mãi' })
            }

            // Xóa thông tin khuyến mãi của sản phẩm
            product.flashSaleStart = null
            product.flashSaleEnd = null

            // Khôi phục giá chính từ trường regularPrice
            product.price = product.regularPrice

            await product.save()
        }

        return res.status(200).json({ message: 'Xóa khuyến mãi thành công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const updateFlashSaleTime = async (req, res) => {
    try {
        const { productId, flashSaleStart, flashSaleEnd } = req.body

        // Kiểm tra xem sản phẩm có tồn tại không
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' })
        }

        // Kiểm tra xem sản phẩm có đang trong khuyến mãi hay không
        if (!product.flashSaleStart || !product.flashSaleEnd) {
            return res.status(400).json({ message: 'Sản phẩm không đang trong khuyến mãi' })
        }

        // Cập nhật thời gian khuyến mãi cho sản phẩm và trả về đối tượng đã được cập nhật
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { flashSaleStart, flashSaleEnd },
            { new: true }
        )

        return res.status(200).json({ message: 'Cập nhật thời gian khuyến mãi thành công', updatedProduct })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
