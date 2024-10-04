import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Movie</Link>
      </div>
      <div className="navbar-buttons">
        <Link to="/login">Login</Link>
        <Link to="/join">Join</Link>
      </div>
    </nav>
  );
}

export default NavBar;
