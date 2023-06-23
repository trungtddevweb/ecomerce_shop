import User from '../models/User.js'
import Product from '../models/Product.js'
import responseHandler from '../handler/responseHandler.js'

export const getAUser = async (req, res) => {
    const { _id: userId } = req.user
    try {
        const user = await User.findById({ _id: userId })
            .populate({
                path: 'products.productId',
                model: 'Product'
            })
            .exec()
        responseHandler.success(res, user)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const getAllUsers = async (req, res) => {
    const { limit, page } = req.query
    const options = {
        select: 'name email createdAt phone picture ordersCount isActive voucher totalCancel address',
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        sort: { createdAt: 'desc' }
    }
    try {
        const users = await User.paginate({ isAdmin: false }, options)
        responseHandler.getData(res, users)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const updatedUser = async (req, res) => {
    const userId = req.user._id
    const { email, phone } = req.body

    try {
        if (email) {
            const existingUser = await User.findOne({ email })
            if (existingUser && existingUser._id.toString() !== userId.toString()) {
                return res.status(400).json({ error: 'Email đã tồn tại' })
            }
        }

        if (phone) {
            const existingUser = await User.findOne({ phone })
            console.log(existingUser)

            if (existingUser && existingUser._id.toString() !== userId.toString) {
                return res.status(400).json({ error: 'Số điện thoại đã tồn tại' })
            }
        }
        const updatedUser = await User.findByIdAndUpdate(userId, { ...req.body }, { new: true })

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const updatedUserByAdmin = async (req, res) => {
    const { userId, email, phone } = req.body

    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ error: 'Không tìm thấy người dùng' })
        }

        if (email) {
            const existingUser = await User.findOne({ email })

            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(400).json({ error: 'Email đã tồn tại' })
            }
        }

        if (phone) {
            const existingUser = await User.findOne({ phone })

            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(400).json({ error: 'Số điện thoại đã tồn tại' })
            }
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { ...req.body }, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const deleteUsers = async (req, res, next) => {
    try {
        const { selectedIds } = req.body
        if (!selectedIds) return res.status(400).json({ success: false, message: 'SelectedIds chưa được định nghĩa!' })
        const checkIds = await User.find({
            _id: {
                $in: selectedIds
            }
        }).exec()
        const existingIds = checkIds.map(id => id.id)
        const nonExistingIds = selectedIds.filter(id => !existingIds.includes(id))
        if (nonExistingIds.length > 0) return next(responseHandler.notFound(res))

        await User.deleteMany({ _id: { $in: selectedIds } })
        res.status(200).json({ success: true, message: 'Danh sách user được chọn đã được xóa!' })
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const addProductToUser = async (req, res) => {
    const { productId, color, size, quantity } = req.body
    const { _id: userId } = req.user

    try {
        // Tìm kiếm người dùng theo userId
        const user = await User.findById(userId).populate('products.productId')

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' })
        }

        // Tìm kiếm sản phẩm trong giỏ hàng của người dùng
        const productIndex = user.products.findIndex(
            p => p.productId._id.toString() === productId.toString() && p.size === size && p.color === color
        )

        if (productIndex === -1) {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
            const product = await Product.findById(productId)
            if (!product) {
                return res.status(404).json({ message: 'Sản phẩm không tồn tại!' })
            }
            const sumPrice = quantity * product.price
            user.products.push({ productId: product._id, quantity, size, color, sumPrice })
        } else {
            // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
            user.products[productIndex].quantity += quantity
            user.products[productIndex].sumPrice += quantity * user.products[productIndex].productId.price
        }
        // Cập nhật số lượng sản phẩm trong giỏ hàng và lưu vào cơ sở dữ liệu
        user.totalItems = user.products.reduce((acc, product) => acc + product.quantity, 0)

        await user.save()

        // Trả về thông tin người dùng đã được cập nhật thành công
        responseHandler.success(res, user)
    } catch (error) {
        // Nếu có lỗi xảy ra, trả về thông báo lỗi và mã trạng thái 500
        res.status(500).json({ message: error })
    }
}

export const removeQuantityProductIdFromCart = async (req, res) => {
    const { _id: userId } = req.user
    const { productId } = req.body

    try {
        const user = await User.findById(userId).populate('products.productId')
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' })
        }

        // Tìm vị trí của sản phẩm có _id là productId trong mảng products của người dùng
        const productIndex = user.products.findIndex(productItem => productItem.productId._id.toString() === productId)
        const product = user.products[productIndex]
        if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' })

        // Nếu tìm thấy sản phẩm, xóa nó ra khỏi mảng products của người dùng
        if (product.quantity >= 2) {
            product.quantity--
            user.totalItems--
        } else {
            user.products.splice(productIndex, 1)
            user.totalItems -= product.quantity
        }
        await user.save()

        return responseHandler.success(res, user)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const removeProductIdFromCart = async (req, res) => {
    const { _id: userId } = req.user
    const { productId } = req.body

    try {
        const user = await User.findById(userId).populate('products.productId')
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' })
        }

        // Tìm vị trí của sản phẩm có _id là productId trong mảng products của người dùng
        const productIndex = user.products.findIndex(productItem => productItem.productId._id.toString() === productId)

        // Nếu tìm thấy sản phẩm, xóa nó ra khỏi mảng products của người dùng
        if (productIndex >= 0) {
            user.products.splice(productIndex, 1)

            // Cập nhật lại totalItems
            const totalItems = user.products.reduce((total, productItem) => {
                return total + productItem.quantity
            }, 0)

            user.totalItems = totalItems

            // Lưu lại thông tin người dùng
            await user.save()

            // Trả về kết quả cho client
            responseHandler.success(res, user)
        } else {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' })
        }
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const removeMutiplesProductId = async (req, res) => {
    try {
        const { _id: userId } = req.user
        const { productIds } = req.body

        // Kiểm tra xem user có tồn tại không
        const user = await User.findById(userId).populate('products.productId')
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' })
        }

        // Kiểm tra xem productIds có trong giỏ hàng không
        const productIdsInCart = user.products.map(product => String(product._id))
        const invalidProductIds = productIds.filter(productId => !productIdsInCart.includes(productId))
        if (invalidProductIds.length) {
            return res
                .status(404)
                .json({ message: `Không thể tìm thấy Id sản phẩm sau trong giỏ hàng: ${invalidProductIds.join(', ')}` })
        }

        // Xóa sản phẩm trong giỏ hàng
        const updatedProducts = user.products.filter(product => !productIds.includes(String(product._id)))

        // Cập nhật tổng số sản phẩm trong giỏ hàng
        const updatedTotalItems = updatedProducts.reduce((total, product) => total + product.quantity, 0)

        // Cập nhật giỏ hàng mới cho người dùng
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { products: updatedProducts, totalItems: updatedTotalItems },
            { new: true }
        )

        responseHandler.success(res, updatedUser)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const removeAllProducts = async (req, res) => {
    const userId = req.user._id
    try {
        const updateValues = await User.findByIdAndUpdate(
            userId,
            { $set: { products: [], totalItems: 0 } },
            { new: true }
        )
        responseHandler.success(res, updateValues)
    } catch (error) {
        responseHandler.error(res, error)
    }
}
