import React from 'react';
import AuthForm from './views/AuthForm';
import Dashboard from './views/Dashboard';
import NBATeams from './views/NBATeams';
import SingleTeam from './views/SingleTeam';

import axios from 'axios'; // Import Axios library


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const api = axios.create({
    baseURL: 'http://localhost:5500/api/',
    withCredentials: true, // Needed for Sessions
  });

  return (
    <Router>
      <Routes>
        <Route index element={<AuthForm api={api} />} />
        <Route path="/dashboard" element={<Dashboard api={api} />} />
        <Route path="/sports" element={<NBATeams api={api} />} />
        <Route path="/NBA/team/:teamID/:teamCode/:season" element={<SingleTeam api={api} />} />
      </Routes>
    </Router>

  );
}

export default App;
