import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./main-navigation.module.css";
import { Form, ListGroup } from "react-bootstrap";
import Image from "next/image";
import useSWR from "swr";
import { useState, useEffect, useRef } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function MainNavigation() {
  const { data: session } = useSession();
  const { data: restaurantNames, error } = useSWR(
    "/api/get-all/get-all-restaurants",
    fetcher
  );
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const searchRef = useRef(null);

  const logoutHandler = () => {
    signOut();
  };

  // Function to shuffle and slice the array
  const getRandomNames = (names) => {
    for (let i = names.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [names[i], names[j]] = [names[j], names[i]];
    }
    return names.slice(0, 5);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // Update the search bar with the selected option and hide the options list
  const handleSelectOption = (name) => {
    setSelectedOption(name);
    setShowOptions(false);
  };

  const getFilteredNames = (names) => {
    if (!selectedOption) {
      return names.slice(0, 6);
    }
    return names
      .filter((name) =>
        name.toLowerCase().includes(selectedOption.toLowerCase())
      )
      .slice(0, 6);
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
            <Form className="d-flex position-relative" ref={searchRef}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onFocus={() => setShowOptions(true)}
                value={selectedOption} // Set the input value to the selected option
                onChange={(e) => setSelectedOption(e.target.value)} // Allow manual input changes
              />
              <Button className="searchButton">Search</Button>
              {showOptions && (
                <ListGroup className={styles.searchList}>
                  {restaurantNames &&
                    getFilteredNames(restaurantNames).map((name, index) => (
                      <ListGroup.Item
                        key={index}
                        action
                        as="div"
                        onClick={() => handleSelectOption(name)}
                      >
                        <Link
                          href={`/posts/restaurant/${encodeURIComponent(
                            name.toLowerCase().replace(/\s+/g, "-")
                          )}`}
                        >
                          {name}
                        </Link>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              )}
            </Form>
          </Nav>
          {session && (
            <>
              <Button className="button" onClick={logoutHandler}>
                Logout
              </Button>
            </>
          )}
          {!session && (
            <Button className="button">
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
