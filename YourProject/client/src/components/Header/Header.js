import { React } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import "./Header.css";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo).user : null;

  const logout = async () => {
    await axios.post('/users/logout');
    localStorage.removeItem("userInfo");
    navigate("/");
  }

  return (
    <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            Frank's WEB Project
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">
              Home
            </Nav.Link>
            <Nav.Link href="/products">
              Products
            </Nav.Link>
            {userInfo ? (
              <NavDropdown title={userInfo.fullName.split(" ")[ 0 ]}
                id="basic-nav-dropdown"
                className="bg-light">
                <NavDropdown.Item onClick={() => { navigate("/account") }}>
                  <p className="nav-link mb-0">
                    Profile
                  </p>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => { navigate("/cart") }}>
                  <p className="nav-link mb-0">
                    Cart
                  </p>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  <p className="nav-link mb-0">
                    Logout
                  </p>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">
                Log In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
