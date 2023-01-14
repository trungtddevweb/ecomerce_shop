import ErrorPage from "~/pages/ErrorPage";
import { createBrowserRouter, Outlet } from "react-router-dom";
import routes from "src/utils/routes";
// import AuthRouters from "./AuthRouters";


const AuthLayout = () => {
    return (
        // <AuthRouters>
        <>
            <nav>
                <div>Home</div>
                <div>ConTact</div>
                <div>Product</div>
            </nav>
            <Outlet />
            <footer>Footer</footer>
        </>
        // </AuthRouters>
    )
}

export default createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
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


        ],
    }
])