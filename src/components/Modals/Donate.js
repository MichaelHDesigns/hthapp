import React from 'react';

const missionStatementStyles = {
  textAlign: 'center',
  fontSize: '25px',
  maxWidth: '800px',
  margin: '0 auto 20px',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
};

const Donate = ({ onClose }) => {
  return (
    <div className="modal-content">
      <h3>Donate Now</h3>
      <a
        href={`https://buy.stripe.com/eVa00f4LjbLrfBu5kk`}
        target="_blank"
        rel="noopener noreferrer"
        className="donate-button"
      >
        Stripe
      </a>
<br />
      <a
        href={`https://www.paypal.com/paypalme/hthworldwide`}
        target="_blank"
        rel="noopener noreferrer"
        className="donate-button"
      >
        PayPal
      </a>
<br />
<br />
      <button className="modal-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Donate;