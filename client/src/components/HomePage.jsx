import React, { useEffect, useState } from 'react';
import '../CssComponents/HomePage.css';
import HomePageBackground from '../assets/images/HomeBG2.avif';

const HomePage = () => {
  const scrollToContacts = () => {
    const contactSection = document.getElementById('contacts-section');
    contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    fetch('http://localhost:3000/api/contacts')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setError(null);
    setSuccessMessage(null);
    setName('');
    setEmail('');
  };

  const createContact = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError('Name and email cannot be empty.');
      return;
    }

    if (contacts.some((contact) => contact.email === email)) {
      setError('This email already exists.');
      return;
    }

    setLoading(true);
    setError(null);

    fetch('http://localhost:3000/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact: { name, email } }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to create contact');
        return response.json();
      })
      .then((newContact) => {
        setContacts([...contacts, newContact]);
        setLoading(false);
        setSuccessMessage('Contact created successfully!');
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
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

      <div id="contacts-section" className="contacts-section">
        <h2>Contacts</h2>
        <table className="contacts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="create-contact-btn" onClick={toggleForm}>
          Create New Contact
        </button>
      </div>

      {showForm && (
  <div className="modal-overlay">
    <div className="modal-content">
      {successMessage ? (
        <div className="success-container">
          <h3>{successMessage}</h3>
          <button onClick={toggleForm} className="close-btn">
            OK
          </button>
        </div>
      ) : (
        <form onSubmit={createContact} className="create-contact-form">
          <h3>Create New Contact</h3>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Submit'}
          </button>
          <button type="button" className="cancel-btn" onClick={toggleForm}>
            Cancel
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
