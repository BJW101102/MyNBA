import React from 'react';
import SignUp from './views/SignUp';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // Creating routes for all view's pages
  return (
    <Router>
      <Routes>
        <Route index element={<Login />}/>  
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </Router>

  );
}

export default App;
