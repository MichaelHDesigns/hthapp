import React from 'react';

function ChaptersModal({ chapter, onClose }) {
  return (
    <div className="chapters-modal">
      <div className="chapters-modal-content">
        <img src={chapter.image} alt={chapter.chapter} />
        <h2>{chapter.chapter}</h2>
        <p>Address: {chapter.address}</p>
        <p>Phone: {chapter.phone}</p>
        <p>Type: {chapter.type}</p>
        <p>Description: {chapter.description}</p>
        <br />
        <span className="chapters-modal-close" onClick={onClose}>
          Close
        </span>
      </div>
      <br />
    </div>
  );
}

export default ChaptersModal;