import React, { useState } from 'react';
import '../CssComponents/HomePage.css';

const DeleteContact = ({ contactId, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
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
        setShowConfirm(false); // Close the confirmation popup
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  };

  return (
    <>
      {/* Delete Button */}
      <button onClick={() => setShowConfirm(true)} className="delete-contact-btn">
        Delete
      </button>

      {/* Custom Confirmation Popup */}
      {showConfirm && (
        <div className="Delete-modal-overlay">
          <div className="Delete-modal-content">
            <h3>Are you sure you want to delete this contact?</h3>
            <div className="Delete-modal-actions">
              <button onClick={handleDelete} className="delete-confirm-btn">
                Yes, Delete
              </button>
              <button onClick={() => setShowConfirm(false)} className="delete-cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteContact;
