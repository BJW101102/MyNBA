import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

function Team() {

return (
    <Card className ="team m-2 p-2">

    <Row className ="  p-1"> 
        <Col className="scrollable m-2">
            <ListGroup className="team-font-size">
            <ListGroup.Item>stat 1</ListGroup.Item>
            <ListGroup.Item>stat 2</ListGroup.Item>
            <ListGroup.Item>stat 3</ListGroup.Item>
            <ListGroup.Item>stat 4</ListGroup.Item>
            <ListGroup.Item>stat 5</ListGroup.Item>
            <ListGroup.Item>stat 6</ListGroup.Item>
            </ListGroup>
        </Col>
        <Col>

            <Card className="m-2">
            

            <Card.Body>
                
            <Card.Img fluid variant="top" src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/99.png" rounded/>

                <Card.Text className="team-font-size">
                example text
                </Card.Text>
                
            </Card.Body>
            </Card>
        </Col>
    </Row>
    </Card>
);
};

export default Team;



