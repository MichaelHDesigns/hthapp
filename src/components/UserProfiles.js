import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref as dbRef, get } from 'firebase/database';
import logo from '../images/hthlogo.png';

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

function UserProfile() {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const database = getDatabase();
        const profileRef = dbRef(database, `profiles/${userId}`);
        const profileSnapshot = await get(profileRef);

        if (profileSnapshot.exists()) {
          setProfileData(profileSnapshot.val());
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />
        <div style={headerContainerStyles}>
          <header style={headerStyles} className="App-header">
            <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
            <h1 style={titleStyles}>HTH Community</h1>
          </header>
        </div>
    <div>
      <div className="profile-card">
        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-details-card">
              <div>
                <img
                  src={profileData.photoURL || '/default-profile-pic.png'}
                  alt="Profile"
                  className="profile-pic"
                />
                <div className="profile-details">
                  <p>Hello,</p>
                  <p>{profileData.name || profileData.email}!</p>
                  <p>Email: {profileData.email || profileData.email}</p>
                  <p>City: {profileData.location?.city || 'Not provided'}</p>
                  <p>State: {profileData.location?.state || 'Not provided'}</p>
                  <p>Country: {profileData.location?.country || 'Not provided'}</p>
                  <p>Province: {profileData.location?.province || 'Not provided'}</p>
                  <p>Social Media Links:</p>
                  <ul className="social-media-icons">
                      {Object.entries(profileData.socialMediaLinks || {}).map(
                        ([platform, link]) =>
                          link && (
                            <li key={platform}>
                              <a href={link} target="_blank" rel="noopener noreferrer">
                                <i className={`fab fa-${platform}`} />
                              </a>
                            </li>
                          )
                      )}
                    </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <br />
      <br />
    </div>
  );
}

export default UserProfile;