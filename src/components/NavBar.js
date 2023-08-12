import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from './MenuIcon';

const NavBar = () => {
  return (
    <nav>
      <MenuIcon />
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/chapters">Chapters</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/donate">Donate</Link>
        </li>
        <li>
          <Link to="/resource">Resources</Link>
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