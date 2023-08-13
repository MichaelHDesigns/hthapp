import React, { Component } from 'react';
import Modal from './Modals/Modal';
import foundersData from '../data/founders';
import FoundersModal from './Modals/FoundersModal';
import LeaderModal from './Modals/LeaderModal';
import leadersData from '../data/leaders';
import logo from '../images/hthlogo.png';

const centerContentStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '20vh',
  flexDirection: 'column',
};

const missionStatementStyles = {
  textAlign: 'center',
  fontSize: '25px',
  maxWidth: '800px',
  margin: '0 auto 20px',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 1.4)',
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
  marginLeft: '30%',
  backgroundColor: 'transparent',
};

const titleStyles = {
  fontSize: '2.5rem',
  marginRight: '40%',
  color: '#debf12',
  backgroundColor: 'transparent',
};

class About extends Component {
  state = {
    isLeaderModalOpen: false,
    leadersData: [],
    selectedLeader: null,
    isFounderModalOpen: false,
    foundersData: [],
    selectedFounder: null,
  };

  componentDidMount() {
    this.setState({
      leadersData: leadersData,
      foundersData: foundersData,
    });
  }

  handleOpenFounderModal = (founder) => {
    this.setState({ selectedFounder: founder, isFounderModalOpen: true });
  };

  handleCloseFounderModal = () => {
    this.setState({ isFounderModalOpen: false });
  };

  handleOpenLeaderModal = (leader) => {
    this.setState({ selectedLeader: leader, isLeaderModalOpen: true });
  };

  handleCloseLeaderModal = () => {
    this.setState({ isLeaderModalOpen: false });
  };

  render() {
    const { isFounderModalOpen, foundersData, selectedFounder, isLeaderModalOpen, leadersData, selectedLeader } = this.state;

    return (
      <div style={{ backgroundColor: 'black' }}>
      <div style={headerContainerStyles}>
        <header style={headerStyles} className="App-header">
          <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
          <h1 style={titleStyles}>About HTH</h1>
        </header>
      </div>
        <br />
        <br />
        <br />
        <div className="card-container">
          <br />
          <div className="about-container">
            <div className="about-info">
              <h2>HTH Board of Directors</h2>
              <div style={centerContentStyles}>
                <div style={missionStatementStyles}>
                  Learn more about the dedicated leaders behind our organization.
                </div>
              </div>
              <div className="leaders-container">
                {leadersData.map((leader, index) => (
                  <div key={index} className="leader-card" style={{ textAlign: 'center' }}>
                    <img
                      src={leader.imageUrl}
                      alt={leader.name}
                      className="leader-image-card"
                    />
                    <h3>{leader.name}</h3>
                    <p>{leader.position}</p>
                    <button
                      className="learn-more-button"
                      onClick={() => this.handleOpenLeaderModal(leader)}
                    >
                      Bio
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="about-container">
            <div className="about-info">
              <h2>HTH Founders</h2>
              <div style={centerContentStyles}>
                <div style={missionStatementStyles}>
                  Learn more about the founders who started our organization.
                </div>
              </div>
              <div className="founders-container">
                {foundersData.map((founder, index) => (
                  <div key={index} className="founder-card" style={{ textAlign: 'center', margin: '10px auto' }}>
                    <img
                      src={founder.imageUrl}
                      alt={founder.name}
                      className="founder-image-card"
                    />
                    <h3>{founder.name}</h3>
                    <p>{founder.position}</p>
                    <button
                      className="learn-more-button"
                      onClick={() => this.handleOpenFounderModal(founder)}
                    >
                      Bio
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
        {isLeaderModalOpen && (
          <Modal isOpen={isLeaderModalOpen} onClose={this.handleCloseLeaderModal}>
            <LeaderModal
              onClose={this.handleCloseLeaderModal}
              leader={selectedLeader}
            />
          </Modal>
        )}
        {isFounderModalOpen && (
          <Modal isOpen={isFounderModalOpen} onClose={this.handleCloseFounderModal}>
            <FoundersModal
              onClose={this.handleCloseFounderModal}
              founder={selectedFounder}
            />
          </Modal>
        )}
        <br />
        <br />
      </div>
    );
  }
}

export default About;