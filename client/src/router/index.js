import ErrorPage from "~/pages/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import routes from "src/utils/routes";
import { AuthLayout, MainLayout } from "src/layouts";



export default createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: routes.login.path,
                element: routes.login.element,
            },
            {
                path: routes.register.path,
                element: routes.register.element,
            },
            {
                element: routes.logout.path
            }
        ],
    }
    ,
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
            }

        ]

    }


])

