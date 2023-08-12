import React from 'react';

const Payment = ({ onClose, selectedDrive }) => {
  return (
    <div className="modal-content">
      {selectedDrive && <h3>Donate to: {selectedDrive.title}</h3>}
      {selectedDrive ? (
        <a
          href={`https://buy.stripe.com/eVa00f4LjbLrfBu5kk?amount=${selectedDrive}`}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          Stripe
        </a>
      ) : (
        <a
          href="https://buy.stripe.com/eVa00f4LjbLrfBu5kk?amount=1000"
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          Stripe
        </a>
      )}
      <br />
      {selectedDrive ? (
        <a
          href={`https://www.paypal.com/paypalme/hthworldwide?amount=${selectedDrive}`}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          PayPal
        </a>
      ) : (
        <a
          href="https://www.paypal.com/paypalme/hthworldwide?amount=1000"
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          PayPal
        </a>
      )}
      <br />
      <br />
      <button className="modal-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Payment;