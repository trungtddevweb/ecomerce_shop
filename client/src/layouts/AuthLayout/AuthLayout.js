import { useLayoutEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const AuthLayout = () => {
    // Check if exist a user navigate to home page
    const user = localStorage.getItem('user')
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (user) {
            return navigate('/')
        }
    }, [user, navigate])
    return (
        <Outlet />
    )
}

export default AuthLayout