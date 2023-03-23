import Header from '../components/Header'
import Footer from '../components/Footer'
import { Navigate, Outlet } from 'react-router-dom'

const MainLayout = () => {
    // Check if don't exist user in LocalStorage navigate to login/register pages
    const user = localStorage.getItem('user')

    if (!user) return <Navigate to="/login" replace />

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout