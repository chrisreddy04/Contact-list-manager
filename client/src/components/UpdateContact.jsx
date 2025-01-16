import React, { useState } from 'react';

const UpdateContact = ({ contact, onUpdate, closeForm }) => {
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateContact = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError('Name and email cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`http://localhost:3000/api/contacts/${contact.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact: { name, email } }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to update contact');
        return response.json();
      })
      .then((updatedContact) => {
        onUpdate(updatedContact); // Notify parent to update the list
        closeForm(); // Close the form
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
      <h1>Update Contact</h1>
      <form onSubmit={updateContact}>
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
          {loading ? 'Updating...' : 'Submit'}
        </button>
        <button type="button" className="cancel-button" onClick={closeForm}>
          Cancel
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateContact;
