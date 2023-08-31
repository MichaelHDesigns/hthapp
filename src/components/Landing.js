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

const joinButtonStyles = {
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

const jobButtonStyles = {
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

const centerContentStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '20vh',
  flexDirection: 'column',
};

const centerGridStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '10px',
  justifyContent: 'center',
  alignItems: 'stretch',
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

const joinStyles = {
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

const jobStyles = {
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
  marginLeft: '25%',
  backgroundColor: 'transparent',
};

const titleStyles = {
  fontSize: '2.5rem',
  marginRight: '40%',
  color: '#debf12',
  backgroundColor: 'transparent',
};

function Home() {
  return (
    <div style={{ backgroundColor: 'black' }}>
      <div style={headerContainerStyles}>
        <header style={headerStyles} className="App-header">
          <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
          <h1 style={titleStyles}>Welcome to HTH World</h1>
        </header>
      </div>
      <div style={centerContentStyles} className="App">
        <h2>Hello! We are actively under development!</h2>
      </div>
      <div style={centerContentStyles}>
        <div style={missionStatementStyles}>
          It is a part of human nature to look out for one another, but in some cases, help is not readily available and sometimes there is not enough help. <strong style={{ color: '#34bcaa' }}>HTH</strong><strong style={{ color: '#debf12' }}> Worldwide</strong> fully believes in their journey and know they can achieve their goal of helping the homeless worldwide.
        </div>
      </div>
      <div style={centerGridStyles}>
        <div style={donateStyles}>
          <strong>Donate Today </strong>Without the help from others, the homeless population will continue to grow leaving many people with nothing. This is not how life is supposed to be, we are here together. HTH asks that you donate today
          <br />
          <br />
          <Link to="/donate" style={donateButtonStyles}>
            Donate Now
          </Link>
        </div>
        <div style={joinStyles}>
          <strong>Sponsor the Homeless</strong> initiative, inviting individuals to join our compassionate community. By sponsoring a homeless individual, you provide essential resources, foster belonging, and empower lasting change. Together, we create hope.
          <br />
          <br />
          <Link to="/assist" style={joinButtonStyles}>
            Join Today
          </Link>
        </div>
        <div style={jobStyles}>
          <strong>Job Seminars </strong>HTH conducts vital job seminars led by community employers, aimed at curbing the rising homeless population and offering individuals a chance to rebuild. Your support and participation today make a substantial difference.
          <br />
          <br />
          <Link to="/employ" style={jobButtonStyles}>
            Seminars
          </Link>
        </div>
        <div style={jobStyles}>
          <strong>HTH Partners </strong>HTH is dedicated to assisting individuals in locating vital resources such as food, shelters, and HTH Chapters. By offering guidance and access to these essential services. Click Below to use the HTH Locator to find a service near you.
          <br />
          <br />
          <Link to="/services" style={jobButtonStyles}>
            Locator
          </Link>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Home;