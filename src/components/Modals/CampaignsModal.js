import React from 'react';
import Modal from './Modal';

const CampaignsModal = ({ isOpen, onClose, onOpenSubModal, campaignsData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-content">
        <h2>Donation Drives and Campaigns</h2>
        <button className="button" onClick={onOpenSubModal}>
          Open Donation Drives and Campaigns
        </button>
        <div className="campaigns-list">
          {campaignsData.map((campaign, index) => (
            <div key={index}>
              <h3>{campaign.title}</h3>
              <p>{campaign.description}</p>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${(campaign.currentDonations / campaign.goal) * 100}%`,
                    backgroundColor: '#debf12',
                  }}
                ></div>
              </div>
              <p>
                Progress: {((campaign.currentDonations / campaign.goal) * 100).toFixed(2)}%
              </p>
              <button
                className="donate-button"
                onClick={() => this.handleDonateToDrive(campaign)}
              >
                Donate
              </button>
            </div>
          ))}
        </div>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CampaignsModal;