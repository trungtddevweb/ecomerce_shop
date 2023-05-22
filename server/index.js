import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import connectDB from './connect.js'
import routes from './src/routes/index.js'
import cors from 'cors'
import path from 'path'
import runJobs from './src/jobs/index.js'

// Used for environment variables
dotenv.config()

const __dirname = path.resolve()

const app = express()
morgan('combined')

// Use middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

app.use('/api', routes)

runJobs()

const server = app.listen(process.env.PORT || 5001, () => {
    connectDB()
    console.log(`Back-end server listening on port ${process.env.PORT}`)
})

process.on('unhandledRejection', err => {
    console.error(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})
