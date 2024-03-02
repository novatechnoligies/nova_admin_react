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
  InputNumber,
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
    cusumerform
      .validateFields()
      .then((values) => {
        // Validate form fields and post data if validation is successful
        const modifiedData = {
          ...values,
          role: { id: values.role },
        };
        console.log("Form values:", modifiedData);

        return axios.post(
          BASE_URL + "/dataservice/saveUserDetails",
          modifiedData
        );
      })
      .then((response) => {
        console.log("API response:", response);
        setIsModalOpen(false);
        message.success("User Created..!");
        // Upload Aadhar photo
        const file = document.getElementById("fileInput").files[0]; // Assuming fileInput is the ID of the file input element
        uploadAdharPhoto(file, response.data.id);
      })
      .catch((error) => {
        console.error("Validation error:", error);
        // Handled the validation Here
        message.error("Please fill in all required fields");
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
  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");

    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      setLoginUser(userDataObject.id);
    }

    getConsumerData();
  }, []);
  const handleDateOfBirthChange = (event) => {
    const selectedDate = event.target.value;

    // Calculate age based on the selected date of birth
    const birthDate = new Date(selectedDate);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Set the calculated age in the form
    cusumerform.setFieldsValue({ age });
  };

  const handleAgeChange = (value) => {
    if (value) {
      // Calculate date of birth based on the entered age
      const currentDate = new Date();
      const birthYear = currentDate.getFullYear() - value;
      const dateOfBirth = new Date(
        birthYear,
        currentDate.getMonth(),
        currentDate.getDate()
      );

      // Format the date to be in the "YYYY-MM-DD" format expected by the input[type="date"]
      const formattedDateOfBirth = dateOfBirth.toISOString().split("T")[0];

      // Set the calculated date of birth in the form
      cusumerform.setFieldsValue({ dob: formattedDateOfBirth });
    }
  };

  const columns = [
    {
        name: "S.No",
        selector: (row, index) => index + 1,
        sortable: false,
        width: "60px", // Set to width size
      },
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "70px", // Set to width size
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

  const uploadAdharPhoto = async (file, userId) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);

      const response = await axios.post(
        "http://localhost:8082/dataservice/uploadAdharPhoto",
        formData
      );

      if (response.status === 200) {
        console.log("File uploaded successfully:", response.data);
        // Handle success
      } else {
        console.error("Failed to upload file:", response.statusText);
        // Handle error
      }
    } catch (error) {
      console.error("Failed to upload file:", error.message);
      // Handle error
    }
  };

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
        <Form
          form={cusumerform}
          name="newConsumerForm"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item name="id" label="ID" hidden>
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
            label="Phone"
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="pin"
            label="Pin Code"
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              {/* You can add more options as needed */}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date Of Birth"
            rules={[{ required: true, max: 50 }]}
          >
            <Input type="date" onChange={handleDateOfBirthChange} />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please enter your age" }]}
          >
            <InputNumber min={1} max={120} onChange={handleAgeChange} />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="createdBy"
            label="Created By"
            hidden
            initialValue={loginUser}
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, max: 50 }]}
          >
            <Input type="password" />
          </Form.Item>

          <Form.Item
            name="adharNo"
            label="Adhar No"
            rules={[{ required: true, min: 12 }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="adharPhoto"
            label="Adhar Photo"
            rules={[{ required: true }]}
          >
            <Input type="file" id="fileInput"></Input>
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
