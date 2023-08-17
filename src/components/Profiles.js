import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref as dbRef, get, set } from 'firebase/database';
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

function Profile() {
  const auth = getAuth();
  const history = useNavigate();

  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  });
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        history('/login');
      } else {
        setUser(user);
        setDisplayName(user.displayName || '');
        setEmail(user.email || '');

        const database = getDatabase();
        const profileRef = dbRef(database, `profiles/${auth.currentUser.uid}`);
        const profileSnapshot = await get(profileRef);
        const profileExists = profileSnapshot.exists();

        if (profileExists) {
          setProfileData(profileSnapshot.val());
          setIsProfileCreated(true);
        }
      }
    });

    return () => unsubscribe();
  }, [auth, history]);

  const handleSaveProfile = async () => {
    try {
      if (displayName) {
        await updateProfile(auth.currentUser, { displayName });
      }

      const database = getDatabase();
      const profileRef = dbRef(database, `profiles/${auth.currentUser.uid}`);
      await set(profileRef, {
        name: displayName,
        email,
        location: {
          city,
          state,
          country,
          province,
        },
        socialMediaLinks,
      });

      history('/dashboard');
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  const handleCreateProfile = () => {
    setShowCreateForm(true);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleCancelEdit = () => {
    setShowEditProfile(false);
  };

  const handleLogout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      history('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleGoToDashboard = () => {
    history('/dashboard');
  };

  return (
    <div>
        <div style={headerContainerStyles}>
          <header style={headerStyles} className="App-header">
            <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
            <h1 style={titleStyles}>HTH Chapters</h1>
          </header>
        </div>
      <br />
      <div className="profile-card">
        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-details-card">
              {user && profileData && (
                <div>
                  <img
                    src={user.photoURL || '/default-profile-pic.png'}
                    alt="Profile"
                    className="profile-pic"
                  />
                  <div className="profile-details">
                    <p>Hello,</p>
                    <p>{profileData.name || user.email}!</p>
                    <p>Email: {profileData.email || user.email}</p>
                    <p>City: {profileData.location?.city || 'Not provided'}</p>
                    <p>State: {profileData.location?.state || 'Not provided'}</p>
                    <p>Country: {profileData.location?.country || 'Not provided'}</p>
                    <p>Province: {profileData.location?.province || 'Not provided'}</p>
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
              )}
              {!isProfileCreated && !showCreateForm && (
                <button className="create-profile-button" onClick={handleCreateProfile}>
                  Create Profile
                </button>
              )}
              {!showEditProfile && isProfileCreated && (
                <button className="edit-profile-button" onClick={handleEditProfile}>
                  Edit Profile
                </button>
              )}
              <button className="dashboard-button" onClick={handleGoToDashboard}>
                Dashboard
              </button>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
            {(showEditProfile || showCreateForm) && (
              <div className="edit-profile-card">
                <h2>{showEditProfile ? 'Edit Profile' : 'Create Profile'}</h2>
                <div>
                  <label htmlFor="displayName">Name</label>
                  <input
                    type="text"
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="province">Province</label>
                  <input
                    type="text"
                    id="province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </div>
                {Object.entries(socialMediaLinks).map(([platform, link]) => (
                  <div key={platform}>
                    <label htmlFor={`social_${platform}`}>
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </label>
                    <input
                      type="text"
                      id={`social_${platform}`}
                      value={link}
                      onChange={(e) =>
                        setSocialMediaLinks({ ...socialMediaLinks, [platform]: e.target.value })
                      }
                    />
                  </div>
                ))}
                <div>
                  <button className="create-button" onClick={handleSaveProfile}>
                    {showEditProfile ? 'Save Profile' : 'Create Profile'}
                  </button>
                  <button className="cancel-button" onClick={showEditProfile ? handleCancelEdit : handleCancelCreate}>
                    Cancel
                  </button>
                </div>
                <br />
                <br />
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Profile;
