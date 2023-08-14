import React, { Component } from 'react';
import '../../css/Form.css';

class FormModal extends Component {
  render() {
    const { onClose } = this.props;

    return (
      <div className="form-modal-container">
        <div className="form-modal">
          <div className="form-title">Submit Your Chapter</div>
          <div className="form-group">
            {/* Replace the iframe with the code below */}
            <div className="iframe-container">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfhyRj0wMYYKvPMUHEZXPD2Jnu4f9ntEZIFFWT4xfu8b8nDGw/viewform?embedded=true"
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
              >
                Loading…
              </iframe>
            </div>
          </div>
          <div className="form-buttons">
            <button className="form-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FormModal;