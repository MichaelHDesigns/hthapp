import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, push, ref as dbRef, get, set } from 'firebase/database';
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
  marginLeft: '30%',
  backgroundColor: 'transparent',
};

const titleStyles = {
  fontSize: '2.5rem',
  marginRight: '45%',
  color: '#debf12',
  backgroundColor: 'transparent',
};

function Sponsor() {
  const { homelessId } = useParams();
  const [homelessProfile, setHomelessProfile] = useState(null);
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorEmails, setSponsorEmails] = useState([]);
  const [sponsorNeeds, setSponsorNeeds] = useState([]);

  useEffect(() => {
  const fetchHomelessProfile = async () => {
    try {
      const database = getDatabase();
      const homelessProfilesRef = dbRef(database, `homelessProfiles/${homelessId}`);
      const homelessProfileSnapshot = await get(homelessProfilesRef);

      if (homelessProfileSnapshot.exists()) {
        const initialSponsorInfo = homelessProfileSnapshot.val().sponsorInfo || {
          names: [],
          emails: [],
        };
        
        setHomelessProfile({
          ...homelessProfileSnapshot.val(),
          sponsorInfo: initialSponsorInfo,
        });
      }
    } catch (error) {
      console.error('Error fetching homeless profile:', error);
    }
  };

  fetchHomelessProfile();
}, [homelessId]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!sponsorName || sponsorEmails.length === 0) {
    console.error('Please provide both name and email.');
    return;
  }

  if (sponsorNeeds.length === 0) {
    console.error('Please enter at least one need.');
    return;
  }

  try {
    const database = getDatabase();

    const homelessProfilesRef = ref(database, `homelessProfiles/${homelessId}`);
    await set(homelessProfilesRef, {
      ...homelessProfile,
      sponsor: true,
      sponsorInfo: {
        names: [...homelessProfile.sponsorInfo.names, sponsorName],
        emails: [...homelessProfile.sponsorInfo.emails, ...sponsorEmails],
      },
    });

    // ... (rest of the logic)
  } catch (error) {
    console.error('Error saving sponsorship:', error);
    // Handle error scenario here.
  }
};

  if (!homelessProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />
      <div style={headerContainerStyles}>
        <header style={headerStyles} className="App-header">
          <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
          <h1 style={titleStyles}>Sponsor Homeless Individual</h1>
        </header>
      </div>
      <div className="sponsor-container">
        <form onSubmit={handleSubmit} className="sponsor-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={sponsorName} onChange={(e) => setSponsorName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Emails (comma-separated)</label>
            <input
              type="text"
              value={sponsorEmails.join(', ')}
              onChange={(e) => setSponsorEmails(e.target.value.split(',').map(email => email.trim()))}
              required
            />
          </div>
          <div className="form-group">
            <label>Needs</label>
            <input type="text" value={sponsorNeeds} onChange={(e) => setSponsorNeeds(e.target.value.split(','))} required />
          </div>
          <button type="submit">Sponsor</button>
        </form>
      </div>
      <div className="homeless-profile">
        <h2>{homelessProfile.name}</h2>
        <p>{homelessProfile.story}</p>
        <p>Location: {homelessProfile.location.city}, {homelessProfile.location.state}, {homelessProfile.location.country}</p>
        <p>Needs: {homelessProfile.needs.join(', ')}</p>
      </div>
      <div className="back-button">
        <Link to="/list">Back to Homeless List</Link>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Sponsor;
