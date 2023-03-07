import AboutPage from '~/pages/AboutPage'
import BlogPage from '~/pages/BlogPage'
import ContactPage from '~/pages/ContactPage'
import ForgotPassword from '~/pages/ForgotPasswordPage/ForgotPassword'
import HomePage from '~/pages/HomePage'
import LoginPage from '~/pages/LoginPage'
import ProductPage from '~/pages/ProductPage'
import RegisterPage from '~/pages/RegisterPage'
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
    logout: {
        path: '/logout'
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
    }
}

export default routes
