import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import AboutUs from './components/About';
import Chapters from './components/Chapters';
import Donation from './components/Donation';
import Footer from './components/Footer';
import Homeless from './components/HomelessList';
import Home from './components/Landing';
import MissionStatement from './components/Mission';
import Modal from './components/Modals/Modal';
import NavBar from './components/NavBar';
import Resource from './components/Resource';
import Services from './components/Service';
import Login from './components/Login';
import LookUp from './components/LookUps';
import Dashboard from './components/Dashboard';
import Profile from './components/Profiles';
import UserProfile from './components/UserProfiles';
import HomelessReg from './components/Assist';
import Sponsor from './components/Sponsors';
import Employers from './components/Employer';
import Wallets from './components/Wallet';
import './css/Founder.css';
import './css/Leader.css';
import './css/Resources.css';
import './css/Footer.css';
import './css/NavBar.css';
import './css/About.css';
import './css/Services.css';
import './css/Chapters.css';
import './css/Campaigns.css';
import './css/Dashboard.css';
import './css/Donate.css';
import './css/Donations.css';
import './css/Drives.css';
import './css/Login.css';
import './css/LoginModal.css';
import './css/LookUps.css';
import './css/Modals.css';
import './css/Profiles.css';
import './css/UserProfiles.css';
import './css/List.css';
import './css/HomelessModal.css';
import './css/Sponsors.css';
import './css/Employer.css';
import './css/Wallet.css';

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
        <div style={{ backgroundColor: 'black' }}>
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
            <Route path="/about" element={<AboutUs />} />
            <Route path="/mission" element={<MissionStatement />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/lookup" element={<LookUp />} />
            <Route path="/employ" element={<Employers />} />
            <Route path="/assist" element={<HomelessReg />} />
            <Route path="/list" element={<Homeless />} />
            <Route path="/wallet" element={<Wallets />} />
            <Route path="/sponsor/:homelessId" element={<Sponsor />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
          </Routes>
          <Modal isOpen={isModalOpen} onClose={this.handleCloseModal}>
          </Modal>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
