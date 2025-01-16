import React, { useState } from 'react';

const CreateContact = ({ onCreate, closeForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null); 

  const createContact = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError('Name and email cannot be empty.');
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError('Please enter a valid email address.');
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
        if (!response.ok) {
          return response.json().then((data) => {
            if (data.error && data.error.includes('Email already exists')) {
              throw new Error('This email already exists.');
            }
            throw new Error('Failed to create contact.');
          });
        }
        return response.json();
      })
      .then((newContact) => {
        onCreate(newContact); // Notify parent to update the list
        setSuccessMessage('Created Successfully!');
        
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="form-container">
      <h1>Create New Contact</h1>
      {successMessage ? ( 
        <div className="success-container">
          <p className="success-message">{successMessage}</p>
          <button className="action-button" onClick={closeForm}>
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
          />
        </div>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="action-button" disabled={loading}>
          {loading ? 'Creating...' : 'Submit'}
        </button>
        <button type="button" className="cancel-button" onClick={closeForm}>
          Cancel
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      )}
    </div>
  );
};

export default CreateContact;
