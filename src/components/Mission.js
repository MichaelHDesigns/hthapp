import React from 'react';
import logo from '../images/hthlogo.png';

const cardStyles = {
  background: '#ffffff',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 1.4)',
  borderRadius: '10px',
  padding: '20px',
  margin: '20px',
  textAlign: 'center',
};

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

const MissionStatement = () => {
  return (
      <div style={{ backgroundColor: 'black' }}>
      <div style={headerContainerStyles}>
        <header style={headerStyles} className="App-header">
          <img src={logo} style={logoStyles} className="App-logo" alt="logo" />
          <h1 style={titleStyles}>HTH Worldwide</h1>
        </header>
      </div>
      <br />
      <br />
      <br />
      <div className="card-container">
        <div className="mission-container">
<br />
          <h2>Our Mission</h2>
<br />
          <div style={cardStyles}>
           <h2>Core Values and Beliefs</h2>
            <p>
              Helping those in need is a way of life.
              <br />
              It is a part of human nature to look out for one another, but in some cases, help is not readily available and sometimes there is not enough help. At Help The Homeless Worldwide, our mission is to provide a concise overview of our purpose and commitment. We are dedicated to helping those in need and driving positive change in the lives of vulnerable individuals and families. Our core values are rooted in compassion, solidarity, and social responsibility. These principles guide our actions and decisions as we strive to make a meaningful impact on homelessness.
            </p>
          </div>
          <div style={cardStyles}>
           <h2>Addressing Critical Needs</h2>
            <p>
              We aim to address critical needs by offering shelter, food, healthcare, and comprehensive support services to homeless individuals and families. Our goal is to create a safety net that helps them regain stability and dignity.
            </p>
          </div>
          <div style={cardStyles}>
           <h2>Global Impact</h2>
            <p>
              Help The Homeless Worldwide extends its mission globally by collaborating with underfunded organizations. Together, we amplify our impact and reach, ensuring that support and assistance are accessible to those in need on a larger scale.
            </p>
          </div>
           <div style={cardStyles}>
           <h2>Partnerships and Collaborations</h2>
            <p>
              We forge partnerships with like-minded organizations, local communities, and dedicated volunteers. These collaborations strengthen our ability to achieve our mission and create a united front against homelessness.
            </p>
          </div>
          <div style={cardStyles}>
           <h2>Innovative Approach</h2>
            <p>
              Our approach is rooted in innovation, employing strategies and technologies that drive real change. Blockchain technology plays a pivotal role, ensuring transparency, accountability, and efficient resource allocation in our efforts to combat homelessness.
            </p>
          </div>
          <div style={cardStyles}>
           <h2>Empowerment and Dignity</h2>
            <p>
              We are committed to restoring dignity and empowering homeless individuals to rebuild their lives. Our programs focus on skills development and self-sufficiency, enabling them to regain independence and contribute positively to society.
            </p>
          </div>
          <div style={cardStyles}>
           <h2>Transparency and Accountability</h2>
            <p>
              Transparency is a cornerstone of our organization. We are dedicated to maintaining open and honest financial practices, ensuring that supporters have access to information about our activities and resource allocation.
            </p>
          </div>
          <div style={cardStyles}>
           <h2>Long-Term Vision</h2>
            <p>
              Our long-term vision is a future where homelessness is significantly reduced, and the impact of Help The Homeless Worldwide is felt globally. Through sustainable solutions and collaborative efforts, we aspire to create lasting change and improve countless lives.
            </p>
          </div>
          <div style={cardStyles}>
           <h2>Gratitude and Acknowledgments</h2>
            <p>
              We extend heartfelt gratitude to our donors, volunteers, and supporters who play a crucial role in driving our mission forward. It is their collective effort that fuels our journey and brings positive transformation to those in need. We love you all.
            </p>
          </div>
        </div>
<br />
<br />
      </div>
      <br />
      <br />
    </div>
  );
};

export default MissionStatement;