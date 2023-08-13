import React from 'react';

const ServicesModal = ({ shelter, onClose }) => {
  return (
    <div className="services-modal">
      <div className="services-content">
<br />
        <img src={shelter.image} alt={shelter.name} className="modal-image" style={{ width: '20%', height: 'auto', backgroundColor: 'transparent' }}/>
        <h2>{shelter.name}</h2>
        <p>{shelter.title}</p>
        <p>{shelter.address}</p>
        <p>{shelter.phone}</p>
        <p>{shelter.type}</p>
<br />
        <a 
          href={`https://www.google.com/maps/dir/?api=1&destination=${shelter.lat},${shelter.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'blue', backgroundColor: 'transparent' }}
        >
          Directions
        </a>
<br />
<br />
        <button className="services-close" onClick={onClose}>
          Close
        </button>
<br />
      </div>
    </div>
  );
};

export default ServicesModal;