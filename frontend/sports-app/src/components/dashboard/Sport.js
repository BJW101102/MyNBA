import React from 'react';
//import '../CSS/Sports.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';







function Sport() {

    return (
       
            <Col className="mt-2" >
                <Card className= "p-2 pb-0" style={{border:"1px solid black"}}>
                        <Card.Img style={{border:"1px solid black", borderRadius:"10px"}}variant="top" fluid  rounded  src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/lal.png&h=200&w=200"  />
                        <Card.Body > 
                        
                                <Card.Text  className= "m-0">
                                Team data
                                </Card.Text>
                                <Button  className="button" style={{borderRadius:"30px"}}  size="sm">+</Button>
                        
                            
                        </Card.Body>
                        
                        
                </Card>
            </Col>
                    
              
            
        

    );
};

export default Sport;
