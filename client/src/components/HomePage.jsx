
import React from 'react';
import '../CssComponents/HomePage.css';
import HomePageBackground from '../assets/images/HomeBG2.avif';

const HomePage = () => {
  const scrollToContacts = () => {
    const contactSection = document.getElementById('contacts-section');
    contactSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to contacts section
  };



  return (
    <div>
    <div className="homepage-container">
      <img src={HomePageBackground} alt="Background" className="background-image" />
      <div className="content">
        <h1 className="slide-in">Welcome to Nora</h1>
        <p className="slide-in">Your Contact List Manager</p>
        <button className="go-to-contacts-btn slide-in" onClick={scrollToContacts}>
            Go to Contacts
          </button>
      </div>
    </div>

    {/* Contacts Section */}
    <div id="contacts-section" className="contacts-section">
       <h2>Contacts</h2>
       <p>This is where your contact list will be displayed.</p>
  </div>
</div>
  );
};

export default HomePage;
