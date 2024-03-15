import React, { useState } from 'react';
import '../CSS/Login.css';
import axios from 'axios';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const url = 'http://localhost:5500/api/register'

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(url, { username: username, password: password });
            console.log("Response:", response);
        }
        catch (error) {
            console.log("Error:", error.message);
        }
    };

    const handleRedirect = (event) => {
        window.location.href = 'http://localhost:3000/signup';
    }

    return (
        <div>
            <div className='header-container'>
                <h1 style={{ fontSize: "12vh" }}>Login Page</h1>
            </div>
            <div className='form-container'>
                <form>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsername}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePassword}
                        />
                    </div>
                </form>
                <div className='button-container'>
                    <button id="submit" type="submit" onClick={handleSubmit}>Submit</button>
                    <button onClick={handleRedirect}>New User?</button>
                </div>
                <p>
                    Display_Username: {username}
                    <br></br>
                    Display_Password: {password}
                </p>
            </div>
        </div>
    );
};

export default Login;
