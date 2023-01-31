import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
// import images from "~/assets/imgs"
// import Image from "~/components/Image"
import Search from "../Search"
import Button from "~/components/Button/Button"
import routes from "src/utils/routes"
import { Link } from "react-router-dom"
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"

const Header = () => {
    return (

        // <Navbar expand="lg" className="w-100 d-flex justify-content-center bg-white header position-sticky top-0">
        //     <Container className="header-wrapper d-flex justify-content-between align-items-center px-2">
        //         <Nav className="d-flex align-items-center gap-lg-5">
        //             <div className="logo d-flex align-items-center justify-content-center">
        //                 <h2>Dream Store</h2>
        //             </div>
        //             <nav className="navigation gap-3">
        //                 <div>Home</div>
        //                 <div>Category</div>
        //                 <div>About</div>
        //                 <div>Blog</div>
        //             </nav>
        //         </Nav>
        //         <div className="d-flex gap-2">
        //             <Search />
        //             <Link to={routes.login.path}>
        //                 <Button className="border-0 px-4 py-2 rounded-5 text-white bg-primary fw-bold">Join the community</Button>
        //             </Link>
        //             <div className="cart-shopping p-2">
        //                 <FontAwesomeIcon icon={faCartShopping} />
        //                 <div className="count-product bg-danger text-white p-1 fw-bold rounded-circle">10</div>
        //             </div>
        //         </div>

        //     </Container>
        // </Navbar>
        <Navbar expand="lg" className="header sticky-top bg-light">
            <Container className="header-wrapper">
                <Navbar.Brand>
                    <h2>Dream Store</h2>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="navigation me-auto gap-3">
                        <Nav.Link>Home</Nav.Link>
                        <Nav.Link>About</Nav.Link>
                        <Nav.Link>Blog</Nav.Link>
                        <NavDropdown title="Category" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className="d-flex gap-2">
                        <Search />
                        <Link to={routes.login.path}>
                            <Button className="border-0 px-4 py-2 rounded-5 text-white bg-primary fw-bold">Join the community</Button>
                        </Link>
                        <Nav className="cart-shopping p-2">
                            <FontAwesomeIcon icon={faCartShopping} />
                            <div className="count-product bg-danger text-white p-1 fw-bold rounded-circle">10</div>
                        </Nav>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header