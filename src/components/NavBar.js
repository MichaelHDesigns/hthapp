import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from './MenuIcon';

const NavBar = () => {
  return (
    <nav style={{ backgroundColor: 'black' }}>
      <MenuIcon />
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <div className="dropdown">
            <span className="dropbtn">HTH World</span>
            <div className="dropdown-content">
              <Link to="/chapters">HTH Chapters</Link>
              <Link to="/donate">Donate</Link>
            </div>
          </div>
        </li>
        <li>
          <div className="dropdown">
            <span className="dropbtn">Services</span>
            <div className="dropdown-content">
              <Link to="/services">HTH Locator</Link>
              <Link to="/resources">Resources</Link>
            </div>
          </div>
        </li>
        <li>
          <div className="dropdown">
            <span className="dropbtn">About</span>
            <div className="dropdown-content">
              <Link to="/about">HTH Board of Directors</Link>
              <Link to="/mission">Mission Statement</Link>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;