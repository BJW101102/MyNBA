import React, { useState } from 'react';
import '../CSS/Form.css';
import axios from 'axios';
import swal from 'sweetalert2';


function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const api = axios.create({
    baseURL: 'http://localhost:5500/api/',
    withCredentials: true, // Needed for Sessions
  });

  // Handler for setting Username
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  // Handler for setting Password
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
    
// User Registration Submission Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Sending POST request to insert new user into database
      const response = await api.post('register', { username: username, password: password });
      // Successful Creation
      if (response.status === 200) {
        swal.fire({
          title: "Awesome", // Alert for successful login
          text: `Great to have you, ${username}!`,
          icon: "success"
        }).then(() => {
          window.location.href = 'http://localhost:3000/dashboard'; // Redirecting to dashboard 
        });
      }
      console.log("Response:", response);
    }
    // Unsuccessful Creation
    catch (error) {
      swal.fire({
        title: "Oops", // Alert for unsuccessful login
        text: `The username ${username} has been taken, try a new one!`,
        icon: "error"
      })
      console.log("Error:", error.message);
    }
  };

  return (
    <div>
      <div className='header-container'>
        <h1 style={{ fontSize: "10vh" }}>Sign Up Page</h1>
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
          <button type="submit">Submit</button>
        </form>
        <p>
          Display_Username: {username}
          <br></br>
          Display_Password: {password}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
