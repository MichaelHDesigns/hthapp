import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import logo from '../images/hthlogo.png';
import { useNavigate } from 'react-router-dom';

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
  marginLeft: '35%',
  backgroundColor: 'transparent',
};

const titleStyles = {
  fontSize: '2.5rem',
  marginRight: '0%',
  color: '#debf12',
  backgroundColor: 'transparent',
};

const headStyles = {
  fontSize: '2.5rem',
  marginRight: '40%',
  color: '#debf12',
  backgroundColor: 'transparent',
};

function Dashboard() {
  const [user, setUser] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        history('/login');
      }
    });
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      history('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleGoToProfile = () => {
    history('/profile'); // Change this path to the correct one for your Profile.js route
  };

  return (
    <div style={{ backgroundColor: 'black' }}>
      <div style={headerContainerStyles}>
        <header style={headerStyles} className="App-header">
          <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
          <h1 style={headStyles}>User Home</h1>
        </header>
      </div>
      <br />
      <br />
      <h1 style={titleStyles}>Welcome to your Dashboard</h1>
      <div className="dashboard-container">
        <div className="dashboard-card">
          {user && (
            <div>
              <p>
                Hello,
                <br />
                {user.displayName || user.email}!
                <br />
              </p>
              <button className="profile-button" onClick={handleGoToProfile}>
                Profile
              </button>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Dashboard;
