import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const connectDB = async () => {
    const url = `mongodb+srv://${process.env.USER_DB}:${process.env.PW_DB}@ecomerceshop.goxor7d.mongodb.net/?retryWrites=true&w=majority`
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log({
            status: 'success',
            message: 'MongDB has been successfully connected!!!'
        })
    } catch (err) {
        console.error({ message: err.message })
    }
}

export default connectDB
