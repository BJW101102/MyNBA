

import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/dashboard/Navigation.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';


function Team() {

    

    return (
        <Container fluid style={{border: "2px solid black"}}> {/* This container is the screen container, there should only be one per page*/}
            <div className="App">
                <header >
                    <Navigation  ></Navigation>
                </header>
                <main>
                <Row style={{background: "#e3e1e1", height: "30vh" }}>
                    <Col xs={3} md={2}>
                        <Image fluid src="https://yt3.googleusercontent.com/cRfRvdqkt8UFmvTerPdkMouNVUxUDxCKvzXw33s3e9Cfw4yaf9TN1UzEQ8FwwFylT9wCm4WN=s900-c-k-c0x00ffffff-no-rj" rounded className='mb-2 mt-2 img-border' />
                    </Col>
                    <Col >
                    <ListGroup className=" pt-2 team-font-size" style={{ height: '30vh' }}>
                            <ListGroup.Item>Basic Team stats </ListGroup.Item>
                            <ListGroup.Item>Basic Team stats </ListGroup.Item>
                            <ListGroup.Item>Basic Team stats </ListGroup.Item>
                            <ListGroup.Item>Basic Team stats </ListGroup.Item>
                           
                        </ListGroup>    
                    </Col>
                </Row>

                <Row style={{background: "#e3e1e1", height: "85vh" }}>
                    <Col >
                        <ListGroup className="team-font-size" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                            <ListGroup.Item>Player Name </ListGroup.Item>
                        </ListGroup>                    
                    </Col>
                    <Col >
                    <ListGroup className="team-font-size" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                            <ListGroup.Item>Game stats </ListGroup.Item>
                        </ListGroup>                    
                    </Col>
                    
                </Row>
                </main>

            </div>
        </Container>

    );
};

export default Team;
