import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalState } from "./context";

const Invitations = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const {user} = useGlobalState()
  const { event_id } = useParams();
    console.log(event_id)
  useEffect(() => {
    fetch('/users') 
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);  

  const handleUserToggle = (userId) => {
    setSelectedUsers(prevSelectedUsers => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter(id => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleSubmit = () => {
    const data = {
        user_id: user.id,
        selected_users: selectedUsers,
        event_id: parseInt(event_id, 10)
      };
    
      fetch('/invitations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(result => {
          console.log('Invitations sent successfully:', result);
          // Add your logic for handling the successful response
        })
        .catch(error => {
          console.error('Error sending invitations:', error);
          // Add your logic for handling errors
        });
  };

  return (
    <div className="invitations-container">
      <h2 className='invitations-header'>Please select the users you'd like to invite:</h2>
      <div className="user-cards-container">
        {users.map(user => (
          <div
            key={user.id}
            className={`user-card ${selectedUsers.includes(user.id) ? 'selected' : ''}`}
            onClick={() => handleUserToggle(user.id)}
          >
            <label className="user-label" htmlFor={`user-${user.id}`}>
              {user.first_name} {user.last_name}
            </label>
          </div>
        ))}
      </div>
      {selectedUsers.length === 0 && (
        <p className="warning-message">Must select a user before continuing.</p>
      )}
      <div className="submit-container">
        <button
          type="button"
          onClick={handleSubmit}
          className="submit-button"
          disabled={selectedUsers.length === 0}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Invitations;
