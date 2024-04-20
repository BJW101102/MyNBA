import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function Team({ team }) {
  return (
    <div>
      <Card className="team m-2 p-0 custom-card" style={{margin: "0", padding: "0"}}  >
      <Card.Title className="team-font-size" style={{ backgroundColor: `${team.secondary}`, color: "black", width: "100%", padding: "10px 20px", borderTopLeftRadius: "6px", borderTopRightRadius: "6px"}}>{team.code}, {team.name}</Card.Title>
        <Card.Body className="d-flex flex-row" style={{backgroundColor: "white", overflowX: "auto" }}>
          <Card.Img fluid variant="top" src={team.logo} rounded style={{ backgroundColor: "white", height: "25vh", width: "40vh", marginRight: "5vh" }} />
          <ListGroup className="team-font-size" style={{ maxHeight: '25vh', width: "100%", overflowY: 'auto' }}>
          {team.players.map(player => (
            <ListGroup.Item key={player.playerID}>{player.firstName} {player.lastName}</ListGroup.Item>
          ))}
        </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Team;
