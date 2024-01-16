// MainComponent.js
import React, { useState } from 'react';
import { useAuth } from './AccessManagment';

const AccessManagment = () => {
  const [operations, setOperations] = useState({
    createLab: false,
    updateLabAvailability: false,
    updateServicesPricing: false,
    appointmentList: false,
    createAppointment: false,
    employeeManagement: false,
    inventoryManagement: false,
    importInventory: false,
    usedInventories: false,
    loginLogout: false,
  });

  const handleCheckboxChange = (operation) => {
    setOperations((prevOperations) => ({
      ...prevOperations,
      [operation]: !prevOperations[operation],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform actions based on selected operations
    console.log('Selected operations:', operations);
    // Add logic here to handle the selected operations
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Create Lab
        <input
          type="checkbox"
          checked={operations.createLab}
          onChange={() => handleCheckboxChange('createLab')}
        />
      </label>

      {/* Repeat the above pattern for other checkboxes with respective labels */}
      
      <button type="submit">Create User</button>
    </form>
  );
};

export default AccessManagment;