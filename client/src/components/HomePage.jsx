import React, { useEffect, useState } from 'react';
import '../CssComponents/HomePage.css';
import HomePageBackground from '../assets/images/techImageBG2.jpg';
import CreateContact from './CreateContact';
import UpdateContact from './UpdateContact';
import DeleteContact from './DeleteContact';

const HomePage = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);


  const scrollToContacts = () => {
    const contactsSection = document.getElementById('contacts-section');
    contactsSection.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    fetch('http://localhost:3000/api/contacts')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));
  };

  const handleCreate = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleUpdate = (updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  const handleDelete = (deletedContactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== deletedContactId)
    );
  };

  const toggleForm = (mode, contact = null) => {
    setShowForm(true);
    setIsEditing(mode === 'edit');
    setCurrentContact(contact);
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setCurrentContact(null);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="homepage-container">
      
      <div className="welcome-section">
        <img src={HomePageBackground} alt="Background" className="background-image" />
        <div className="content">
          <h1 className="slide-in">Welcome to C-Linq</h1>
          <p className="slide-in">Your Contacts Manager</p>
          <button className="go-to-contacts-btn slide-in" onClick={scrollToContacts}>
            Go to Contacts
          </button>
        </div>
      </div>
      


      <div id="contacts-section" className="contacts-section">
        <div className="contacts-header">
          <h2>CONTACTS</h2>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>


  {filteredContacts.length > 0 ? (
        <table className="contacts-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>
                  <button
                    className="update-contact-btn"
                    onClick={() => toggleForm('edit', contact)}
                  >
                    Update
                  </button>
                  <DeleteContact contactId={contact.id} onDelete={handleDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <p className="no-contacts-message">No contacts to display. Add a new contact!</p>
        )}
        <button className="create-contact-btn" onClick={() => toggleForm('create')}>
          Create New Contact
        </button>
      </div>

      
      {showForm && (
        <div className="modal-overlay">
          {isEditing ? (
            <UpdateContact
              contact={currentContact}
              onUpdate={handleUpdate}
              closeForm={closeForm}
            />
          ) : (
            <CreateContact onCreate={handleCreate} closeForm={closeForm} />
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
