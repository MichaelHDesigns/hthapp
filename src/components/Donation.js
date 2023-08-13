import React, { Component } from 'react';
import Modal from './Modals/Modal';
import CampaignsModal from './Modals/CampaignsModal';
import Donate from './Modals/Donate';
import Payment from './Modals/Payment';
import campaignsData from '../data/campaigns';
import drivesData from '../data/drives';
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
    this.setState({
      campaignsData: campaignsData,
      drivesData: drivesData,
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
  <div className="buttonContainerStyles">
    <div>
      <div style={missionStatementStyles}>
        <p>Donate Today to help the homeless!!</p>
       <button className="donate-button" onClick=        {this.handleOpenModal}>Donate Now</button>
      </div>

    </div>
<br />
    <div>
      <div style={missionStatementStyles}>
        <p>Check out the HTH Campaigns!!</p>
       <button className="campaigns-button" onClick={this.handleOpenSubModal}>Campaign Drives</button>
    </div>
    </div>
    <div>
<br />
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
        />
        {isSubModalOpen && (
          <Modal isOpen={isSubModalOpen} onClose={this.handleCloseSubModal}>
            <div className="modal-content">
              {campaignsData.map((campaign, index) => (
                <div key={index}>
                  <h3>{campaign.title}</h3>
                  <p>{campaign.description}</p>
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
              {drivesData.map((drive, index) => (
                <div key={index}>
                  <h3>{drive.title}</h3>
                  <p>{drive.description}</p>
                  <button
                    className="donate-button"
                    onClick={() => {
                      this.handleDonateToDrive(drive);
                      this.setState({ isModalOpen: true }); // Open the Payment Modal
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