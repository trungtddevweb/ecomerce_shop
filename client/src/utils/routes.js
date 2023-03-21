import AboutPage from '~/pages/AboutPage'
import BlogPage from '~/pages/BlogPage'
import ContactPage from '~/pages/ContactPage'
import ForgotPassword from '~/pages/ForgotPasswordPage/ForgotPassword'
import HomePage from '~/pages/HomePage'
import LoginPage from '~/pages/LoginPage'
import ProductPage from '~/pages/ProductPage'
import RegisterPage from '~/pages/RegisterPage'
import SearchPage from '~/pages/SearchPage'
import CartPage from '~/pages/CartPage'
import CategoriesPage from '~/pages/CategoriesPage'
import DashboardPage from '~/pages/DashboardPage'

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
