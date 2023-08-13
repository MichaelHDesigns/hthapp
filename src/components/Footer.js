import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p style={{ color: '#debf12' }}>
          Help The Homeless Worldwide A NJ Nonprofit Corporation is a fully registered 501(c)(3) Nonprofit Corporation, EIN 83-1698753
        </p>
        <p style={{ color: '#debf12' }}>
          563 Radio Rd Little Egg Harbor, NJ 08087
        </p>
        <p>
          <a style={{ color: '#debf12' }}           href="mailto:hthcoin@gmail.com">hthcoin@gmail.com</a>
        </p>
        <p>
          <a  style={{ color: '#debf12' }} href="tel:+18482216383">1-848-221-6383</a>
        </p>
        <p style={{ color: '#debf12' }}>
          Copyright © 2018-2023 · All Rights Reserved · Help The Homeless Worldwide
        </p>
      </div>
    </footer>
  );
};

export default Footer;