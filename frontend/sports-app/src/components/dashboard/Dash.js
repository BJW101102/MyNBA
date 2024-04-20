import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Team from './Team.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';


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
                            <Card.Title>Followed Teams</Card.Title>
                            <Card.Text>
                            <Row>
                                {followedTeams.map(team => (
                                    <ListGroup className="team-font-size" style={{overflowY: 'auto' }}>
                                      <ListGroup.Item style={{backgroundColor: `${team.secondary}`, fontWeight: "bold"}}>{team.code}, {team.division}</ListGroup.Item>
                                  </ListGroup>
                                ))}
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={9} md={10} className='teams' style={{border: "1px solid black" }}>
                <Row>
                    {followedTeams.map(team => (
                        <Col md={6} key={team.teamID}>
                            <Team team={team}></Team>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
        </div >
    );
};

export default Dash;
