import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref as dbRef, get } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
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
  marginRight: '35%',
  color: '#debf12',
  backgroundColor: 'transparent',
};

function UserProfile() {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const database = getDatabase();
        const profileRef = dbRef(database, `profiles/${userId}`);
        const profileSnapshot = await get(profileRef);

        if (profileSnapshot.exists()) {
          setProfileData(profileSnapshot.val());

          // Fetch user's photo URL from Firebase Storage using dynamic image filename
          const storage = getStorage();
          const imageFilename = profileSnapshot.val().imageFilename; // Retrieve imageFilename
          if (imageFilename) {
            const photoRef = storageRef(storage, imageFilename); // Updated photoRef construction
            const downloadURL = await getDownloadURL(photoRef);
            setPhotoURL(downloadURL);
          } else {
            setPhotoURL(profileSnapshot.val().photoURL || ''); // Use the stored photoURL
          }
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
          <h1 style={titleStyles}>HTH Profiles</h1>
        </header>
      </div>
      <div>
        <div className="profile-card">
          <div className="profile-container">
            <div className="profile-content">
              <div className="profile-details-card">
                <div>
                  <img
                    src={photoURL || '/images/male.png'}
                    alt="Profile"
                    className="profile-pic"
                  />
                  <div className="profile-details">
                    {profileData.name && <p>{profileData.name}</p>}
                    {profileData.email && <p>{profileData.email}</p>}
                    {profileData.location?.city && <p>City: {profileData.location.city}</p>}
                    {profileData.location?.state && <p>State: {profileData.location.state}</p>}
                    {profileData.location?.country && <p>Country: {profileData.location.country}</p>}
                    {profileData.location?.province && <p>Province: {profileData.location.province}</p>}
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
