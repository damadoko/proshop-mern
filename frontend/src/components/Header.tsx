import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav } from "react-bootstrap";

export const Header: React.FC = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="#home">ProShop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link href="/cart">
                  <i className="fas fa-shopping-cart" />
                  Cart
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/login">
                <Nav.Link href="/login">
                  <i className="fas fa-user" />
                  Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
