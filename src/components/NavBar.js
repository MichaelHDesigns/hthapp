import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from './MenuIcon';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const NavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav style={{ backgroundColor: 'black' }}>
      <MenuIcon />
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <div className="dropdown">
            <span className="dropbtn">HTH</span>
            <div className="dropdown-content">
              <Link to="/chapters">Chapters</Link>
              <Link to="/donate">Donate</Link>
              {user ? (
                <Link to="/dashboard">Dashboard</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
          </div>
        </li>
        <li>
          <div className="dropdown">
            <span className="dropbtn">Services</span>
            <div className="dropdown-content">
              <Link to="/services">HTH Locator</Link>
              <Link to="/resource">HTH Resources</Link>
              <Link to="/assist">HTH Assistance</Link>
              <Link to="/lookup">HTH Profiles</Link>
            </div>
          </div>
        </li>
        <li>
          <div className="dropdown">
            <span className="dropbtn">About</span>
            <div className="dropdown-content">
              <Link to="/about">HTH Directors</Link>
              <Link to="/mission">Mission Statement</Link>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;