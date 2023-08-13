import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/hthlogo.png';

const donateButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '150px',
  height: '50px',
  fontWeight: 'bold',
  fontSize: '18px',
  backgroundColor: 'blue',
  color: 'white',
  borderRadius: '25px',
  textDecoration: 'none',
  textTransform: 'uppercase',
  boxShadow: '0px 3px 6px #34bcaa, 0px -3px 6px #debf12',
  transition: 'background-color 0.3s, box-shadow 0.3s',
};

const hoverStyles = {
  backgroundColor: 'white',
  color: 'blue',
  boxShadow: '0px 3px 6px #debf12, 0px -3px 6px #34bcaa',
};

const centerContentStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '20vh',
  flexDirection: 'column',
};

const missionStatementStyles = {
  textAlign: 'center',
  fontSize: '25px',
  maxWidth: '800px',
  margin: '0 auto 20px',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  boxShadow: '0px 4px 6px rgba(52, 188, 170, 1.4)',
};

const donateStyles = {
  textAlign: 'center',
  fontSize: '25px',
  maxWidth: '800px',
  margin: '0 auto 20px',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  boxShadow: '0px 4px 6px rgba(52, 188, 170, 1.4)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const headerContainerStyles = {
  position: 'relative',
};

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
};

const logoStyles = {
  width: '100px',
  height: 'auto',
  marginLeft: '30%',
  backgroundColor: 'transparent',
};

const titleStyles = {
  fontSize: '2.5rem',
  marginRight: '30%',
  color: '#debf12',
  backgroundColor: 'transparent',
};

function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={{ backgroundColor: 'black' }}>
      <div style={headerContainerStyles}>
        <header style={headerStyles} className="App-header">
          <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
          <h1 style={titleStyles}>HTH Worldwide</h1>
        </header>
      </div>
      <div style={centerContentStyles} className="App">
        <h2>Hello! We are actively under development!</h2>
      </div>
      <div style={centerContentStyles}>
        <div style={missionStatementStyles}>
          Help The Homeless Worldwide fully believes in their journey and knows with the help
          of blockchain, they can achieve their goal
          of helping the homeless worldwide.
        </div>
        <div style={donateStyles}>
          Without the help from others, the homeless population will continue to grow leaving many people with nothing. This is not how life is supposed to be, we are here together. Help The Homeless Worldwide asks that you donate today
          <br />
          <br />
          <Link
            to="/donate"
            style={{
              ...donateButtonStyles,
              ...(isHovered ? hoverStyles : {}),
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Donate Now
          </Link>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Home;