import React from 'react';


const FoundersModal = ({ onClose, founder }) => {
  return (
    <div className="modal-content">
      <div className="founder-details">
        <img src={founder.imageUrl} alt={founder.name} className="leader-image" />
        <div className="founder-info">
          <h3>{founder.name}</h3>
          <p>{founder.bio}</p>
        </div>
      </div>
      <button className="modal-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default FoundersModal;