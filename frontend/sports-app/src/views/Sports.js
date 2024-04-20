import React, { useState, useEffect } from 'react';
import '../CSS/Sports.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import Navigation from '../components/dashboard/Navigation.js';
import Sport from '../components/dashboard/Sport.js';
import axios from 'axios'; // Import Axios library

import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';

function Sports() {

    const api = axios.create({
        baseURL: 'http://localhost:5500/api/',
        withCredentials: true, // Needed for Sessions
    });

    const [nbaTeams, setNBATeams] = useState([]);

    useEffect(() => {
        const fetchFollowedTeams = async () => {
            try {
                const response = await api.get("allteams");
                setNBATeams(response.data);
            } catch (error) {
                console.error('Error fetching followed teams:', error);
            }
        };

        fetchFollowedTeams();
    }, []);


    // const [followedTeams, setFollowedTeams] = useState([]); // State to hold followed teams

    // useEffect(() => {
    //     const fetchFollowedTeams = async () => {
    //         try {
    //             const response = await axios.get('/api/followed-teams'); // Fetch followed teams
    //             setFollowedTeams(response.data); // Update state with fetched teams
    //         } catch (error) {
    //             console.error('Error fetching followed teams:', error);
    //         }
    //     };

    //     fetchFollowedTeams(); // Call the fetch function when the component mounts
    // }, []); // Empty dependency array ensures the effect runs only once


    const splitTeamsIntoRows = () => {
        const rows = [];
        let currentRow = [];
        nbaTeams.forEach((team, index) => {
            currentRow.push(
                <Col key={team.teamID}>
                    <Sport team={team} />
                </Col>
            );
            if ((index + 1) % 3 === 0 || index === team.length - 1) {
                rows.push(
                    <Row key={index}>
                        {currentRow}
                    </Row>
                );
                currentRow = [];
            }
        });
        return rows;
    };

    return (
        <Container fluid style={{ backgroundColor: '#474C50' }}>
            <header>
                <Navigation />
            </header>
            <main>
                {splitTeamsIntoRows()}
            </main>
        </Container>
    );
}

export default Sports;
