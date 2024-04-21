import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Team from './Team.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';

// Include the utility function to determine text color
function isDark(color) {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return (r * 0.299 + g * 0.587 + b * 0.114) < 186;
}

function Dash({ username, userID, api }) {
  const [followedTeams, setFollowedTeams] = useState([]);

  useEffect(() => {
    const fetchFollowedTeams = async () => {
      try {
        const response = await api.get(`followed-teams`, { params: { userID } });
        setFollowedTeams(response.data);
      } catch (error) {
        console.error('Error fetching followed teams:', error);
      }
    };

    fetchFollowedTeams();
  }, [userID]);

  return (
    <div className="dash-container">
      <Row style={{ background: "#e3e1e1" }}>
        <Col xs={2} md={2}>
          <Image fluid src="https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png" rounded className='mb-2 mt-2 img-border' />
          <Card>
            <Card.Body>
              <Card.Title style={{ color: isDark("#e3e1e1") ? '#FFF' : '#000' }}>Followed Teams</Card.Title>
              <Card.Text>
                <ListGroup className="team-font-size" style={{ overflowY: 'auto' }}>
                  {followedTeams.map(team => (
                    <ListGroup.Item 
                      key={team.teamID}
                      style={{
                        backgroundColor: `${team.secondary}`,
                        color: isDark(team.secondary) ? '#FFF' : '#000', // Change text color based on background
                        fontWeight: "bold",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{team.code}, {team.division}</span>
                      <img 
                        src={team.logo} 
                        alt={`${team.code} logo`}
                        style={{
                          height: '20px',
                          width: 'auto', // Maintain aspect ratio
                          objectFit: 'contain', // Ensure the image is contained within the element
                          marginLeft: '10px'
                        }} 
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={9} md={10} className='teams' style={{border: "1px solid black"}}>
          <Row>
            {followedTeams.map(team => (
              <Col md={6} key={team.teamID}>
                <Team team={team} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div >
  );
};

export default Dash;
