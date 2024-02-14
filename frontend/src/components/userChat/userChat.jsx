
import React, { useState } from 'react';
import './userChat.css';

const PopupButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <button className="toggle-button" onClick={togglePopup}>
        {isPopupOpen ? 'Close Popup' : 'Open Popup'}
      </button>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Popup Content</h2>
            <p>This is the content of the popup.</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupButton;
