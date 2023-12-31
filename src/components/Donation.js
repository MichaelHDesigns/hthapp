import React, { Component } from 'react';
import { getDatabase, ref, get, set, push } from 'firebase/database';
import Modal from './Modals/Modal';
import CampaignsModal from './Modals/CampaignsModal';
import Donate from './Modals/Donate';
import Payment from './Modals/Payment';
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

const buttonContainerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '20px',
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
  marginRight: '30%',
  color: '#debf12',
  backgroundColor: 'transparent',
};

class Donation extends Component {
  state = {
    isModalOpen: false,
    isCampaignsModalOpen: false,
    isDrivesModalOpen: false,
    isSubModalOpen: false,
    campaignsData: [],
    drivesData: [],
    selectedDrive: null,
    isPaymentModalOpen: false,
    isDonateModalOpen: false,
  };

  componentDidMount() {
    const db = getDatabase();

    // Fetch campaigns data
    const campaignsRef = ref(db, 'campaigns');
    get(campaignsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const campaigns = snapshot.val();
        this.setState({
          campaignsData: Object.values(campaigns),
        });
      }
    });

    // Fetch drives data
    const drivesRef = ref(db, 'drives');
    get(drivesRef).then((snapshot) => {
      if (snapshot.exists()) {
        const drives = snapshot.val();
        this.setState({
          drivesData: Object.values(drives),
        });
      }
    });
  }

  handleOpenSubModal = () => {
    this.setState({ isSubModalOpen: true });
  };

  handleCloseSubModal = () => {
    this.setState({ isSubModalOpen: false });
  };

  handleOpenDonationDrivesModal = () => {
    this.setState({ isDrivesModalOpen: true });
  };

  handleOpenModal = () => {
    this.setState({ isDonateModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false, isPaymentModalOpen: false, isDonateModalOpen: false });
  };

  handleOpenDrivesModal = () => {
    this.setState({ isDrivesModalOpen: true });
  };

  handleCloseDrivesModal = () => {
    this.setState({ isDrivesModalOpen: false });
  };

  handleOpenCampaignsModal = () => {
    this.setState({ isCampaignsModalOpen: true });
  };

  handleCloseCampaignsModal = () => {
    this.setState({ isCampaignsModalOpen: false });
  };

  handleDonateToDrive = (drive) => {
    this.setState({ selectedDrive: drive, isModalOpen: true, isSubModalOpen: false, isDonateModalOpen: true });
  };


  render() {
    const {
      isModalOpen,
      isCampaignsModalOpen,
      isDrivesModalOpen,
      isSubModalOpen,
      campaignsData,
      drivesData,
      selectedDrive,
      isPaymentModalOpen,
      isDonateModalOpen,
    } = this.state;

    const filteredCampaigns = campaignsData.filter(campaign => {
      return campaign.title !== 'Campaign 1' && campaign.title !== 'Campaign 2';
    });

    const filteredDrives = drivesData.filter(drive => {
      return drive.title !== 'Drive 1' && drive.title !== 'Drive 2';
    });

    return (
      <div style={{ backgroundColor: 'black' }}>
        <div style={headerContainerStyles}>
          <header style={headerStyles} className="App-header">
            <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
            <h1 style={titleStyles}>HTH Donations</h1>
          </header>
        </div>
        <br />
        <br />
        <br />
        <div className="card-container">
          <div>
            <div className="donation-info">
              <h2>Donate Today</h2>
              <div style={centerContentStyles}>
                <div style={missionStatementStyles}>
                  Help The Homeless Worldwide fully believes in their journey and knows with the help
                  of blockchain, they can achieve their goal
                  of helping the homeless worldwide.
                </div>
              </div>
              <div className="donation-form" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '20vh', flexDirection: 'column' }}>
                <br />
                <br />
                <div className="buttonContainerStyles">
                  <div className="donate-card">
                    <div style={missionStatementStyles}>
                      <p>Donate Today to help the homeless!!</p>
                      <button className="donate-button" onClick={this.handleOpenModal}>Donate Now</button>
                    </div>
                  </div>
                  <br />
                  <div className="donate-card">
                    <div style={missionStatementStyles}>
                      <p>Check out the HTH Campaigns!!</p>
                                    <button className="campaigns-button" onClick={this.handleOpenSubModal}>
                Campaign Drives
              </button>
                    </div>
                  </div>
                  <br />
                  <div className="donate-card">
                    <div style={missionStatementStyles}>
                      <p>Check out the HTH Donation Drives!!</p>
                      <button className="button" onClick={this.handleOpenDrivesModal}>Donation Drives</button>
                    </div>
                  </div>
                </div>
                <br />
              </div>
              {isDonateModalOpen && (
                <Modal isOpen={isDonateModalOpen} onClose={this.handleCloseModal}>
                  <Donate onClose={this.handleCloseModal} />
                </Modal>
              )}
            </div>
          </div>
        </div>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={this.handleCloseModal}>
            <Payment onClose={this.handleCloseModal} selectedDrive={selectedDrive} />
          </Modal>
        )}
        <CampaignsModal
          isOpen={isCampaignsModalOpen}
          onClose={this.handleCloseCampaignsModal}
          onOpenSubModal={this.handleOpenSubModal}
          campaignsData={campaignsData}
        />
        {isSubModalOpen && (
          <Modal isOpen={isSubModalOpen} onClose={this.handleCloseSubModal}>
            <div className="modal-content">
              {filteredCampaigns.map((campaign, index) => (
                <div key={index}>
                  <h3>{campaign.title}</h3>
                  <p>{campaign.description}</p>
                  <p style={{ fontWeight: 'bold' }}>
                    Progress: {campaign.currentDonations} / {campaign.goal}
                    <progress
                      value={campaign.currentDonations}
                      max={campaign.goal}
                      style={{ width: '100%', height: '20px', backgroundColor: '#debf12', borderRadius: '5px' }}
                    ></progress>
                  </p>
                  <button
                    className="donate-button"
                    onClick={() => this.handleDonateToDrive(campaign)}
                  >
                    Donate
                  </button>
                </div>
              ))}
              <br />
              <br />
              <button className="modal-close" onClick={this.handleCloseSubModal}>
                Close
              </button>
            </div>
          </Modal>
        )}
         {isDrivesModalOpen && (
          <Modal isOpen={isDrivesModalOpen} onClose={this.handleCloseDrivesModal}>
            <div className="modal-content">
              {filteredDrives.map((drive, index) => (
                <div key={index}>
                  <h3>{drive.title}</h3>
                  <p>{drive.description}</p>
                  <p style={{ fontWeight: 'bold' }}>
                    Progress: {drive.currentDonations} / {drive.goal}
                    <progress
                      value={drive.currentDonations}
                      max={drive.goal}
                      style={{ width: '100%', height: '20px', backgroundColor: '#debf12', borderRadius: '5px' }}
                    ></progress>
                  </p>
                  <button
                    className="donate-button"
                    onClick={() => {
                      this.handleDonateToDrive(drive);
                      this.setState({ isModalOpen: true });
                    }}
                  >
                    Donate
                  </button>
                </div>
              ))}
              <br />
              <br />
              <button className="modal-close" onClick={this.handleCloseDrivesModal}>
                Close
              </button>
            </div>
          </Modal>
        )}
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={this.handleCloseModal}>
            <Payment onClose={this.handleCloseModal} selectedDrive={selectedDrive} />
          </Modal>
        )}
        <br />
        <br />
      </div>
    );
  }
}

export default Donation;