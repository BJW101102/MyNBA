import React from 'react';
import SignUp from './views/SignUp';
import Login from './views/Login';
import HomeScreen from './views/HomeScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/dashboard" element={<HomeScreen />}/>
      </Routes>
    </Router>

  );
}

export default App;
