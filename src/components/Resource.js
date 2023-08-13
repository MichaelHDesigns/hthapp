import React, { Component } from 'react';
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

const resources = [
  {
    name: 'Help The Homeless Worldwide A NJ Nonprofit Corporation',
    description: 'Help The Homeless Worldwide fully believes in their journey and knows with the help of blockchain, they can achieve their goal of helping the homeless worldwide.',
    url: 'https://hth.world/',
    logo: '/Images/hthlogo.png',
  },
  {
    name: 'Greater Tuckerton Food Pantry',
    description: 'To distribute emergency and supplemental food to our neighbors in need in the Greater Tuckerton / Little Egg Harbor area! To provide hands-on opportunities for neighbors to help neighbors. To educate the public about the issues of hunger in our community.',
    url: 'https://tuckertonborough.com/services/tuckerton-food-pantry',
    logo: 'https://tuckertonborough.com/content/upload/1/logos/logo_w200_h200.png',
  },
  {
    name: 'Atlantic City Rescue Mission',
    description: 'Providing emergency shelter, food, and clothing to homeless men and engage in rehabilitation, recovery, and re-entry programs to help these individuals achieve responsible and productive lives.',
    url: 'https://acrescuemission.org/',
    logo: 'https://img1.wsimg.com/isteam/ip/236fd9ca-65ab-4cb2-b32e-4c682ea84de3/5b270606cb4d5.image.jpg/:/rs=w:745,h:200,cg:true,m/cr=w:745,h:200/qt=q:95',
  },
  // Add more resources with name, description, URL, and logo
];

class Resource extends Component {
  render() {
    return (
      <div className="resource-page" style={{ backgroundColor: 'black' }}>
      <div style={headerContainerStyles}>
        <header style={headerStyles} className="App-header">
          <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
          <h1 style={titleStyles}>HTH Resources</h1>
        </header>
      </div>
        <div className="resource-container">
          <h2>Homelessness Resources</h2>
          {resources.map((resource, index) => (
            <div key={index} className="resource-card">
              <div className="resource-card-content">
                <div className="resource-logo-container">
                  {resource.logo && <img src={resource.logo} alt={`${resource.name} Logo`} className="resource-logo" />}
                </div>
                <div className="resource-details">
                  <h3><a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.name}</a></h3>
                  <p>{resource.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
<br />
<br />
      </div>
    );
  }
}

export default Resource;