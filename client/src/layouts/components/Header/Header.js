import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import images from "~/assets/imgs"
import Image from "~/components/Image"
import Search from "../Search"
import Button from "~/components/Button/Button"
import routes from "src/utils/routes"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="header bg-transparent position-sticky top-0 d-flex justify-content-between align-items-center px-2">
            <div className="d-flex align-items-center gap-lg-5">
                <div className="logo d-flex align-items-center justify-content-center">
                    <Image src={images.logo} className="" alt="Special Fashion" />
                </div>
                <nav className="navigation gap-5">
                    <div>Home</div>
                    <div>Category</div>
                    <div>About</div>
                    <div>Contact</div>
                    <div>Blog</div>
                </nav>
            </div>
            <div className="d-flex gap-2">
                <Search />
                <Link to={routes.login.path}>
                    <Button className="border-0 px-4 py-2 rounded-5 text-white bg-primary fw-bold">Join the community</Button>
                </Link>
                <div className="cart-shopping p-2">
                    <FontAwesomeIcon icon={faCartShopping} />
                    <div className="count-product bg-danger text-white p-1 fw-bold rounded-circle">10</div>
                </div>
            </div>

        </header>
    )
}

export default Header