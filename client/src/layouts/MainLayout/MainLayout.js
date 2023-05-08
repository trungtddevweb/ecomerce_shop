import Header from '../components/Header'
import Footer from '../components/Footer'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const MainLayout = () => {
    // Check if don't exist user in LocalStorage navigate to login/register pages
    const token = useSelector(state => state.auth.user?.token)

    if (!token) return <Navigate to='/login' replace />

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout
