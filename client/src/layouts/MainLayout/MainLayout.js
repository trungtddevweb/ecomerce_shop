import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div>
            <div className="main">
                <Header />
                {/* <Outlet /> */}
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default MainLayout