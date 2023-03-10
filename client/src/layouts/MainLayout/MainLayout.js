import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'

const MainLayout = () => {
    // Check if don't exist user in LocalStorage navigate to login/register page
    const user = localStorage.getItem('user')
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (!user) {
            return navigate('/login')
        }
    }, [user, navigate])

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout