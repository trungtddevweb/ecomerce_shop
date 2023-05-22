import jwt from 'jsonwebtoken'

export const baseURL = () =>
    process.env.BASE_URL
        ? process.env.BASE_URL
        : process.env.NODE_ENV === 'production'
        ? 'https://ecomerce-shoping.vercel.app'
        : 'http://localhost:5000'
