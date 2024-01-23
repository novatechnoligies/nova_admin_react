// MainComponent.js
import React, { useState, useEffect } from 'react';
import { Switch, Button, Select } from 'antd';
import './AccessManagment.css';
const { Option } = Select;

const AccessManagment = () => {
  const [userRole, setUserRole] = useState('Owner');
  const [lab, setLab] = useState('');
  const [operations, setOperations] = useState({
    createLab: false,
    deleteLab: false,
    updateLab: false,
    checkAvailability: false,
    updatePricing: false,
    createAppointments: false,
    appointmentList: false,
    manageInventory: false,
    employeeManagement: false,
    importInventory: false,
    usedInventories: false,
    loginLogout: false,
  });

  function onChange(operation, checked) {
    setOperations((prevOperations) => ({
      ...prevOperations,
      [operation]: checked,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected operations:', operations);
  };

  const userRoleItems = [
    { label: 'Owner', key: 'Owner' },
    { label: 'Employee 1', key: 'employee1' },
    { label: 'Employee 2', key: 'employee2' },
    { label: 'Employee 3', key: 'employee3' },
  ];

  const labItems = [
    { label: 'Lab 1', key: 'lab-1' },
    { label: 'Lab 2', key: 'lab-2' },
  ];

  const operationItems = [
    { label: 'Create Lab', value: 'createLab' },
    { label: 'Delete Lab', value: 'deleteLab' },
    { label: 'Update Lab', value: 'updateLab' },
    { label: 'Check Availability', value: 'checkAvailability' },
    { label: 'Update Pricing', value: 'updatePricing' },
    { label: 'Create Appointments', value: 'createAppointments' },
    { label: 'Appointment List', value: 'appointmentList' },
    { label: 'Manage Inventory', value: 'manageInventory' },
    { label: 'Employee Management', value: 'employeeManagement' },
    { label: 'Import Inventory', value: 'importInventory' },
    { label: 'Used Inventories', value: 'usedInventories' },
    { label: 'Login Logout', value: 'loginLogout' },
  ];

  useEffect(() => {
    const employeeInitialState = {
      createLab: false,
      deleteLab: false,
      updateLab: false,
      checkAvailability: false,
      updatePricing: false,
      createAppointments: false,
      appointmentList: false,
      manageInventory: false,
      employeeManagement: false,
      importInventory: false,
      usedInventories: false,
      loginLogout: false,
    };

    setOperations((prevOperations) => ({
      ...prevOperations,
      ...(userRole === 'Employee' ? employeeInitialState : {}),
    }));
  }, [userRole]);

  return (
    <div className="vertical-container">
      <div className="square-border vertical-square">
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Access Management</h1>

        <Select
          placeholder="Select User Role"
          onChange={(value) => setUserRole(value)}
          style={{ width: '100%', marginBottom: '20px' }}
          defaultValue="Select User Role"
        >
          {userRoleItems.map((item) => (
            <Option key={item.key} value={item.label}>
              {item.label}
            </Option>
          ))}
        </Select>

        {operationItems.map((item) => (
          (userRole !== 'Owner' || !['importInventory', 'usedInventories', 'loginLogout'].includes(item.value)) && (
            <div key={item.value} className="checkbox-item">
              <label>{item.label}</label>
              <Switch checked={operations[item.value]} onChange={(checked) => onChange(item.value, checked)} />
            </div>
          )
        ))}

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" size="large" onClick={handleSubmit}>
            Save Permissions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessManagment;
