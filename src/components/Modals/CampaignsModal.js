import React from 'react';
import Modal from './Modal';

const CampaignsModal = ({ isOpen, onClose, onOpenSubModal }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-content">
        <h2>Donation Drives and Campaigns</h2>
        <button className="button" onClick={onOpenSubModal}>
          Open Donation Drives and Campaigns
        </button>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
    </div>
    </Modal>
  );
};

export default CampaignsModal;