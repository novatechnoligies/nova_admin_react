import React, { useState, useEffect } from "react";
import { Button, Form, Select,message } from "antd";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import './AccessManagement.css';

const AccessManagement = () => {
  const [accessForm] = Form.useForm();
  const [employeeDownOptions, setEmployeeDownOptions] = useState([]);
  const [items, setItems] = useState([
    { label: 'Item 1', isOn: false },
    { label: 'Item 2', isOn: false },
    { label: 'Item 3', isOn: false },
  ]);

  useEffect(() => {
    getEmployeeData();
  }, []);

  const getEmployeeData = () => {
    const storedUserData = sessionStorage.getItem("userData");
    const userDataObject = JSON.parse(storedUserData);
    axios.get(
      BASE_URL + `/dataservice/getAllUserDetailsByCreadtedBy?userId=` + userDataObject.id
    )
    .then((response) => {
      const searchOwner = response.data.map((result) => ({
        role: result.role.id,
        value: result.id,
        label: result.username,
      }));
      setEmployeeDownOptions(searchOwner);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const handleToggle = (index, role) => {
    const newItems = [...items];
      newItems[index].isOn = !newItems[index].isOn;
    setItems(newItems);
  };

  const handleAccessFromSubmit = async () => {
    const formValues = accessForm.getFieldsValue();
    const selectedEmployee = formValues.employee;
    const selectedItems = items.filter((item) => item.isOn);
    console.log("Selected Employee:", selectedEmployee);
    console.log("Selected Items:", selectedItems);
  
    const labData = sessionStorage.getItem("labData");
    console.log("LabData from Session", labData);
  
    if (labData == null || labData == undefined) {
      message.warning("Please select a lab first");
    } else {
      const storedUserData = sessionStorage.getItem("userData");
      const userDataObject = JSON.parse(storedUserData);
  
    const resultsJson = {
      shopDetails: { id: labData }, // Assuming "id" is the property name for shopDetails
      employeeDetails: { id: selectedEmployee }, // Assuming "id" is the property name for employeeDetails
      createdBy: userDataObject.id,
      items: JSON.stringify(selectedItems)
    };

      console.log("Results in JSON format:", resultsJson);

      try {
        axios
      .post(BASE_URL + "/dataservice/saveAccessPermissions", resultsJson)
      .then((response) => {
        message.success("appointment booked ..!");
        console.log("Appointment submitted successfully:", response.data);
      })
        
  
        console.log("Is Lab ID coming", response);
        const responseData = response.data;
  
        
  
        // Perform further actions based on selected values and response data
        
      } catch (error) {
        console.error("Error fetching appointments:", error);
        // Handle error if needed
      }
    }
  };
  

  const handleEmployeeChange = (value, option) => {
    const selectedEmployee = employeeDownOptions.find((employee) => employee.value === value);
    if (selectedEmployee) {
      const selectedRoleId = selectedEmployee.role;
      console.log("Selected Role ID:", selectedRoleId);
    }
  };

  return (
    <div className="access-management-container">
      {/* Left Section */}
      <div className="left-section">
        <Form
          form={accessForm}
          name="access-form"
          onFinish={handleAccessFromSubmit}
        >
          <Form.Item
            label="Select Employee"
            name="employee"
          >
            <Select
              placeholder="Select a user"
              optionFilterProp="label"
              options={employeeDownOptions}
              onChange={handleEmployeeChange}
            />
          </Form.Item>

          <div>
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  <label>
                    {item.label}
                    <button
                      onClick={() => handleToggle(index, /* Put the role ID you want to check here */) }
                      style={{
                        backgroundColor: item.isOn ? 'green' : 'red',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginLeft: '10px',
                      }}
                      
                    >
                      {item.isOn ? 'On' : 'Off'}
                    </button>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Example: Display content based on user role */}
        Right
      </div>
    </div>
  );
};

export default AccessManagement;
