// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Navbar from './pages/NavBar.js';
import Songs from './pages/Songs.js';
import SongDetails from './pages/SongDetails.js';
import Artists from './pages/Artists.js';
import Artist from './pages/Artist.js';
import MySongs from './pages/MySongs.js';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/songs/:id" element={<SongDetails />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artists/:id" element={<Artist />} />
        <Route path="/mysongs" element={<MySongs/>} />
      </Routes>
    </Router>
  );
}

export default App;