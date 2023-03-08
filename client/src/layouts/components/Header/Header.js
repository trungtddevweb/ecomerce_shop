import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import Search from "../Search"
// import routes from "src/utils/routes"
import { Container, Nav, NavDropdown, Navbar, NavbarBrand } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import Button from "~/components/Button/Button"
import { ExitToApp } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { logoutSuccess } from "src/redux/slice/usersSlice"
import Loading from "~/components/Loading/Loading"
import { logout } from "~/api/main"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Header = () => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) return navigate('/login')

    }, [user, navigate])

    console.log("user----", user)
    const handleLogout = async () => {
        setIsLoading(true)
        try {
            await logout()
            dispatch(logoutSuccess())
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setErrors(error.message)
            console.log("Error", errors)
        }
    }

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
                        {
                            isLoading ? (
                                <div>
                                    <Loading />
                                </div>
                            ) : (
                                <Button rightIcon={<ExitToApp onClick={handleLogout} />}>
                                    Hello username
                                </Button>
                            )
                        }
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