import React, { Component } from 'react';
import ChaptersModal from './Modals/ChaptersModal';
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
  };

  handleOpenChapterModal = (chapter) => {
    this.setState({ selectedChapter: chapter });
  };

  handleCloseChapterModal = () => {
    this.setState({ selectedChapter: null });
  };

  render() {
    const { selectedChapter } = this.state;

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
<br />
<br />
      </div>
    );
  }
}

export default Chapters;