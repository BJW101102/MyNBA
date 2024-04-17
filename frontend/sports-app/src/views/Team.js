import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/dashboard/Navigation.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';

function Team() {
    const teamData = {
        "teamID": 17,
        "name": "Los Angeles Lakers",
        "logo": "https://logos-world.net/wp-content/uploads/2020/05/Los-Angeles-Lakers-Logo-700x394.png",
        "primary": "#552583",
        "secondary": "#FDB927",
        "code": "LAL",
        "conference": "West",
        "division": "Pacific",
        "location": "Los Angeles",
        "players": [
            {
                "teamID": 17,
                "playerID": 462,
                "firstName": "D'Angelo",
                "lastName": "Russell"
            },
            {
                "teamID": 17,
                "playerID": 560,
                "firstName": "Christian",
                "lastName": "Wood"
            },
            {
                "teamID": 17,
                "playerID": 437,
                "firstName": "Taurean",
                "lastName": "Prince"
            },
            {
                "teamID": 17,
                "playerID": 1775,
                "firstName": "Gabe",
                "lastName": "Vincent"
            },
            {
                "teamID": 17,
                "playerID": 1864,
                "firstName": "Jaxson",
                "lastName": "Hayes"
            },
            {
                "teamID": 17,
                "playerID": 1903,
                "firstName": "Dylan",
                "lastName": "Windler"
            },
            {
                "teamID": 17,
                "playerID": 3477,
                "firstName": "Scotty",
                "lastName": "Pippen Jr."
            },
            {
                "teamID": 17,
                "playerID": 3427,
                "firstName": "Max",
                "lastName": "Christie"
            },
            {
                "teamID": 17,
                "playerID": 3525,
                "firstName": "Bryce",
                "lastName": "Hamilton"
            },
            {
                "teamID": 17,
                "playerID": 3986,
                "firstName": "Damion",
                "lastName": "Baugh"
            },
            {
                "teamID": 17,
                "playerID": 3987,
                "firstName": "Colin",
                "lastName": "Castleton"
            },
            {
                "teamID": 17,
                "playerID": 3988,
                "firstName": "Alex",
                "lastName": "Fudge"
            },
            {
                "teamID": 17,
                "playerID": 3989,
                "firstName": "D'Moi",
                "lastName": "Hodge"
            },
            {
                "teamID": 17,
                "playerID": 3990,
                "firstName": "Jalen",
                "lastName": "HoodSchifino"
            },
            {
                "teamID": 17,
                "playerID": 3991,
                "firstName": "Maxwell",
                "lastName": "Lewis"
            },
            {
                "teamID": 17,
                "playerID": 3992,
                "firstName": "Vincent",
                "lastName": "ValerioBodon"
            },
            {
                "teamID": 17,
                "playerID": 4041,
                "firstName": "Harry III",
                "lastName": "Giles"
            },
            {
                "teamID": 17,
                "playerID": 126,
                "firstName": "Anthony",
                "lastName": "Davis"
            },
            {
                "teamID": 17,
                "playerID": 142,
                "firstName": "Spencer",
                "lastName": "Dinwiddie"
            },
            {
                "teamID": 17,
                "playerID": 265,
                "firstName": "LeBron",
                "lastName": "James"
            },
            {
                "teamID": 17,
                "playerID": 2845,
                "firstName": "Austin",
                "lastName": "Reaves"
            },
            {
                "teamID": 17,
                "playerID": 1889,
                "firstName": "Cam",
                "lastName": "Reddish"
            },
            {
                "teamID": 17,
                "playerID": 1036,
                "firstName": "Jarred",
                "lastName": "Vanderbilt"
            },
            {
                "teamID": 17,
                "playerID": 2620,
                "firstName": "Skylar",
                "lastName": "Mays"
            },
            {
                "teamID": 17,
                "playerID": 1862,
                "firstName": "Rui",
                "lastName": "Hachimura"
            }
        ]
    };

    return (
        <Container fluid>
            <div className="App">
                <header>
                    <Navigation />
                </header>
                <main>
                    <Row style={{ background: "#e3e1e1", height: "30vh" }}>
                        <Col xs={3} md={2}>
                            <Image fluid src={teamData.logo} rounded className='mb-2 mt-2 img-border' />
                        </Col>
                        <Col>
                            <ListGroup className="pt-2 team-font-size" style={{ height: '30vh' }}>
                                <ListGroup.Item>{teamData.name}</ListGroup.Item>
                                <ListGroup.Item>Conference: {teamData.conference}</ListGroup.Item>
                                <ListGroup.Item>Division: {teamData.division}</ListGroup.Item>
                                <ListGroup.Item>Location: {teamData.location}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>

                    <Row style={{ background: "#e3e1e1", height: "85vh" }}>
                        <Col>
                            <ListGroup className="team-font-size" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                                {teamData.players.map(player => (
                                    <ListGroup.Item key={player.playerID}>{player.firstName} {player.lastName}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col>
                            <ListGroup className="team-font-size" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                            {teamData.players.map(player => (
                                    <ListGroup.Item key={player.playerID}>{player.firstName} {player.lastName}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </main>
            </div>
        </Container>
    );
};

export default Team;
