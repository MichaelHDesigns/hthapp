import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  marginRight: '35%',
  color: '#debf12',
  backgroundColor: 'transparent',
};

function LookUp() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const database = getDatabase();
      const profilesRef = dbRef(database, 'profiles');

      const profilesSnapshot = await get(profilesRef);
      if (profilesSnapshot.exists()) {
        const profilesData = profilesSnapshot.val();

        const filteredUsersArray = Object.keys(profilesData).map(userId => ({
          id: userId,
          name: profilesData[userId].name,
        })).filter(user => user.name !== "John Doe" && user.name !== "Jane Smith");

        setUsers(filteredUsersArray);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  fetchUsers();
}, []);

  return (
    <div>
        <div style={headerContainerStyles}>
          <header style={headerStyles} className="App-header">
            <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
            <h1 style={titleStyles}>HTH Community</h1>
          </header>
        </div>
      <br />
    <div className="container">
      <h2>User Profiles</h2>
      <ul className="user-list">
        {users.map(user => (
          user.name && (
            <li className="user-item" key={user.id}>
              <Link to={`/profile/${user.id}`} className="user-link">
                <div className="user-card">
                  <strong className="user-name">{user.name}</strong>
                </div>
              </Link>
            </li>
          )
        ))}
      </ul>
    </div>
      <br />
      <br />
    </div>
  );
}

export default LookUp;
