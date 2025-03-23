import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Matches from './pages/Matches';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Logo from './Logo'; // ✅ Updated logo
import './App.css';
import { FaHome, FaHeart, FaUser } from 'react-icons/fa';

// Home page content
function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
        <button className="button" onClick={() => navigate('/register')}>Register</button>
        <button className="button" onClick={() => navigate('/login')}>Log In</button>
      </div>
    </div>
  );
}

// Navigation bar
function Navbar() {
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li>
          <button className="button" onClick={() => navigate('/')}>
            <FaHome /> Home
          </button>
        </li>
        <li>
          <button className="button" onClick={() => navigate('/matches')}>
            <FaHeart /> Matches
          </button>
        </li>
        <li>
          <button className="button" onClick={() => navigate('/profile')}>
            <FaUser /> Profile
          </button>
        </li>
      </ul>
    </nav>
  );
}

// App layout
function App() {
  return (
    <Router>
      <div className="center-everything">
        <Logo /> {/* ✅ Clickable logo at top */}
        <Navbar />
        <h1>Welcome to Emory Roommate Finder!</h1>
        <p>
          Need a roommate? You’ve come to the right place! <br />
          Answer a few questions and we’ll pair you up with one person who will be your ideal roommate.
        </p>

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
