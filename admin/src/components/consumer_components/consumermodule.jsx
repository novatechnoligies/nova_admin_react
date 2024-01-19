import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Radio,
  Select,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import DataTable from "react-data-table-component";

function NewConsumer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cusumerform] = Form.useForm(); // Create a form instance
  const [consumerData, setConsumerData] = useState([]);
  const [loginUser, setLoginUser] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    cusumerform.validateFields().then((values) => {
      // Validate form fields and post data if validation is successful
      const modifiedData = {
        ...values,
        role: { id: values.role },
      };
      console.log("Form values:", modifiedData);

      axios
        .post(BASE_URL + "/dataservice/saveUserDetails", modifiedData)
        .then((response) => {
          console.log("API response:", response);
          setIsModalOpen(false);
          message.success("User Created..!");
        })
        .catch((error) => {
          console.error("API error:", error);
        });
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getConsumerData();
  }, []);

  const getConsumerData = async () => {
    try {
      const storedUserData = sessionStorage.getItem("userData");
      const userDataObject = JSON.parse(storedUserData);
      setLoginUser(JSON.stringify(userDataObject.id));
      const response = await axios.get(
        BASE_URL +
          "/dataservice/getAllUserDetailsByCreadtedBy?userId=" +
          userDataObject.id
      );
      console.log(response);
      setConsumerData(response.data);
    } catch (error) {}
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role.code,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email ID",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Aadhar Number",
      selector: (row) => row.adharNo,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
  ];

  const data = [
    { id: 1, col1: "Row 1", col2: "Data A" },
    { id: 2, col1: "Row 2", col2: "Data B" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Input
          type="search"
          placeholder="Search Consumer Account"
          style={{
            width: "300px",
            height: "32px",
            marginTop: "20px",
            marginRight: "10px",
          }}
        />
        <Button
          type="primary"
          style={{ float: "right", marginTop: "20px", marginRight: "10px" }}
          onClick={showModal}
        >
          Create Consumer Account
        </Button>
      </div>

      <DataTable
        className="container custom-table lab-data-table-container"
        title=""
        search
        columns={columns}
        data={consumerData}
        pagination
        paginationPosition="bottom"
        fixedHeader
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        customStyles={{
          pagination: {
            marginBottom: "16px",
          },
        }}
      />

      <Modal
        title="New Consumer Account"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={cusumerform} name="newConsumerForm">
          <Form.Item name="id" label="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name" rules={[{ max: 50 }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="phone"
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="pin"
            label="pin"
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              {/* You can add more options as needed */}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="username"
            label="username"
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="createdBy"
            label="createdBy"
            hidden
            initialValue={loginUser}
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="password"
            rules={[{ required: true, max: 50 }]}
          >
            <Input type="password" />
          </Form.Item>

          <Form.Item
            name="adharNo"
            label="adharNo"
            rules={[{ required: true, min: 12 }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="adharPhoto"
            label="adharPhoto"
            rules={[{ required: true, max: 50 }]}
          >
            <Input type="file"></Input>
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select your role" }]}
          >
            <Select placeholder="Select a role">
              <Select.Option value="1">Admin</Select.Option>
              <Select.Option value="2">Owner</Select.Option>
              <Select.Option value="3">Employee</Select.Option>
              <Select.Option value="4">Consumer</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default NewConsumer;
