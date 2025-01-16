
import React from 'react';

const DeleteContact = ({ contactId, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      fetch(`http://localhost:3000/api/contacts/${contactId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete contact');
          }
          return response.json();
        })
        .then(() => {
          onDelete(contactId); // Notify parent to update the list
        })
        .catch((error) => {
          console.error('Error deleting contact:', error);
        });
    }
  };

  return (
    <button onClick={handleDelete} className="delete-contact-btn">
      Delete
    </button>
  );
};

export default DeleteContact;
