import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

function Team({logo}) {
    return (
        <div>
            <Card className="team m-2 p-2" style={{ border: "2px solid white" }} >
            <Card.Title className="team-font-size" style={{ background: "#E3E1E1", border: "2px solid black" }}>Team Name</Card.Title>
                <Card.Body className="d-flex flex-row" style={{ border: "2px solid white", overflowX: "auto" }}>
                    <Row>
                            {/* Logo Container */}
                            <Col>
                                <Card.Body style={{ width: "30vh", border: "2px solid black" }}>
                                    <Card.Img fluid variant="top" style={{ width: "20vh", height: "20vh" }} src={logo} rounded />
                                    <Card.Text className="team-font-size"></Card.Text>
                                </Card.Body>
                            </Col>
                            {/* Team Stats Container */}
                            <Card.Body style={{ width: "43vh", border: "2px solid black" }}>
                                <Card.Title className="team-font-size" style={{ border: "2px solid black" }}>Stats</Card.Title>
                                <div className="text-container" style={{ border: "2px solid black" }}> {/* Container for the text fields*/}
                                    <Card.Text className="team-font-size">Conference: </Card.Text>
                                    <Card.Text className="team-font-size">Standing: </Card.Text>
                                    <Card.Text className="team-font-size">W/L: </Card.Text>
                                </div>
                            </Card.Body>
                    </Row>
                </Card.Body>
                <Row>
                    <Col>
                        <ListGroup className="team-font-size" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default Team;
