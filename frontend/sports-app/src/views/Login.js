import React, { useState } from 'react';
import '../CSS/Form.css';
import axios from 'axios';
import swal from 'sweetalert2';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const api = axios.create({
        baseURL: 'http://localhost:5500/api/',
        withCredentials: true,
    });

    const handleUsername = (event) => setUsername(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('login', { username, password });
            if (response.status === 200) {
                swal.fire("Awesome", `Great to see you again, ${username}!`, "success")
                    .then(() => window.location.href = '/dashboard');
            }
        } catch (error) {
            swal.fire("Oops", "Seems like we couldn't fetch the info, try again", "error");
        }
    };

    const handleRedirect = () => window.location.href = '/signup';

    return (
        <div className="page-container">
            <div className='header-container'>
                <h1>Welcome!</h1> {/* Updated text */}
            </div>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
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
                    <button id="submit" type="submit">Submit</button>
                    <button type="button" onClick={handleRedirect}>New User?</button>
                </form>
                <p>Display_Username: {username}<br />Display_Password: {password}</p>
            </div>
        </div>
    );
}

export default Login;
