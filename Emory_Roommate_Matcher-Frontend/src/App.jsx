import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Matches from './pages/Matches';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Logo from './Logo.jsx';

// Home Component
function Home() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register'); // Redirect to the Register page
  };

  const handleLoginClick = () => {
    navigate('/login'); // Redirect to the Login page
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleRegisterClick}>Register</button>
      <button onClick={handleLoginClick}>Log In</button>
    </div>
  );
}

// About Component
function About() {
  return <h1>About Page</h1>;
}

// Contact Component
function Contact() {
  return <h1>Contact Page</h1>;
}

// Navbar Component
function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/matches">Matches</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}

// App Component
function App() {
  return (
    <Router>
      <div>
      <Logo />
        <h1>Welcome to Emory Roommate Finder!</h1>
        <p>
  Incoming Freshmen! Need a roommate? You've come to the right place!<br />
  Answer a few questions and we'll pair you up with one person who will be your ideal roommate.
</p>

      <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

