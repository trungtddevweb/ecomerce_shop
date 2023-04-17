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
import BlogDetailPage from '~/pages/BlogDetailPage'
import ProductDetails from '~/pages/ProductDetails/ProductDetails'

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
        path: '/products',
        element: <ProductPage />
    },
    productDetails: {
        path: '/products/:productId',
        element: <ProductDetails />
    },
    blog: {
        path: '/blogs',
        element: <BlogPage />
    },
    blogDetail: {
        path: '/blogs/:blogId',
        element: <BlogDetailPage />
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
        path: '/dashboard/:managerId',
        element: <DashboardPage />
    }
}

export default routes
