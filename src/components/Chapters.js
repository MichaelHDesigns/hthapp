import React, { Component } from 'react';
import ChaptersModal from './Modals/ChaptersModal';
import chaptersData from '../data/chapters';

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
      <div>
        <header className="App-header">
          <h1>Welcome to HTH Chapters</h1>
        </header>
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