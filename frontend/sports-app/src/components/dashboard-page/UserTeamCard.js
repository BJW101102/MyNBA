import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CardBody from 'react-bootstrap/esm/CardBody';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import SingleTeam from '../../views/SingleTeam';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';

function isDark(color) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) < 186;
}

function UserTeamCard({ team, api }) {
    const [deleted, setDeleted] = useState(false);
    const textColor = isDark(team.secondary) ? '#FFF' : '#000';
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(`/NBA/team/${team.teamID}/${team.code}/2023-24`);
    }

    const handleUnfollow = async () => {
        try {
            await api.delete(`unfollow/${team.teamID}`);
            console.log("Team unfollowed");
            setDeleted(true); // Optional: If you want to visually mark the card as deleted
        } catch (error) {
            console.error(error);
        }
    };

    if (deleted) {
        return null; // If the card is deleted, return null to render nothing
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
                                                {player.firstName} {player.lastName} (#{player.jerNum}), {player.pos}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
                <Nav.Link href="#action3" style={{
                    top: "-7vh",
                    position: "relative",
                    marginLeft: "2vh",
                    marginBottom: "-5vh"
                }}
                    onClick={handleUnfollow}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </Nav.Link>
            </Card>

            <Routes>
                <Route path={`/NBA/team/${team.teamID}/${team.code}/2023-24`} element={<SingleTeam api={api} />} />
            </Routes>
        </div>

    );
}

export default UserTeamCard;
