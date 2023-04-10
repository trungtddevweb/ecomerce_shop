import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () => {
    // Check if exist a user navigate to home page
    const token = useSelector(state => state.auth.user?.token)

    if (token) {
        return <Navigate to='/' replace />
    }

    return (
        <Outlet />
    )
}

export default AuthLayout