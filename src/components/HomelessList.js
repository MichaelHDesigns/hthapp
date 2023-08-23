import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
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

function Homeless() {
  const [homelessProfiles, setHomelessProfiles] = useState(null);

  const fetchHomelessProfiles = async () => {
    try {
      const database = getDatabase();
      const homelessProfilesRef = ref(database, 'homelessProfiles');
      const homelessProfilesSnapshot = await get(homelessProfilesRef);

      if (homelessProfilesSnapshot.exists()) {
        setHomelessProfiles(homelessProfilesSnapshot.val());
      }
    } catch (error) {
      console.error('Error fetching homeless profiles:', error);
    }
  };

  useEffect(() => {
    fetchHomelessProfiles();
  }, []);

  if (!homelessProfiles) {
    return <div>Loading...</div>;
  }

  const filteredProfiles = Object.entries(homelessProfiles).filter(
    ([_, profile]) => profile.name !== 'Homeless Person 1' && profile.name !== 'Homeless Person 2'
  );

  return (
    <div>
      <br />
      <br />
      <div>
        <br />
        <div style={headerContainerStyles}>
          <header style={headerStyles} className="App-header">
            <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
            <h1 style={titleStyles}>Registered Users</h1>
          </header>
        </div>
        <div className="grid-container">
          {filteredProfiles.map(([profileId, profile]) => (
           <div key={profileId} className="homeless-profile-card">
  <div className="homeless-profile-container">
    <div className="homeless-profile-content">
      <div className="homeless-profile-details-card">
        <div>
          <h2>
            {profile.name} 
          </h2>
          <h4>{profile.email}</h4>
            {profile.sponsor ? (
              <span className="is-sponsored">Sponsored</span>
            ) : null}
          {profile.sponsor ? (
            <div className="check-icon-container">
              <i className="fas fa-check-circle check-icon"></i>
            </div>
          ) : null}
          <p>{profile.story}</p>
          <p>
            Location: {profile.location.city}, {profile.location.state}, {profile.location.country}
          </p>
          <p>Needs: {profile.needs.join(', ')}</p>
          <div className="sponsor-button">
            <Link to={`/sponsor/${profileId}`}>Sponsor</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
          ))}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Homeless;