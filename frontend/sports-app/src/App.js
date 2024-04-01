import React from 'react';
import SignUp from './views/SignUp';
import Login from './views/Login';
import AuthForm from './views/AuthForm';
import Dashboard from './views/Dashboard';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // Creating routes for all view's pages
  return (
    <Router>
      <Routes>
        <Route index element={<AuthForm />}/>  
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </Router>

  );
}

export default App;
