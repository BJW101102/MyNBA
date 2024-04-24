import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserTeamCard from './UserTeamCard.js';
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
      <Row className="user-info-container" style={{minHeight: "95vh"}}>
        <Col xs={2} md={2}>
          <Image fluid src="https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png" rounded className='mb-2 mt-2 img-border' />
          <Card>
            <Card.Body>
              <Card.Title style={{color: "black", textAlign: "center" }}>Followed Teams</Card.Title>
              <Card.Text>
                <ListGroup className="team-font-size" style={{ overflowY: 'auto' }}>
                  {followedTeams.map(team => (
                    <ListGroup.Item className='followed-card'
                      key={team.teamID}
                      style={{
                        backgroundColor: `${team.secondary}`,
                        color: isDark(team.secondary) ? '#FFF' : '#000', // Change text color based on background
                      }}
                    >
                      <span>{team.code}, {team.division}</span>
                      <img className='mini-logo'
                        src={team.logo} 
                        alt={`${team.code} logo`}
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={9} md={10} className='teams'>
          <Row>
            {followedTeams.map(team => (
              <Col md={6} key={team.teamID}>
                <UserTeamCard team={team} api={api} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div >
  );
};

export default Dash;
