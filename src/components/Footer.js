import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          Help The Homeless Worldwide A NJ Nonprofit Corporation is a fully registered 501(c)(3) Nonprofit Corporation, EIN 83-1698753
        </p>
        <p>
          563 Radio Rd Little Egg Harbor, NJ 08087
        </p>
        <p>
          <a style={{ color: 'black' }}           href="mailto:hthcoin@gmail.com">hthcoin@gmail.com</a>
        </p>
        <p>
          <a  style={{ color: 'black' }} href="tel:+18482216383">1-848-221-6383</a>
        </p>
        <p>
          Copyright © 2018-2023 · All Rights Reserved · Help The Homeless Worldwide
        </p>
      </div>
    </footer>
  );
};

export default Footer;