import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Dashboard.css';
import Navbar from '../components/dashboard/NavBar';
import Sidebar from '../components/dashboard/Sidebar';
import UserDisplay from '../components/dashboard/UserDisplay';

function Dashboard() {

    const [username, setUsername] = useState('');

    const api = axios.create({
        baseURL: 'http://localhost:5500/api/',
        withCredentials: true, // Needed for Sessions
    });

    // Fetching for user information (username, userID, etc...)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Sending GET request for user information
                const response = await api.get('userdata');
                console.log(response.data.username);
                setUsername(response.data.username); //Setting the username to the response object's username
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
        <div className='container-fluid' style={{ border: "1px solid black"}}>
            {/*Mock Layout of Dashboard: Colored each different container for better visualization*/}
            <div className='row' style={{ height: "12vh", border: "1px solid black", background: "#d3ead3" }}>
                <Navbar username={username} api={api} /> {/* Component is found in components/dashboard/Navbar.js*/}
            </div>
            <div className='row' style={{ border: "1px solid black" }}>
                <div className='col-xl-2' style={{ border: "1px solid black", background: "#ffd2c5" }}>
                    <Sidebar /> {/* Component is found in components/dashboard/Sidebar.js */}
                </div>
                <div className='col-xl-10' style={{ border: "1px solid black", background: "#fffec5" }}>
                    <UserDisplay /> {/* Component is found in components/dashboard/UserDisplay.js */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
