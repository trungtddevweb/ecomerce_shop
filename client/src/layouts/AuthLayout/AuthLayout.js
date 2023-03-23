import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () => {
    // Check if exist a user navigate to home page
    const user = localStorage.getItem('user')

    if (user) {
        return <Navigate to='/' replace />
    }

    return (
        <Outlet />
    )
}

export default AuthLayout