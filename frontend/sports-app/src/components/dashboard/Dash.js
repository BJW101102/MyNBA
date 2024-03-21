import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Team from './Team.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

function Dash({ username, userID }) {

  const logo = "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/lal.png&h=200&w=200"
  const logo2 = "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mia.png&h=200&w=200"
  return (
    <div className="dash-container">
      <Row style={{background: "#e3e1e1", height: "85vh" }}>
        <Col xs={3} md={2}>
          <Image fluid src="https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png" rounded className='mb-2 mt-2 img-border' />
          <Card>
            <Card.Body>
              <Card.Title>{username}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">UserID:{userID}</Card.Subtitle>
              <Card.Text>
                {username}'s information
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={9} md={10} className='teams' style ={{border: "1px solid black"}}>
          <Row>
            <Col md={6}>
              <Team logo = {logo}></Team>
            </Col>
            <Col md={6}>
              <Team logo = {logo2}> </Team>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>

  );
};

export default Dash;


