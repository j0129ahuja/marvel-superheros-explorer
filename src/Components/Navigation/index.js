import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  // CONSTANTS
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>Marvel</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
          <Nav.Link onClick={() => navigate("/saved")}>Saved</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
