import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomeScreen() {

    const[username, setUsername] = useState('');
    const api = axios.create({
        baseURL: 'http://localhost:5500/api/',
        withCredentials: true,
      });

    useEffect(() =>{
        const fetchUserData = async () =>{
            try{
                const response = await api.get('userdata');
                console.log(response.data.username);
                setUsername(response.data.username)
            }
            catch(error){
                console.error("Error fetching user data:", error)
            }
        }
    fetchUserData();
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
