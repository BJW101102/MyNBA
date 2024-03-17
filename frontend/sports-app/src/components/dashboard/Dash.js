import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Team from './Team.js';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

function Dash() {

return (
    <Container fluid>
    <Row >
      <Col xs={3} md = {2}className=' mw-100 side-bar '>
        <Image fluid src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/99.png" rounded className='mb-2 mt-2 img-border'/>
        <Card >
            <Card.Body>
                <Card.Title>Mike</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">the Tiger</Card.Subtitle>
                <Card.Text>
                    blahdjwefbkj sdnvm dndnddndndndnw  blahdjwefbkj sdnvm dndnddndndndnw blahdjw
                </Card.Text>
                
            </Card.Body>
        </Card>
      </Col>

      <Col xs={9} md = {10} className='teams'>
        <Row>
          <Col md={6}>
            <Team></Team>
          </Col>
          <Col md={6}>
            <Team></Team>
          </Col>
        </Row>
      </Col>
      
    </Row>

  </Container>
);
};

export default Dash;


