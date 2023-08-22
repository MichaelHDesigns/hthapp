import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import HomelessModal from './Modals/HomelessModal';
import { getDatabase, ref as dbRef, push, set } from 'firebase/database';
import logo from '../images/hthlogo.png';
import { Link } from 'react-router-dom';

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
  marginRight: '28%',
  color: '#debf12',
  backgroundColor: 'transparent',
};

function HomelessReg() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveProfile = async (newProfile) => {
    try {
      const database = getDatabase();
      const homelessProfilesRef = dbRef(database, 'homelessProfiles');
      const newProfileRef = push(homelessProfilesRef);
      await set(newProfileRef, newProfile);
      console.log('New profile saved successfully:', newProfile);
      handleCloseModal();
    } catch (error) {
      console.error('Error saving new profile:', error);
    }
  };

  const resources = [
    {
      name: 'HTH Sponsorship',
      description: 'See a list of individuals who are homeless that need sponsorship',
      url: '/list',
      logo: '/Images/hthlogo.png',
    },
  ];

  return (
    <div style={{ backgroundColor: 'black' }}>
      <div style={headerContainerStyles}>
        <header style={headerStyles} className="App-header">
          <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
          <h1 style={titleStyles}>HTH Assistance</h1>
        </header>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button variant="primary" onClick={handleShowModal}>
          Are You Homeless? Click Here to Fill Out Registration Form for Assistance
        </Button>
        <HomelessModal show={showModal} handleClose={handleCloseModal} handleSave={handleSaveProfile} />
      </div>
      <div className="resource-container">
        <h2>Assistance Resources</h2>
        {resources.map((resource, index) => (
          <div key={index} className="resource-card">
            <div className="resource-card-content">
              <div className="resource-logo-container">
                {resource.logo && <img src={resource.logo} alt={`${resource.name} Logo`} className="resource-logo" />}
              </div>
              <div className="resource-details">
                <h3><Link to={resource.url}>{resource.name}</Link></h3>
                <p>{resource.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <br />
    </div>
  );
}

export default HomelessReg;
