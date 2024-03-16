import React, { useState, useEffect } from 'react';
import '../CSS/Form.css';
import axios from 'axios';
import swal from 'sweetalert2';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const api = axios.create({
        baseURL: 'http://localhost:5500/api/',
        withCredentials: true, //Needed for Sessions
    });

    useEffect(() => {
        // Apply styles to body element
        document.body.style.display = 'flex';
        document.body.style.justifyContent = 'center';
        document.body.style.alignItems = 'center';
        document.body.style.height = '100vh';
        document.body.style.margin = 0;
        document.body.style.backgroundColor = 'rgb(231, 236, 225)';
    }, []);

    // Handler for setting Username
    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    // Handler for setting Password
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    // User Information Submission Handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Sending POST request to login in user
            const response = await api.post('login', { username: username, password: password });
            console.log("Response Status is:");
            // Successful login
            if (response.status === 200) {
                swal.fire({ // Alert for successful login
                    title: "Awesome",
                    text: `Great to see you again, ${username}!`,
                    icon: "success"
                }).then(() => {
                    window.location.href = 'http://localhost:3000/dashboard';
                });
            }
        }
        catch (error) {
        // Unsuccessful login
        swal.fire({
            title: "Oops", // Alert for unsuccessful login
            text: "Seems like we couldn't fetch the info, try again",
            icon: "error"
        })
        console.log("Error:", error.message);
    }
};

// Redirection Handler for SignUp page
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
