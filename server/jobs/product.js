import cron from 'node-cron'
import Product from '../models/Product.js'

const productJob = cron.schedule('* * * * *', async () => {
    try {
        const currentTime = new Date()

        // Tìm các sản phẩm có thời gian flashSaleEnd nhỏ hơn currentTime
        const productsToUpdate = await Product.find({
            flashSaleEnd: { $lt: currentTime }
        })

        // Cập nhật giá của các sản phẩm về giá chính
        for (const product of productsToUpdate) {
            product.price = product.regularPrice
            await product.save()
        }
    } catch (error) {
        console.error(error)
    }
})

export default productJob
