import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./main-navigation.module.css";
// import { signIn } from "next-auth/react";
import { Form } from "react-bootstrap";
import Image from "next/image";

function MainNavigation() {
  const { data: session } = useSession();

  const logoutHandler = () => {
    signOut();
  };

  return (
    <Navbar expand="lg" bg="light">
      <Container className={styles.container}>
        <Link href="/">
          <Navbar.Brand>
            <Image
              src="/images/logo/mealMapLogo.jpg"
              alt="logo"
              width={80}
              height={40}
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" className="nav-link">
              Home
            </Link>
            {session && (
              <>
                <Link href="/profile" className="nav-link">
                  Profile
                </Link>
              </>
            )}
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </Nav>
          {session && (
            <>
              <Button variant="primary" onClick={logoutHandler}>
                Logout
              </Button>
            </>
          )}
          {!session && (
            <Button variant="primary">
              <Link href="/auth" className="nav-link">
                Login
              </Link>
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
