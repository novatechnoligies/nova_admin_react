import { DeleteOutlined, EditOutlined, DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Button, Input, DatePicker, message, Modal, Form } from "antd";
import DataTable from "react-data-table-component";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import moment from "moment";

import "./Ems.css";

const { RangePicker } = DatePicker;

const Ems = () => {
  const [search, setSearch] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [exportDropdownVisible, setExportDropdownVisible] = useState(false);
  const [checkInOut, setCheckInOut] = useState("Check-in");
  const [addEmployeeModalVisible, setAddEmployeeModalVisible] = useState(false);

  const handleAddEmployeeModal = () => {
    setAddEmployeeModalVisible(true);
  };

  const handleAddEmployeeModalCancel = () => {
    setAddEmployeeModalVisible(false);
  };

  const handleAddEmployeeModalOk = () => {
    // Implement logic to submit form data
    setAddEmployeeModalVisible(false);
  };

  const addEmployeeForm = (
    <Modal
      title="Add New Employee"
      visible={addEmployeeModalVisible}
      onCancel={handleAddEmployeeModalCancel}
      onOk={handleAddEmployeeModalOk}
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input />
        </Form.Item>
        <Form.Item label="Phone No">
          <Input />
        </Form.Item>
        <Form.Item label="Address">
          <Input />
        </Form.Item>
        <Form.Item label="Email">
          <Input />
        </Form.Item>
        <Form.Item label="Pincode">
          <Input />
        </Form.Item>
        <Form.Item label="Adhar Number">
          <Input />
        </Form.Item>
        <Form.Item label="Position">
          <Input />
        </Form.Item>
        <Form.Item label="Gender">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );

  useEffect(() => {
    getEmployeeTableData();
  }, [search]);

  const getEmployeeTableData = async () => {
    const storedUserData = sessionStorage.getItem("userData");
    const userDataObject = JSON.parse(storedUserData);
    console.log("User Data from Session", userDataObject);

    try {
      const response = await axios.get(
        `http://localhost:8082/dataservice/getAllUserDetailsByCreadtedBy?userId=` +
          userDataObject.id
      );
      console.log("API response Data", response.data);
      setEmployeeData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      style: {
        fontWeight: "bold",
        wordWrap: "break-word",
      },
    },
    {
      name: "Name",
      selector: (row) => row.firstName,
      sortable: true,
      style: {
        fontWeight: "bold",
        wordWrap: "break-word",
      },
    },
    {
      name: "Phone No",
      selector: (row) => row.phone,
      sortable: true,
      style: { wordWrap: "break-word" },
    },
    {
      name: "Address",
      selector: (row) => row.lastName,
      sortable: true,
      style: { wordWrap: "break-word" },
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      style: { wordWrap: "break-word" },
    },
    {
      name: "Pincode",
      selector: (row) => row.pin,
      sortable: true,
      style: { wordWrap: "break-word" },
    },
    {
      name: "Adhar Number",
      selector: (row) => row.adharNo,
      sortable: true,
      style: { wordWrap: "break-word" },
    },
    {
      name: "Position",
      selector: (row) => row.role.code,
      sortable: true,
      style: { wordWrap: "break-word" },
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
      style: { wordWrap: "break-word" },
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Button
            type="link"
            onClick={() => handleEditClick(row.id)}
            icon={<EditOutlined />}
          />
          <Button
            type="link"
            onClick={() => handleDeleteClick(row.id)}
            icon={<DeleteOutlined />}
          />
        </div>
      ),
      style: {
        fontWeight: "bold",
        wordWrap: "break-word",
      },
    },
  ];

  const handleEditClick = (employeeId) => {
    // Implement the logic for editing an employee
    console.log(`Edit button clicked for employee with ID ${employeeId}`);
  };

  const handleDeleteClick = (employeeId) => {
    // Implement the logic for deleting an employee
    const updatedEmployeeData = employeeData.filter(
      (employee) => employee.id !== employeeId
    );
    setEmployeeData(updatedEmployeeData);
  };

  const handleCheckInOut = () => {
    if (checkInOut === "Check-in") {
      // Logic for Check-in
      console.log("Checked-in");
      message.success("You are checked-in successfully");
      setCheckInOut("Check-out");
    } else {
      // Logic for Check-out
      console.log("Checked-out");
      message.success("You are checked-out successfully");
      setCheckInOut("Check-in");
    }
  };

  const handleExportCSV = () => {
    // Set the export dropdown visibility to true
    setExportDropdownVisible(true);
  };

  const handleExport = () => {
    // Implement logic for exporting the CSV file
    console.log("Exporting CSV file...");
    // You can use a library like react-csv to handle CSV export

    // Show success message
    message.success("File exported successfully! Check your download folder.");
    
    // Set the export dropdown visibility to false
    setExportDropdownVisible(false);
  };

  return (
    <div className="Ems">
      {addEmployeeForm}
      <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
        <Input
          type="text"
          placeholder="Search Here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "150px", marginRight: "10px" }}
        />
        <Button
          type="primary"
          onClick={handleCheckInOut}
        >
          {checkInOut}
        </Button>
        <Button
          type="primary"
          onClick={handleAddEmployeeModal}
          style={{ marginLeft: "10px" }}
        >
          <PlusOutlined /> Add New Employee
        </Button>
        <Button
          type="primary"
          onClick={handleExportCSV}
          style={{ marginLeft: "10px" }}
        >
          Export CSV
        </Button>
        {exportDropdownVisible && (
          <RangePicker
            style={{ marginLeft: "10px" }}
            onChange={(dates) => {
              if (dates && dates.length === 2) {
                setStartDate(dates[0]);
                setEndDate(dates[1]);
              } else {
                setStartDate(null);
                setEndDate(null);
              }
            }}
            onOk={handleExport}
            renderExtraFooter={() => (
              <Button type="primary" onClick={handleExport}>
                Export
              </Button>
            )}
          />
        )}
      </div>
      <DataTable
        className="container custom-table lab-data-table-container"
        title=""
        columns={columns}
        data={employeeData}
        pagination
        paginationPosition="bottom"
        fixedHeader
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        customStyles={{
          pagination: {
            marginBottom: "16px", // Adjust the margin bottom as needed
          },
        }}
      />
    </div>
  );
};

export default Ems;
