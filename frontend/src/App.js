import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AddMember from './pages/AddMember';
import ViewMembers from './pages/ViewMembers';
import MemberDetails from './pages/MemberDetails';

function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="dino-emoji">🦕</span>
        TEAM DINO
      </Link>
      <div className="navbar-links">
        <Link to="/" style={location.pathname === '/' ? { color: '#39d353' } : {}}>
          Home
        </Link>
        <Link to="/add" style={location.pathname === '/add' ? { color: '#39d353' } : {}}>
          + Add Member
        </Link>
        <Link to="/view" style={location.pathname === '/view' ? { color: '#39d353' } : {}}>
          View Members
        </Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddMember />} />
        <Route path="/view" element={<ViewMembers />} />
        <Route path="/member/:id" element={<MemberDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
