import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faFutbol, faSignInAlt, faBasketball, fa0, faDashboard } from '@fortawesome/free-solid-svg-icons';

function Navigation({ api }) {
  const [user, setUser] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Sending GET request for user information
        const response = await api.get('userdata');
        setUser(response.data); //Setting the username to the response object's username
      }
      catch (error) {
        console.error("Error fetching user data:", error)
      }
    };
    fetchUserData();
  }, []);

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

  const handleRedirectDash = () =>{
    window.location.href = 'http://localhost:3000/dashboard';
  }

  const handleRedirectSport = () =>{
    window.location.href = 'http://localhost:3000/sports';
  }

  const handleUsernameChange = async (event) => {
    event.preventDefault();
    // Send a request to update the username
    try {
      const response = await api.patch('change-username', { username: newUsername });
      console.log(response.status);
      if (response.status === 200) {
        setUser({ ...user, username: newUsername });
        setNewUsername('');
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  return (
    <Row>
      <Navbar expand="sm" className="navbar-custom" style={{ height: "5vh" }}>
        <Navbar.Brand href="#">Welcome to myNBA, {user.username}:{user.userID}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" onClick={handleRedirectDash}>
              <FontAwesomeIcon icon={faDashboard} /> Dashboard
            </Nav.Link>
            <Nav.Link href="#action2" onClick={handleRedirectSport}>
              <FontAwesomeIcon icon={faBasketball} /> NBA Teams
            </Nav.Link>
            <Nav.Link href="#action3" onClick={handleLogOut}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Nav.Link>
            {!isEditing && (
              <Nav.Link className="editUsername" href="#" onClick={() => setIsEditing(true)}>
                Edit Username
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {isEditing && (
        <Form className="username-form" onSubmit={handleUsernameChange}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>New Username</Form.Label>
            <Form.Control
              type="text"
              className="username-input"
              placeholder="Enter new username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </Form.Group>
          <button type="submit" className="submit-button">
            Update Username
          </button>
        </Form>
      )}
    </Row>
  );
};


export default Navigation;
