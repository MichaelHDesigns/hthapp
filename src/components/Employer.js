import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, set, push } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../index';
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
  marginLeft: '25%',
  backgroundColor: 'transparent',
};

const titleStyles = {
  fontSize: '2.5rem',
  marginRight: '28%',
  color: '#debf12',
  backgroundColor: 'transparent',
};

const Employers = () => {
  const [user, setUser] = useState(null);
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [employers, setEmployers] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [newEmployerData, setNewEmployerData] = useState({
    name: '',
    email: '',
  });
  const [newSeminarData, setNewSeminarData] = useState({
    title: '',
    date: '',
    time: '',
    maxAttendees: '',
  });
  const [isCreatingSeminar, setIsCreatingSeminar] = useState(false);
  const [isCreatingEmployer, setIsCreatingEmployer] = useState(false);

  const [seminars, setSeminars] = useState([]);

  const fetchEmployers = async () => {
    try {
      const database = getDatabase();
      const employersRef = ref(database, 'employers');
      const employersSnapshot = await get(employersRef);

      if (employersSnapshot.exists()) {
        const employersData = employersSnapshot.val();
        const employersArray = Object.keys(employersData).map((key) => ({
          id: key,
          ...employersData[key],
        }));

        const filteredEmployers = employersArray.filter(employer => {
          return employer.name !== 'Employer 1' && employer.name !== 'Employer 2';
        });

        setEmployers(filteredEmployers);
      }
    } catch (error) {
      console.error('Error fetching employers:', error);
    }
  };

  const openEmployerDetails = (employer) => {
    setSelectedEmployer(employer);
  };

  const openEmployerCreation = () => {
    setIsCreatingEmployer(true);
  };

  const closeEmployerCreation = () => {
    setIsCreatingEmployer(false);
    setNewEmployerData({ name: '', email: '' }); // Reset input fields
  };

  const createEmployer = async () => {
    try {
      const database = getDatabase();
      const employersRef = ref(database, 'employers');
      const newEmployerRef = push(employersRef);

      const newEmployerId = newEmployerRef.key;

      await set(newEmployerRef, {
        name: newEmployerData.name,
        email: newEmployerData.email,
        seminars: [],
      });

      fetchEmployers();
      setNewEmployerData({ name: '', email: '' }); // Reset input fields
    } catch (error) {
      console.error('Error creating employer:', error);
    }
  };

  const fetchSeminars = async () => {
    try {
      const database = getDatabase();
      const seminarsRef = ref(database, 'seminars');
      const seminarsSnapshot = await get(seminarsRef);

      if (seminarsSnapshot.exists()) {
        const seminarsData = seminarsSnapshot.val();
        const seminarsArray = Object.keys(seminarsData).map((key) => ({
          id: key,
          ...seminarsData[key],
        }));

        setSeminars(seminarsArray);
      }
    } catch (error) {
      console.error('Error fetching seminars:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    fetchEmployers();
    fetchSeminars();

    return () => {
      // Unsubscribe from the onAuthStateChanged listener when component unmounts
      unsubscribe();
    };
  }, []);

  const openSeminarCreation = () => {
    setIsCreatingSeminar(true);
  };

  const closeSeminarCreation = () => {
    setIsCreatingSeminar(false);
  };

  const closeEmployerDetails = () => {
    setSelectedEmployer(null);
  };

  const closeSelectedSeminar = () => {
    setSelectedSeminar(null);
  };

  const submitSeminarCreation = async (event) => {
    event.preventDefault();

    if (!selectedEmployer) {
      console.error("No selected employer");
      return;
    }

    try {
      const database = getDatabase();
      const seminarsRef = ref(database, 'seminars');
      const newSeminarRef = push(seminarsRef);

      const newSeminarId = newSeminarRef.key;

      const selectedEmployerId = selectedEmployer.id;
      const updatedSeminars = selectedEmployer.seminars
        ? [...selectedEmployer.seminars, newSeminarId]
        : [newSeminarId];

      await set(newSeminarRef, {
        employerId: selectedEmployerId,
        title: newSeminarData.title,
        date: newSeminarData.date,
        time: newSeminarData.time,
        maxAttendees: newSeminarData.maxAttendees,
        attendees: [],
      });

      await set(ref(database, `employers/${selectedEmployerId}/seminars`), updatedSeminars);

      fetchEmployers();
      setNewSeminarData({
        title: '',
        date: '',
        time: '',
        maxAttendees: '',
      }); // Reset input fields

      closeSeminarCreation(); // Close the popup after creating seminar
    } catch (error) {
      console.error('Error creating seminar:', error);
    }
  };

  const displaySeminarDetails = (seminarId) => {
    const selectedSeminarData = seminars.find((seminar) => seminar.id === seminarId);
    setSelectedSeminar(selectedSeminarData);
  };

  return (
    <div>
      <div style={headerContainerStyles}>
        <header style={headerStyles} className="App-header">
          <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
          <h1 style={titleStyles}>Job Seminars</h1>
        </header>
      </div>
      <div className="employers-container">
        <div className="content">
          <div className="employer-list">
            <h2>Employer List</h2>
<br />
<br />
            <ul>
              {employers.map((employer) => (
                <li key={employer.id}>
                  <button onClick={() => openEmployerDetails(employer)}>{employer.name}</button>
                </li>
              ))}
            </ul>
          </div>
          {selectedEmployer && (
            <div className="employer-details">
              <h2>{selectedEmployer.name}</h2>
              <h4>{selectedEmployer.email}</h4>
              {selectedEmployer.seminars && (
                <div>
                  <h3>Seminars:</h3>
                  <ul>
                    {selectedEmployer.seminars.map((seminarId) => {
                      const seminarData = seminars.find((seminar) => seminar.id === seminarId);
                      return (
                        <li key={seminarId}>
                          <button
                            style={{ backgroundColor: 'transparent', color: '#debf12' }}
                            onClick={() => displaySeminarDetails(seminarId)}
                          >
                            {seminarData ? seminarData.title : 'Unknown Seminar'}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    onClick={closeEmployerDetails}
                    style={{
                      backgroundColor: 'red',
                      color: 'black',
                      fontWeight: 'bold',
                      display: 'block',
                      margin: '0 auto',
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          )}
          {selectedSeminar && (
            <div className="seminar-card">
              <h3>Selected Seminar Details</h3>
              <p>Title: {selectedSeminar.title}</p>
              <p>Date: {selectedSeminar.date}</p>
              <p>Time: {selectedSeminar.time}</p>
                  <button
                    onClick={closeSelectedSeminar}
                    style={{
                      backgroundColor: 'red',
                      color: 'black',
                      fontWeight: 'bold',
                      display: 'block',
                      margin: '0 auto',
                    }}
                  >
                    Close
                  </button>
            </div>
          )}
<br />
        </div>
        {isCreatingSeminar && (
          <div className="seminar-popup">
            <h2>Create Seminar</h2>
            <form onSubmit={submitSeminarCreation}>
              <label>
                Title:
                <input
                  type="text"
                  value={newSeminarData.title}
                  onChange={(e) => setNewSeminarData({ ...newSeminarData, title: e.target.value })}
                />
              </label>
              <label>
                Date:
                <input
                  type="text"
                  value={newSeminarData.date}
                  onChange={(e) => setNewSeminarData({ ...newSeminarData, date: e.target.value })}
                />
              </label>
              <label>
                Time:
                <input
                  type="text"
                  value={newSeminarData.time}
                  onChange={(e) => setNewSeminarData({ ...newSeminarData, time: e.target.value })}
                />
              </label>
              <label>
                Max Attendees:
                <input
                  type="text"
                  value={newSeminarData.maxAttendees}
                  onChange={(e) =>
                    setNewSeminarData({ ...newSeminarData, maxAttendees: e.target.value })
                  }
                />
              </label>
              <div className="button-group">
                <button type="submit">Create</button>
                <button onClick={closeSeminarCreation}>Cancel</button>
              </div>
            </form>
          </div>
        )}
        {isCreatingEmployer ? (
          <div className="employer-creation">
            <h2>Create Employer</h2>
<br />
            <form onSubmit={createEmployer}>
              <label>
                Name:
                <input
                  type="text"
                  value={newEmployerData.name}
                  onChange={(e) => setNewEmployerData({ ...newEmployerData, name: e.target.value })}
                />
              </label>
              <label>
                Email:
                <input
                  type="text"
                  value={newEmployerData.email}
                  onChange={(e) => setNewEmployerData({ ...newEmployerData, email: e.target.value })}
                />
              </label>
              <button type="submit">Create</button>
<br />
              <button onClick={closeEmployerCreation}>Cancel</button>
            </form>
          </div>
        ) : (
          <div className="creator-button-container">
            <p style={{ marginRight: '20px' }}>User Must be Logged in to Create Employer or Seminar</p>
            {user && (
              <button className="creator-button" onClick={openSeminarCreation}>
                Create Seminar
              </button>
            )}
            {user && (
              <button className="creator-button" onClick={() => setIsCreatingEmployer(true)}>
                Create Employer
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Employers;
