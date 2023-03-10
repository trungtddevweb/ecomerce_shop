import jwt from 'jsonwebtoken'

export const baseURL = () =>
    process.env.BASE_URL
        ? process.env.BASE_URL
        : process.env.NODE_ENV !== 'production'
            ? 'http://localhost:5000'
            : 'https://ecomerce-shoping.vercel.app';
