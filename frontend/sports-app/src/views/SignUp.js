import React, { useState } from 'react';
import '../CSS/Form.css'; // Make sure this file contains the new styles from the provided CSS
import axios from 'axios';
import swal from 'sweetalert2';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const api = axios.create({
        baseURL: 'http://localhost:5500/api/',
        withCredentials: true,
    });

    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('register', { email, password });
            if (response.status === 200) {
                swal.fire("Awesome", "Welcome aboard!", "success")
                    .then(() => window.location.href = '/dashboard');
            }
        } catch (error) {
            swal.fire("Oops", "Something went wrong, please try again", "error");
        }
    };

    return (
        <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        {/* Implement social sign-up functionality here or remove */}
                    </div>
                    <span>or use your email for registration</span>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={handleEmail} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={handlePassword}
                    />
                    <button>Sign Up</button>
                </form>
            </div>
            {/* Overlay and other elements, adjust as needed */}
        </div>
    );
}

export default SignUp;
