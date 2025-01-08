import React from 'react';
import { useNavigate } from 'react-router-dom';

const YourComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens, etc.)
    navigate('/'); // Redirect to the landing page
  };

  return (
    <div>
      {/* Other component content */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default YourComponent; 