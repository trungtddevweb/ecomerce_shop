import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import Search from "../Search"
import routes from "src/utils/routes"
import { Container, Nav, NavDropdown, Navbar, NavbarBrand } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const Header = () => {

    return (
        <Navbar expand="lg" sticky="top" className="header bg-light">
            <Container className="header-wrapper">
                <LinkContainer to="/">
                    <NavbarBrand>
                        <h2>Dream Store</h2>
                    </NavbarBrand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="navigation me-auto gap-3">
                        <LinkContainer to="/">
                            <Nav.Link>
                                Home
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/blogs">
                            <Nav.Link>
                                Blog
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <Nav.Link>
                                About
                            </Nav.Link>
                        </LinkContainer>
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
                        <div>{ }</div>
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