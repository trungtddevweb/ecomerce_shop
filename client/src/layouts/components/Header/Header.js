import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import Search from "../Search"
import Button from "~/components/Button/Button"
import routes from "src/utils/routes"
import { Link } from "react-router-dom"
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"

const Header = () => {
    return (
        <Navbar expand="lg" sticky="top" className="header bg-light">
            <Container className="header-wrapper">
                <Navbar.Brand>
                    <Link to="/">
                        <h2>Dream Store</h2>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="navigation me-auto gap-3">
                        <Nav.Link>
                            <Link to="/">Home</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/about">About</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/blogs">Blog</Link>
                        </Nav.Link>
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
                            <Button className="border-0 px-4 py-2 rounded-5 text-white bg-primary fw-bold">Login</Button>
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