import AboutPage from '~/pages/AboutPage'
import BlogPage from '~/pages/BlogPage'
import ContactPage from '~/pages/ContactPage'
import ForgotPassword from '~/pages/ForgotPasswordPage'
import HomePage from '~/pages/HomePage'
import LoginPage from '~/pages/LoginPage'
import ProductPage from '~/pages/ProductPage'
import RegisterPage from '~/pages/RegisterPage'
import SearchPage from '~/pages/SearchPage'
import CartPage from '~/pages/CartPage'
import CategoriesPage from '~/pages/CategoriesPage'
import DashboardPage from '~/pages/DashboardPage'
// import { lazy } from "react"
// const DashboardPage = lazy(() => import('~/pages/DashboardPage'))
// const AboutPage = lazy(() => import('~/pages/AboutPage'))
// const BlogPage = lazy(() => import('~/pages/BlogPage'))
// const ContactPage = lazy(() => import('~/pages/ContactPage'))
// const ForgotPassword = lazy(() => import('~/pages/ForgotPasswordPage'))
// const HomePage = lazy(() => import('~/pages/HomePage'))
// const LoginPage = lazy(() => import('~/pages/LoginPage'))
// const RegisterPage = lazy(() => import('~/pages/RegisterPage'))
// const ProductPage = lazy(() => import('~/pages/ProductPage'))
// const SearchPage = lazy(() => import('~/pages/SearchPage'))
// const CartPage = lazy(() => import('~/pages/CartPage'))
// const CategoriesPage = lazy(() => import('~/pages/CategoriesPage'))

const routes = {
    home: {
        path: '/',
        element: <HomePage />
    },
    login: {
        path: '/login',
        element: <LoginPage />
    },
    register: {
        path: '/register',
        element: <RegisterPage />
    },
    forgot: {
        path: '/forgot',
        element: <ForgotPassword />
    },
    product: {
        path: '/products/:productId',
        element: <ProductPage />
    },
    blog: {
        path: '/blogs',
        element: <BlogPage />
    },
    contact: {
        path: '/contact',
        element: <ContactPage />
    },
    search: {
        path: '/search',
        element: <SearchPage />
    },
    about: {
        path: '/about',
        element: <AboutPage />
    },
    cart: {
        path: '/cart',
        element: <CartPage />
    },
    categories: {
        path: '/categories',
        element: <CategoriesPage />
    },
    dashboard: {
        path: '/dashboard',
        element: <DashboardPage />
    }
}

export default routes
