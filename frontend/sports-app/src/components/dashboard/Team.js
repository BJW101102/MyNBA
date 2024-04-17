import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Team({ team }) {
  return (
    <div>
      <Card className="team m-2 p-2" style={{ border: "2px solid white" }}>
        <Card.Title className="team-font-size" style={{ background: "#E3E1E1", border: "2px solid black" }}>{team.name}</Card.Title>
        <Card.Body className="d-flex flex-row" style={{ border: "2px solid white", overflowX: "auto" }}>
          <Card.Img fluid variant="top" src={team.logo} rounded style={{ border: "2px solid black" }} />
        </Card.Body>
        <ListGroup className="team-font-size" style={{ maxHeight: '100px', overflowY: 'auto' }}>
          {team.players.map(player => (
            <ListGroup.Item key={player.playerID}>{player.firstName} {player.lastName}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
}

export default Team;
