import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react'
import Home from './pages/Home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { useSelector } from "react-redux";
import { Messenger } from './pages/messenger/Messenger';

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />

        <Route path="/profile/:username" element={<Profile />} />

        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/messenger" element= {<Messenger/>} />

      </Routes>
    </Router>
  )
}

export default App;
