import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () => {
    // Check if exist a user navigate to home page
    const token = localStorage.getItem('token')

    if (token) {
        return <Navigate to='/' replace />
    }

    return (
        <Outlet />
    )
}

export default AuthLayout