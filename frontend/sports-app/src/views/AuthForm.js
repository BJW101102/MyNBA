import React, { useState } from 'react';
import '../CSS/Form.css';
import axios from 'axios';
import swal from 'sweetalert2';

function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle between forms

    const api = axios.create({
        baseURL: 'http://localhost:5500/api/',
        withCredentials: true,
    });

    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const path = isSignUp ? 'register' : 'login';
        try {
            const response = await api.post(path, { email, password });
            if (response.status === 200) {
                const message = isSignUp ? "Welcome aboard!" : "Great to see you again!";
                swal.fire("Awesome", message, "success")
                    .then(() => window.location.href = '/dashboard');
            }
        } catch (error) {
            swal.fire("Oops", "Something went wrong, please try again", "error");
        }
    };

    return (
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
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
            <div className="form-container sign-in-container">
                <form onSubmit={handleSubmit}>
                    <h1>Sign in</h1>
                    <span>or use your account</span>
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
                    <a href="#">Forgot your password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={() => setIsSignUp(false)}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello!</h1>
                        <p>Enter your personal details and start your journey with us</p>
                        <button className="ghost" id="signUp" onClick={() => setIsSignUp(true)}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
