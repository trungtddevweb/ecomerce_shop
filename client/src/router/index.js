import { Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import routes from "src/utils/routes";


const AuthLayout = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
        </Suspense>
    )
}

export default createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                element: routes.home.element,
                path: routes.home.path
            },
            {
                element: routes.login.element,
                path: routes.login.path
            },
            {
                element: routes.register.element,
                path: routes.register.path
            },

        ]
    }
])