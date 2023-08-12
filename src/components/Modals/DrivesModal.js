import React from 'react';
import Modal from './Modal';

const DrivesModal = ({ isOpen, onClose, drivesData, onDonateToDrive }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-content">
        <h2>Donation Drives</h2>
        {drivesData.map((drive, index) => (
          <div key={index}>
            <h3>{drive.title}</h3>
            <p>{drive.description}</p>
            <button
              className="donate-button"
              onClick={() => onDonateToDrive(drive)}
            >
              Donate
            </button>
          </div>
        ))}
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
    </div>
    </Modal>
  );
};

export default DrivesModal;