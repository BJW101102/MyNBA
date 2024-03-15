import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomeScreen() {


    const[username, setUsername] = useState('');
    
    const api = axios.create({
        baseURL: 'http://localhost:5500/api/',
        withCredentials: true, // Needed for Sessions
      });

    // Fetching for user information (username, userID, etc...)
    useEffect(() =>{
        const fetchUserData = async () =>{
            try{
                // Sending GET request for user information
                const response = await api.get('userdata');
                console.log(response.data.username);
                setUsername(response.data.username); //Setting the username to the response object's username
            }
            catch(error){
                console.error("Error fetching user data:", error)
            }
        }
    fetchUserData(); 
    //NOTE: Comment line below is needed to avoid tedious warning line from appearing when running the application. DO NOT REMOVE!
    // eslint-disable-next-line
    },[]);

    return (
        <div>
            <div className="header-container">
                <h1>Welcome, {username}</h1>
            </div>
            <p>Having problems with the CSS :(</p>
        </div>

    );
};

export default HomeScreen;
