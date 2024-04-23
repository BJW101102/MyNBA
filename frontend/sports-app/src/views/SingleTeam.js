import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/Navigation.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from 'react-router-dom';
import '../CSS/Dashboard.css';
import Card from 'react-bootstrap/Card';

function SingleTeam({ teamData, api }) {
    const { teamID } = useParams();
    const [team, setTeam] = useState({});
    const [games, setGames] = useState({});
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        const fetchTeamInfo = async () => {
            try {
                const response = await api.get(`team/${teamID}`);
                const teamInfo = response.data.team;
                setTeam(teamInfo);
                setGames(response.data.games);
                setLoading(false); // Set loading to false when data is loaded
                console.log(response.data.team);
            } catch (error) {
                console.error('Error fetching followed teams:', error);
            }
            console.log("TEAM STUFF: ", teamID)
        };

        fetchTeamInfo();
    }, []);

    return (
        <Container fluid>
            <div className="App">
                <header>
                    <Navigation />
                </header>
                <main>
                    <Row style={{ background: "#e3e1e1", height: "30vh" }}>
                        <Col xs={3} md={2} style={{ marginRight: "20vh" }}>
                            <Image fluid src={team.logo} style={{ width: "55vh", maxWidth: "720px" }} />
                        </Col>
                        <Col style={{ marginTop: "5vh" }}>
                            <Card className="team m-2 p-0 custom-card" style={{ margin: "0", padding: "0" }}>
                                <Card.Title className="user-card-title" style={{
                                    backgroundColor: team.primary,
                                    color: "white"
                                }}>
                                    {team.name}
                                </Card.Title>
                                <Card.Body className="d-flex justify-content-around">
                                    <div>
                                        <strong>Code:</strong> {team.code}
                                    </div>
                                    <div>
                                        <strong>Location:</strong> {team.location}, USA
                                    </div>
                                    <div>
                                        <strong>Conference:</strong> {team.conference}
                                    </div>
                                    <div>
                                        <strong>Division:</strong> {team.division}
                                    </div>
                                </Card.Body>
                            </Card>

                        </Col>
                    </Row>

                    {loading ? ( // Render loading indicator while data is loading
                        <div>Loading...</div>
                    ) : (
                        <Row style={{ background: "#e3e1e1", height: "85vh" }}>
                            <Col>
                                <Card className="team m-2 p-0 custom-card" style={{ margin: "0", padding: "0" }}>
                                    <Card.Title className="user-card-title" style={{
                                        backgroundColor: team.primary,
                                        color: "white"
                                    }}>
                                        {team.code}'s Player Stats
                                    </Card.Title>
                                    <Card.Body>
                                        <ListGroup className="team-font-size" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                                            {team.players.map(player => (
                                                <ListGroup.Item key={player.playerID} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ fontSize: "2vh" }}>
                                                        {player.firstName} {player.lastName} (#{player.jerNum})
                                                    </div>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <span style={{ fontSize: "2vh" }}>PTS: {player.pts}, REB: {player.reb}, AST: {player.ast}, BLK: {player.blks}, FGP: {player.fgp}%</span>
                                                    </div>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="team m-2 p-0 custom-card" style={{ margin: "0", padding: "0" }}>
                                    <Card.Title className="user-card-title" style={{
                                        backgroundColor: team.primary,
                                        color: "white"
                                    }}>
                                        {team.code}'s Games
                                    </Card.Title>
                                    <Card.Body>
                                        <ListGroup className="team-font-size" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                                            {games.map(game => (
                                                <ListGroup.Item key={game.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <div className="game-container" style={{ fontSize: "2vh" }} >
                                                        {game.homeTeam.code}
                                                        <img className='mini-logo' src={game.homeTeam.logo} alt={`${game.homeTeam.code} Logo`} />
                                                        <span style={{ margin: '0 13px' }}>VS</span> {/* Adjusted margin */}
                                                        {game.visitorTeam.code}
                                                        <img className='mini-logo' src={game.visitorTeam.logo} alt={`${game.visitorTeam.code} Logo`} />
                                                        <span style={{ margin: '0 5px' }}>({game.homeScore} - {game.visitorScore})</span> {/* Adjusted margin */}
                                                        <span style={{ margin: '0 5px', color: game.isTeamWinner ? 'green' : 'red' }}>{game.isTeamWinner ? 'W' : 'L'}</span> {/* Green for winner, red for loser */}
                                                    </div>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </main>
            </div>
        </Container >
    );
};
export default SingleTeam;
