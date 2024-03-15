import React, { useState } from 'react';
import '../CSS/SignUp.css';
import axios from 'axios';


function SignUp() {
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

  return (
    <div>
      <div className='header-container'>
        <h1 style={{fontSize: "10vh"}}>Sign Up Page</h1>
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
