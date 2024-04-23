import React, { useState, useEffect } from 'react';
import '../CSS/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/Navigation.js';
import Dash from '../components/dashboard-page/Dash.js'; //frontend/sports-app/src/components/dashboard/Dash.js
import axios from 'axios';
import Container from 'react-bootstrap/Container';


function Dashboard({api}) {

    const [username, setUsername] = useState('');
    const [userID, setUserID] = useState('');

    // Fetching for user information (username, userID, etc...)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Sending GET request for user information
                const response = await api.get('userdata');
                console.log(response.data.username);
                setUsername(response.data.username); //Setting the username to the response object's username
                setUserID(response.data.userID);
            }
            catch (error) {
                console.error("Error fetching user data:", error)
            }
        }
        fetchUserData();
        //NOTE: Comment line below is needed to avoid tedious warning line from appearing when running the application. DO NOT REMOVE!
        // eslint-disable-next-line
    }, []);

    return (
        <Container fluid > {/* This container is the screen container, there should only be one per page*/}
            <div className="App">
                <header >
                    <Navigation username={username} userID={userID} api={api} ></Navigation>
                </header>
                <main>
                    <Dash username={username} userID={userID} api={api}></Dash>
                </main>
            </div>
        </Container>

    );
};

export default Dashboard;
