import HomePage from "~/pages/HomePage";
import LoginPage from "~/pages/LoginPage";
import RegisterPage from "~/pages/RegisterPage";

const routes =
{
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
        element: <RegisterPage />,
    }

}



export default routes;