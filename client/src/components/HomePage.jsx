import React, { useEffect, useState } from 'react';
import '../CssComponents/HomePage.css';
import HomePageBackground from '../assets/images/techImageBG2.jpg';

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


  // Debugging `successMessage` state updates
  useEffect(() => {
    console.log('Updated successMessage:', successMessage);
  }, [successMessage]);

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
    setLoading(false);
  };

  const createContact = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError('Name and email cannot be empty.');
      setLoading(false);
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (contacts.some((contact) => contact.email === email)) {
      setError('This email already exists.');
      setLoading(false);
      return;
    }

    setError(null);
    setLoading(true);
   

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
          console.log('New contact added:', newContact); // Debugging
          setContacts([...contacts, newContact]);
          setSuccessMessage('Contact created successfully!');
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      })
      .finally(() =>{
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
          <div className="form-container">
            <h1>Create New Contact</h1>
            {successMessage ? (
              <div className="success-container">
                  {console.log('Rendering success message:', successMessage)}
                <p className="success-message">{successMessage}</p>
                <button onClick={toggleForm} className="action-button">
                  OK
                </button>
              </div>
            ) : (
              <form onSubmit={createContact}>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={error && !name ? 'error-input' : ''}
                  />
                  {error && !name && <p className="error-message">Name is required.</p>}
                </div>
                <div className="input-container">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={error && email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ? 'error-input' : ''}
                  />
                  {error && email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && (
                    <p className="error-message">Please enter a valid email address.</p>
                  )}
                </div>
                <button type="submit" className="action-button" disabled={loading}>
                  {loading ? 'Creating...' : 'Submit'}
                </button>
                <button type="button" className="cancel-button" onClick={toggleForm}>
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
