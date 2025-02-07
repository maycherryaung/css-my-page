  "use client";

  import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
  import React from "react";
  import { Navbar, Nav, Container } from "react-bootstrap";
  import Link from "next/link";

  const Layout = ({ children }) => {
    return (
      <html lang="en">
        <head>
          <title>My App</title>
        </head>
        <body>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="/">My App</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {/* Replace Nav.Link with Link */}
                  <Link href="/" passHref>
                    <Nav.Link as="span">Home</Nav.Link>
                  </Link>
                  <Link href="/about" passHref>
                    <Nav.Link as="span">About</Nav.Link>
                  </Link>
                  <Link href="/contact" passHref>
                    <Nav.Link as="span">Contact</Nav.Link>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <main>{children}</main>
        </body>
      </html>
    );
  };

  export default Layout;
