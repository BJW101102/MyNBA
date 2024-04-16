import React from 'react';
import AuthForm from './views/AuthForm';
import Dashboard from './views/Dashboard';
import Sports from './views/Sports';
import Team from './views/Team';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // Creating routes for all view's pages
  return (
    <Router>
      <Routes>
        <Route index element={<AuthForm />}/>  
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/sports" element={<Sports />}/>
        <Route path="/team" element={<Team />}/>
      </Routes>
    </Router>

  );
}

export default App;
