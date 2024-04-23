import React, { useState, useEffect } from 'react';
import '../CSS/NBATeams.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import Navigation from '../components/Navigation.js';
import NBATeamCard from '../components/sports-page/NBATeamCard.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NBATeams({ api }) {


    const [nbaTeams, setNBATeams] = useState([]);

    useEffect(() => {
        const fetchFollowedTeams = async () => {
            try {
                const response = await api.get("allteams");
                setNBATeams(response.data);
            } catch (error) {
                console.error('Error fetching followed teams:', error);
            }
        }
        fetchFollowedTeams();
    }, []);

    const splitTeamsIntoRows = () => {
        const rows = [];
        let currentRow = [];
        nbaTeams.forEach((team, index) => {
            currentRow.push(
                <Col key={team.teamID}>
                    <NBATeamCard team={team} api={api} />
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
            <Container fluid className='sports-page-container'>
                <header>
                    <Navigation api={api} />
                </header>
                <main>
                    {splitTeamsIntoRows()}
                </main>
            </Container>
    );
}
export default NBATeams;
