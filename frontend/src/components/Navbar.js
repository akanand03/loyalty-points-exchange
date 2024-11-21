import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AppNavbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userName = localStorage.getItem('name');
        if (userName) setUser(userName);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        navigate('/login');
    };

    return (
        <Navbar expand="lg" style={{ backgroundColor: '#4B0082' }} variant="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" style={{ color: '#FFFFFF' }}>
                    Loyalty Points Exchange
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" style={{ color: '#FFFFFF' }}>
                            Dashboard
                        </Nav.Link>
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/transfer" style={{ color: '#FFFFFF' }}>
                                    Transfer
                                </Nav.Link>
                                <Nav.Link as={Link} to="/redeem" style={{ color: '#FFFFFF' }}>
                                    Redeem
                                </Nav.Link>
                                <NavDropdown title={user} id="nav-dropdown" menuVariant="dark">
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" style={{ color: '#FFFFFF' }}>
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup" style={{ color: '#FFFFFF' }}>
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
