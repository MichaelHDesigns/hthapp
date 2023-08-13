import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import AboutUs from './components/About';
import Chapters from './components/Chapters';
import ChaptersModal from './components/Modals/ChaptersModal';
import Donation from './components/Donation';
import Footer from './components/Footer';
import Home from './components/Landing';
import MissionStatement from './components/Mission';
import Modal from './components/Modals/Modal';
import NavBar from './components/NavBar';
import Resource from './components/Resource';
import Services from './components/Service';
import './css/Founder.css'
import './css/Leader.css';
import './css/Resources.css';
import './css/Footer.css';
import './css/NavBar.css';
import './css/About.css';
import './css/Services.css';
import './css/Chapters.css';
import './css/Campaigns.css';
import './css/Donate.css';
import './css/Donations.css';
import './css/Drives.css';
import './css/Modals.css';

class App extends Component {
  state = {
    isModalOpen: false,
  };

  handleOpenModal = () => {
    this.setState({ isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;

    return (
      <Router>
        <div style={{ backgroundColor: '#ccc' }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/donate"
              element={<Donation openModal={this.handleOpenModal} />}
            />
            <Route path="/resource" element={<Resource />} />
            <Route path="/about" element={<AboutUs />} />                 <Route path="/mission" element={<MissionStatement />} />
          </Routes>
          <Modal isOpen={isModalOpen} onClose={this.handleCloseModal}>
            {/* Add content to the modal */}
          </Modal>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;