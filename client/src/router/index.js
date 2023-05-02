import ErrorPage from '~/pages/ErrorPage'
import { createBrowserRouter } from 'react-router-dom'
import routes from 'src/utils/routes'
import { AuthLayout, MainLayout } from 'src/layouts'

export default createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: routes.login.path,
                element: routes.login.element
            },
            {
                path: routes.register.path,
                element: routes.register.element
            },
            {
                path: routes.forgot.path,
                element: routes.forgot.element
            }
        ]
    },
    {
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: routes.home.path,
                element: routes.home.element
            },
            {
                path: routes.product.path,
                element: routes.product.element
            },
            {
                path: routes.productDetails.path,
                element: routes.productDetails.element
            },
            {
                path: routes.about.path,
                element: routes.about.element
            },
            {
                path: routes.blog.path,
                element: routes.blog.element
            },
            {
                path: routes.blogDetail.path,
                element: routes.blogDetail.element
            },
            {
                path: routes.contact.path,
                element: routes.contact.element
            },
            {
                path: routes.cart.path,
                element: routes.cart.element
            },
            {
                path: routes.dashboard.path,
                element: routes.dashboard.element
            },
            {
                path: routes.personal.path,
                element: routes.personal.element
            }
        ]
    }
])
