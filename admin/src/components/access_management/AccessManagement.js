import React, { useState, useEffect } from "react";
import { Button, Form, Select, message, Row, Col } from "antd";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import "./AccessManagement.css";

const AccessManagement = () => {
  const [accessForm] = Form.useForm();
  const [employeeDownOptions, setEmployeeDownOptions] = useState([]);
  const [items, setItems] = useState([
    { label: "Dashboard", isOn: false },
    { label: "Appointments", isOn: false },
    { label: "Lab", isOn: false },
    { label: "Clinic", isOn: false },
    { label: "EMS", isOn: false },
    { label: "IMS", isOn: false },
    { label: "Create Promotions", isOn: false },
    { label: "Consumer", isOn: false },
    { label: "Profile", isOn: false },
    // Hidden functionalities with default permissions for owner
    { label: "Import Inventory", isOn: true, hidden: true },
    { label: "Used Inventories", isOn: true, hidden: true },
    { label: "Login Logout", isOn: true, hidden: true }
  ]);

  const [secondColumnItems, setSecondColumnItems] = useState([
    { label: "Create Lab", isOn: false },
    { label: "Delete Lab", isOn: false },
    { label: "Update Lab", isOn: false },
    { label: "Update Pricing", isOn: false },
    { label: "Check Availability", isOn: false },
    { label: "Create Appointments", isOn: false },
    { label: "Appointment List", isOn: false },
    { label: "Manage Inventory", isOn: false },
    { label: "Employee Management", isOn: false }
  ]);

  const [thirdColumnItems, setThirdColumnItems] = useState([
    { label: "Total Appointments", isOn: false },
    { label: "Today's Appointments", isOn: false },
    { label: "Total Count", isOn: false },
    { label: "LAB Name", isOn: false },
    { label: "Owner Name", isOn: false },
    { label: "Status", isOn: false },
    { label: "Inventory Item Name", isOn: false },
    { label: "Total Items", isOn: false },
    { label: "Used Items", isOn: false },
    { label: "Stock Items", isOn: false },
    // Including Todays Earnings and Total Earnings in the column, initially OFF
    { label: "Todays Earnings", isOff: true },
    { label: "Total Earnings", isOff: true },
  ]);

  useEffect(() => {
    getEmployeeData();
  }, []);

  const getEmployeeData = () => {
    const storedUserData = sessionStorage.getItem("userData");
    const userDataObject = JSON.parse(storedUserData);
    axios
      .get(
        BASE_URL +
          `/dataservice/getAllUserDetailsByCreadtedBy?userId=` +
          userDataObject.id
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

  const handleToggle = (index, column) => {
    let newItems;
    if (column === 1) {
      newItems = [...items];
    } else if (column === 2) {
      newItems = [...secondColumnItems];
    } else {
      newItems = [...thirdColumnItems];
    }
    const toggledItem = newItems[index];
    toggledItem.isOn = !toggledItem.isOn;
    if (column === 1) {
      setItems(newItems);
    } else if (column === 2) {
      setSecondColumnItems(newItems);
    } else {
      setThirdColumnItems(newItems);
    }
    
    if (toggledItem.isOn) {
      message.success("Permission Granted!");
    } else {
      message.warning("Permission Revoked");
    }
  };

  const handleAccessFromSubmit = async () => {
    const formValues = accessForm.getFieldsValue();
    const selectedEmployee = formValues.employee;
    const selectedItems = items.concat(secondColumnItems).concat(thirdColumnItems).filter((item) => item.isOn);
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
        shopDetails: { id: labData },
        employeeDetails: { id: selectedEmployee },
        createdBy: userDataObject.id,
        items: JSON.stringify(selectedItems),
      };

      console.log("Results in JSON format:", resultsJson);

      try {
        axios.post(BASE_URL + "/dataservice/saveAccessPermissions", resultsJson).then((response) => {
          message.success("Permissions Granted!");
          console.log("Permissions Granted Successfully!", response.data);
        });

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
    const selectedEmployee = employeeDownOptions.find(
      (employee) => employee.value === value
    );
    if (selectedEmployee) {
      const selectedRoleId = selectedEmployee.role;
      console.log("Selected Role ID:", selectedRoleId);
    }
  };

  return (
    <div className="access-management-container">
      <h1 className="main-title">Access Management</h1>
      <div className="access-management-content">
        <Form form={accessForm} name="access-form" onFinish={handleAccessFromSubmit}>
          <Form.Item label="Select Employee" name="employee">
            <Select
              placeholder="Select a user"
              optionFilterProp="label"
              options={employeeDownOptions}
              onChange={handleEmployeeChange}
              dropdownStyle={{ width: 100 }}
            />
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={8}>
              <div className="items-container">
                {items.map((item, index) => (
                  !item.hidden && (
                    <div key={index} className="item">
                      <div className="item-content">
                        <label>{item.label}</label>
                        <Button
                          type={item.isOn ? 'primary' : 'default'}
                          onClick={() => handleToggle(index, 1)}
                          className="button"
                        >
                          {item.isOn ? 'On' : 'Off'}
                        </Button>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </Col>
            <Col span={8}>
              <div className="items-container">
                {secondColumnItems.map((item, index) => (
                  <div key={index} className="item">
                    <div className="item-content">
                      <label>{item.label}</label>
                      <Button
                        type={item.isOn ? 'primary' : 'default'}
                        onClick={() => handleToggle(index, 2)}
                        className="button"
                      >
                        {item.isOn ? 'On' : 'Off'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            <Col span={8}>
              <div className="items-container">
                {thirdColumnItems.map((item, index) => (
                  !item.hidden && (
                    <div key={index} className="item">
                      <div className="item-content">
                        <label>{item.label}</label>
                        <Button
                          type={item.isOn ? 'primary' : 'default'}
                          onClick={() => handleToggle(index, 3)}
                          className="button"
                        >
                          {item.isOn ? 'On' : 'Off'}
                        </Button>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </Col>
          </Row>

          <div className="submit-button-container">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AccessManagement;
