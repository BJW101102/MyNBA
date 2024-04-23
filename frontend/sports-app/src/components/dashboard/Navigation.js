import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faFutbol } from '@fortawesome/free-solid-svg-icons';

function Navigation({ username, userID, api }) {

  const handleLogOut = async (event) => {
    try {
      const response = await api.post('logout')
      if (response.status === 200) {
        window.location.href = 'http://localhost:3000';
      }
    }
    catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <Row>
      <Navbar expand="sm" className="navbar-custom">
        <Navbar.Brand href="#">Hello, {username}:{userID}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">
              <FontAwesomeIcon icon={faFutbol} /> Sports
            </Nav.Link>
            <Nav.Link href="#action2" onClick={handleLogOut}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            {/* <Button variant="outline-success">Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </Row>
  );
};

export default Navigation;
