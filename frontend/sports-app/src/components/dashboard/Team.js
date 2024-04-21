import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function isDark(color) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) < 186;
}

function Team({ team }) {
    const textColor = isDark(team.secondary) ? '#FFF' : '#000';

    // Ensure players data is correct
    if (!team.players || !Array.isArray(team.players)) {
        console.error('Invalid players data', team);
        return null; // Or some error fallback UI
    }

    return (
        <div>
            <Card className="team m-2 p-0 custom-card" style={{ margin: "0", padding: "0" }}>
                <Card.Title className="team-font-size" style={{
                    backgroundColor: team.secondary, 
                    color: textColor, // Only apply the dynamic text color to the title
                    width: "100%", 
                    padding: "10px 20px", 
                    borderTopLeftRadius: "6px", 
                    borderTopRightRadius: "6px"
                }}>
                    {team.code}, {team.name}
                </Card.Title>
                <Card.Body className="d-flex flex-row" style={{ backgroundColor: "white", overflowX: "auto" }}>
                    <Card.Img fluid variant="top" src={team.logo} style={{ height: "25vh", width: "40vh", marginRight: "5vh" }} />
                    <ListGroup className="team-font-size" style={{ maxHeight: '25vh', overflowY: 'auto' }}>
                        {team.players.map(player => (
                            // Keep the player names' color black or any color that contrasts with their background
                            <ListGroup.Item key={player.playerID} style={{ color: '#000' }}>
                                {player.firstName} {player.lastName}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Team;
