// MainComponent.js
import React, { useState, useEffect } from 'react';
import { Switch, Button, Select, Form, Radio } from 'antd';
import { BASE_URL } from '../../constants/constants';
import axios from 'axios';
import './AccessManagment.css';

const { Option } = Select;

const AccessManagment = () => {
  const [userRole, setUserRole] = useState('Owner');
  const [lab, setLab] = useState('');
  const [accessForm] = Form.useForm();
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
    importInventory: true, // Default ON for "Owner"
    usedInventories: true, // Default ON for "Owner"
    loginLogout: true, // Default ON for "Owner"
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
    loadEmployeeData();
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

  const [dropdownOptions, setDropdownOptions] = useState([]);

  const loadEmployeeData = () => {
    axios
      .get(BASE_URL + `/dataservice/getAllUserDetailsByCreadtedBy?userId=1`)
      .then((response) => {
        const searchOwner = response.data.map((result) => ({
          value: result.id,
          label: result.firstName,
        }));
        setDropdownOptions(searchOwner);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="vertical-container">
      <div className="square-border vertical-square">
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Access Management</h1>
        <Form form={accessForm} name="registration_form" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            label="User Role"
            name="userRole"
            rules={[
              { required: true, message: 'Please select a user role' },
            ]}
          >
            <Radio.Group onChange={(e) => setUserRole(e.target.value)} value={userRole}>
              <Radio value="Owner">Owner</Radio>
              <Radio value="Employee">Employee</Radio>
            </Radio.Group>
          </Form.Item>

          {userRole === 'Employee' && (
            <Form.Item
              label="Employee "
              name="owner"
              rules={[
                { required: false, message: 'Please enter your name' },
                { type: 'name', message: 'Please enter a valid name' },
              ]}
            >
              <Select
                placeholder="Select an owner"
                optionFilterProp="label"
                options={dropdownOptions}
              />
            </Form.Item>
          )}
        </Form>

        {operationItems.map((item) => (
          // Check if the operation should be hidden for "Owner"
          !(userRole === 'Owner' && ['importInventory', 'usedInventories', 'loginLogout'].includes(item.value)) && (
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
