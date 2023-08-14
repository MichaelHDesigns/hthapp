import React, { Component } from 'react';
import ChaptersModal from './Modals/ChaptersModal';
import FormModal from './Modals/FormModal';
import chaptersData from '../data/chapters';
import logo from '../images/hthlogo.png';

const headerContainerStyles = {
  position: 'relative',
};

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
};

const logoStyles = {
  width: '100px',
  height: 'auto',
  marginLeft: '30%',
  backgroundColor: 'transparent',
};

const titleStyles = {
  fontSize: '2.5rem',
  marginRight: '30%',
  color: '#debf12',
  backgroundColor: 'transparent',
};

class Chapters extends Component {
  state = {
    selectedChapter: null,
    isFormModalOpen: false,
  };

  handleOpenChapterModal = (chapter) => {
    this.setState({ selectedChapter: chapter });
  };

  handleCloseChapterModal = () => {
    this.setState({ selectedChapter: null });
  };

  handleOpenFormModal = () => {
    this.setState({ isFormModalOpen: true });
  };

  handleCloseFormModal = () => {
    this.setState({ isFormModalOpen: false });
  };

  render() {
    const { selectedChapter, isFormModalOpen } = this.state;

    return (
      <div style={{ backgroundColor: 'black' }}>
        <div style={headerContainerStyles}>
          <header style={headerStyles} className="App-header">
            <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
            <h1 style={titleStyles}>HTH Chapters</h1>
          </header>
        </div>
        <br />
        <br />
        <div className="form-container">
          <p style={{ color: 'black', fontWeight: 'bold'  }}>
            To join HTH Worldwide in helping the homeless, we encourage you to open a HTH Chapter in your area so we can have a further reach globally. Fill out the form & Join HTH Chapters Today!!!
          </p>
          <button
  onClick={this.handleOpenFormModal}
  style={{
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    marginBottom: '10px',
    boxShadow: '0px 4px 6px rgba(52, 188, 170, 1.4)',
  }}
>
  Form
</button>
        </div>
<br />
<br />
        <div className="chapters-card">
          {chaptersData.map((chapter, index) => (
            <div
              key={index}
              className="chapter-card"
              onClick={() => this.handleOpenChapterModal(chapter)}
            >
              <h2>{chapter.chapter}</h2>
            </div>
          ))}
        </div>
        {selectedChapter && (
          <ChaptersModal
            chapter={selectedChapter}
            onClose={this.handleCloseChapterModal}
          />
        )}
        {isFormModalOpen && (
          <FormModal onClose={this.handleCloseFormModal} />
        )}
        <br />
        <br />
      </div>
    );
  }
}

export default Chapters;