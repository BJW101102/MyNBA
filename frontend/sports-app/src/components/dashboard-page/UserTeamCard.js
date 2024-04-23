import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CardBody from 'react-bootstrap/esm/CardBody';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import SingleTeam from '../../views/SingleTeam';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function isDark(color) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) < 186;
}

function UserTeamCard({ team, api }) {

    const handleSubmit = (event) => {
        window.location.href = `/NBA/team/${team.teamID}/${team.code}/2023-24`
    }

    const textColor = isDark(team.secondary) ? '#FFF' : '#000';


    // Ensure players data is correct
    if (!team.players || !Array.isArray(team.players)) {
        console.error('Invalid players data', team);
        return null; // Or some error fallback UI
    }

    return (
        <div>
            <Card className="team m-2 p-0 custom-card" style={{ margin: "0", padding: "0" }}>
                <Card.Title className="user-card-title" style={{
                    backgroundColor: team.secondary,
                    color: textColor
                }}
                    onMouseEnter={(e) => {
                        e.target.style.color = team.primary; // Change text color on hover
                        e.target.style.textDecoration = "underline"; // Add underline on hover
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = textColor; // Revert text color on mouse leave
                        e.target.style.textDecoration = "none"; // Remove underline on mouse leave
                    }}
                    onClick={handleSubmit}
                >
                    {team.name} ({team.code})
                </Card.Title>
                <Card.Body className="d-flex flex-row" style={{ backgroundColor: "white", overflowX: "auto" }}>
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center">
                            <Card.Img fluid variant="top" src={team.logo} style={{ height: "25vh", width: "40vh" }}
                            />
                        </Col>
                        <Col >
                            <Card className="team m-2 p-0">
                                <Card.Title className="user-card-title" style={{
                                    backgroundColor: team.primary,
                                    color: "white"
                                }}>
                                    2023-24 Roster
                                </Card.Title>
                                <CardBody>
                                    <ListGroup className="team-font-size" style={{ maxHeight: '15vh', overflowY: 'auto' }}>
                                        {team.players.map(player => (
                                            // Keep the player names' color black or any color that contrasts with their background
                                            <ListGroup.Item key={player.playerID} style={{ color: '#000' }}>
                                                {player.firstName} {player.lastName} ({player.jerNum}), {player.pos}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Routes>
                <Route path={`/NBA/team/${team.teamID}/${team.code}/2023-24`} element={<SingleTeam api={api} />} />
            </Routes>
        </div>

    );
}

export default UserTeamCard;
