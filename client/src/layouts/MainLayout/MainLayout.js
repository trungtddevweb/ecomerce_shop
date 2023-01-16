// import PropTypes from 'prop-types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

// MainLayout.propTypes = {
//     children: PropTypes.node.isRequired
// }

export default MainLayout