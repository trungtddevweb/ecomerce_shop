import AboutPage from '~/pages/AboutPage'
import BlogPage from '~/pages/BlogPage'
import ContactPage from '~/pages/ContactPage'
import ForgotPassword from '~/pages/ForgotPasswordPage'
import HomePage from '~/pages/HomePage'
import LoginPage from '~/pages/LoginPage'
import ProductPage from '~/pages/ProductPage'
import RegisterPage from '~/pages/RegisterPage'
import CartPage from '~/pages/CartPage'
import DashboardPage from '~/pages/DashboardPage'
import BlogDetailPage from '~/pages/BlogDetailPage'
import ProductDetails from '~/pages/ProductDetails'
import Personal from '~/pages/Personal'
import SearchPage from '~/pages/SearchPage'

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
    about: {
        path: '/about',
        element: <AboutPage />
    },
    cart: {
        path: '/cart',
        element: <CartPage />
    },
    dashboard: {
        path: '/dashboard/:managerId',
        element: <DashboardPage />
    },
    search: {
        path: '/search',
        element: <SearchPage />
    },
    personal: {
        path: '/settings',
        element: <Personal />
    }
}

export default routes
