import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import chaptersData from '../data/chapters';
import foodBankData from '../data/foodbank';
import shelterData from '../data/shelter';
import ServicesModal from './Modals/ServicesModal';
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

class Service extends Component {
  state = {
    selectedChapter: null,
    selectedFoodBank: null,
    selectedShelter: null,
    searchQuery: '',
    filteredMarkers: [],
  };

  handleOpenServicesModal = (marker) => {
    if (marker.type === 'food') {
      this.setState({ selectedFoodBank: marker, selectedShelter: null });
    } else if (marker.type === 'shelter') {
      this.setState({ selectedShelter: marker, selectedFoodBank: null });
    } else {
      this.setState({ selectedChapter: marker, selectedFoodBank: null, selectedShelter: null });
    }
  };

  handleCloseServicesModal = () => {
    this.setState({ selectedChapter: null, selectedFoodBank: null, selectedShelter: null });
  };

  handleSearchChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const foodKeywords = ['food', 'meal', 'nutrition'];
    const shelterKeywords = ['shelter', 'housing', 'accommodation', 'house' ];
    const chapterKeywords = ['hth', 'org', 'organization', 'nonprofit', 'charity', 'chapter'];

    let filteredMarkers = [];

    if (foodKeywords.some(keyword => searchQuery.includes(keyword))) {
      filteredMarkers = foodBankData;
    } else if (shelterKeywords.some(keyword => searchQuery.includes(keyword))) {
      filteredMarkers = shelterData;
    } else if (chapterKeywords.some(keyword => searchQuery.includes(keyword))) {
      filteredMarkers = chaptersData;
    } else {
      filteredMarkers = [...foodBankData, ...shelterData, ...chaptersData];
    }

    this.setState({ searchQuery, filteredMarkers });
  };

  render() {
    const { searchQuery, selectedChapter, selectedFoodBank, selectedShelter, filteredMarkers } = this.state;

    const center = selectedChapter
      ? [selectedChapter.lat, selectedChapter.lng]
      : [39.580057522692414, -74.36045487509227];

    const markersToDisplay = searchQuery === '' ? [...foodBankData, ...shelterData, ...chaptersData] : filteredMarkers;

    return (
      <div style={{ backgroundColor: 'black' }}>
        <div style={headerContainerStyles}>
          <header style={headerStyles} className="App-header">
            <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
            <h1 style={titleStyles}>HTH World Services</h1>
          </header>
        </div>
        <br />
        <br />
        <div className="map-container">
          <div className="map">
            <h2 style={{ color: 'black' }}>Search for HTH Services</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by chapter, food, or shelter..."
                value={searchQuery}
                onChange={this.handleSearchChange}
              />
            </div>
            <MapContainer center={center} zoom={selectedChapter ? 13 : 2} className="map">
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &amp; <a href="https://hth.world">HTH World</a> contributors'
              />
              {markersToDisplay.map((marker, index) => (
                <Marker
                  key={index}
                  position={[marker.lat, marker.lng]}
                  icon={L.icon({
                    iconUrl:
                      marker.type === 'food'
                        ? '/Images/food.png'
                        : marker.type === 'shelter'
                        ? '/Images/shelter.png'
                        : 'https://hth.world/wp-content/themes/HTHworldwide/images/hthlogo_md.png',
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                  })}
                  eventHandlers={{
                    click: () => this.handleOpenServicesModal(marker),
                  }}
                />
              ))}
            </MapContainer>
          </div>
          <br />
          <br />
          <br />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {selectedChapter && (
          <ServicesModal
            shelter={selectedChapter}
            onClose={this.handleCloseServicesModal}
          />
        )}
        {selectedFoodBank && (
          <ServicesModal
            shelter={selectedFoodBank}
            onClose={this.handleCloseServicesModal}
          />
        )}
        {selectedShelter && (
          <ServicesModal
            shelter={selectedShelter}
            onClose={this.handleCloseServicesModal}
          />
        )}
      </div>
    );
  }
}

export default Service;