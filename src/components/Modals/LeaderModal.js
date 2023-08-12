import React from 'react';


const LeaderModal = ({ onClose, leader }) => {
  return (
    <div className="modal-content">
      <div className="leader-details">
        <img src={leader.imageUrl} alt={leader.name} className="leader-image" />
        <div className="leader-info">
          <h3>{leader.name}</h3>
          <p>{leader.bio}</p>
        </div>
      </div>
      <button className="modal-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default LeaderModal;