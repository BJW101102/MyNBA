import React from 'react';
import '../CSS/Sports.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import Navigation from '../components/dashboard/Navigation.js';
import Sport from '../components/dashboard/Sport.js'; 
//import axios from 'axios';


import Row from 'react-bootstrap/Row';



function Sports() {

    return (
        <Container fluid>
            <header >
                <Navigation  ></Navigation>
            </header>
            <main>
            <Row>
                <Sport></Sport>
                <Sport></Sport>
                <Sport></Sport>
                
            </Row>

            <Row>
                <Sport></Sport>
                <Sport></Sport>
                <Sport></Sport>
                
            </Row>
            </main>

        </Container>
        

    );
};

export default Sports;
