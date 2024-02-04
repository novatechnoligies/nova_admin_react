import React, { useState } from "react";
import { Button, Form, Input, Select, DatePicker, Checkbox, TimePicker, message } from "antd";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import moment from "moment";
import "./EmployeeMapping.css";

const EmployeeMapping = () => {
  const [emplyeeMapForm] = Form.useForm();
  const [labDropdownOptions, setLabDropdownOptions] = useState([]);
  const [employeeDropdownOptions, setEmployeeDropdownOptions] = useState([]);

  const handleShopAvailibilityModalPost = async (values) => {
    // Implement your logic for handling shop availability post
  };

  const handleEmployeeSearch = (value) => {
    const storedUserData = sessionStorage.getItem("userData");
    const userDataObject = JSON.parse(storedUserData);
    axios
      .get(BASE_URL + `/dataservice/searchOwnerByName?ownerName=${value}&createdBy=${userDataObject.id}`)
      .then((response) => {
        const searchOwner = response.data.map((result) => ({
          value: result.id,
          label: result.username,
        }));
        setEmployeeDropdownOptions(searchOwner);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Search Shop Dropdown
  const handleLabSearch = (value) => {
    axios
      .get(BASE_URL + `/dataservice/searchLabByName?labName=${value}`)
      .then((response) => {
        const searchLab = response.data.map((result) => ({
          value: result.id,
          label: result.shopName,
        }));
        setLabDropdownOptions(searchLab);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const filterOption = (input, option) => {
    if (option && option.label) {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    return false;
  };

  const handleCreateMapping = () => {
    // Implement your logic for creating mapping
    const formValues = emplyeeMapForm.getFieldsValue();

    const modifiedData = {
        ...formValues,
        empId: { id: formValues.empId },
        shopId: { id: formValues.shopId },
      };

    console.log("Form values:", modifiedData);

    axios
      .post(BASE_URL + "/dataservice/saveEmployeeShopRelation", modifiedData)
      .then((response) => {
        message.success("Mapping created successfully!");
        console.log("Post request successful:", response.data.id);
        //setCreateShopModalData(response.data.id);
        //setIsCreateLabModalVisible(false)

      })
      .catch((error) => {
        console.error("Post request error:", error);
      });
   
  };

  return (
    <div className="form-container">
      <Form
        form={emplyeeMapForm}
        name="registration_form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        

        <Form.Item
          label="Select Lab"
          name="shopId"
          rules={[
            { required: false, message: "Please search your Lab here" },
            { type: "name", message: "Please enter a valid name" },
          ]}
        >
          <Select
            showSearch
            onSearch={handleLabSearch}
            placeholder="Select a Lab"
            optionFilterProp="label"
            filterOption={filterOption}
            options={labDropdownOptions}
          />
        </Form.Item>

        <Form.Item
          label="employee to map"
          name="empId"
          rules={[
            { required: false, message: "Please enter owner's name" },
            { type: "name", message: "Please enter a valid name" },
          ]}
        >
          <Select
            showSearch
            onSearch={handleEmployeeSearch}
            placeholder="Select an eployee"
            optionFilterProp="label"
            filterOption={filterOption}
            options={employeeDropdownOptions}
          />
        </Form.Item>

        <Form.Item
          label="Select Owner(should be a admin)"
          name="ownerId"
          rules={[
            { required: false, message: "Please enter owner's name" },
            { type: "name", message: "Please enter a valid name" },
          ]}
        >
          <Select
            showSearch
            onSearch={handleEmployeeSearch}
            placeholder="Select an owner"
            optionFilterProp="label"
            filterOption={filterOption}
            options={employeeDropdownOptions}
          />
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="employeeStartDate"
          rules={[{ required: true, message: "Please enter the start date" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
            label="salary"
            name="salary"
          >
            <Input />
          </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={handleCreateMapping}>
            Create Mapping
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EmployeeMapping;
