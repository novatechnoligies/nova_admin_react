import {React, useState } from "react";
import {Button, Modal, Form, Input, Select, DatePicker, Checkbox, TimePicker, Card, message} from "antd";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

const LabFormModal = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const [dropdownOptions, setDropdownOptions] = useState([]);

//Start Search dropdown for owner
  const handleSearch = (value) => {
    axios
      .get(BASE_URL + `/dataservice/searchOwnerByName?ownerName=${value}`)
      .then((response) => {
        const searchOwner = response.data.map((result) => ({
          value: result.id,
          label: result.username,
        }));
        setDropdownOptions(searchOwner);
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
  //END Search dropdown for owner

// Create Lab Start 
  const handleCreateShopModalPost = (values) => {
    console.log("Form values:", values);
    const modifiedData = {
      ...values,
      owner: { id: values.owner },
    };
    axios
      .post(BASE_URL + "/dataservice/saveShopDetails", modifiedData)
      .then((response) => {
        message.success("Lab created successfully!");
        console.log("Post request successful:", response.data.id);
        onCancel();
        //setCreateShopModalData(response.data.id);
        //setIsCreateLabModalVisible(false)

      })
      .catch((error) => {
        console.error("Post request error:", error);
      });
  };
  const handleFinish = async (values) => {
    try {
      handleCreateShopModalPost(values);
      form.resetFields();
    } catch (error) {
      console.error("Error creating lab:", error);
    }
  };
//end create LAB
  return (
    <Modal
      visible={visible}
      title="Create New Lab"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={form.submit}>
          Create
        </Button>,
      ]}
    >
      
      <Form
          form={form}
          name="registration_form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleFinish}
        >
          <Form.Item label="id" name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="shopName"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Adress"
            name="shopAddress"
            rules={[
              { required: true, message: "Please enter your adress" },
              { message: "Please enter a valid adress" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Post Pin"
            name="pinCode"
            rules={[
              { required: true, message: "Please enter your Pincode" },
              {
                min: 6,
                type: "pinCode",
                message: "Please enter a valid Pincode",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ownername"
            name="owner"
            rules={[
              { required: false, message: "Please enter your name" },
              { type: "name", message: "Please enter a valid name" },
            ]}
          >
            <Select
              showSearch
              onSearch={handleSearch}
              placeholder="Select an owner"
              optionFilterProp="label"
              filterOption={filterOption}
              options={dropdownOptions}
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your Phone" },
              { type: "name", message: "Please enter a valid Phone number" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="GST"
            name="gstNo"
            rules={[{ message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Logo"
            name="logo"
            rules={[
              { required: true, message: "Please enter your logo" },
              { type: "logo", message: "Please enter a valid logo" },
            ]}
          >
            <Input type="file" />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default LabFormModal;
