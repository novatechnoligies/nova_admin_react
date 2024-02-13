import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Button, Input, DatePicker, message, Modal, Form } from "antd";
import DataTable from "react-data-table-component";
import axios from "axios";
import moment from "moment";

import "./Ems.css";

const { RangePicker } = DatePicker;

const Ems = () => {
  const [search, setSearch] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [exportDropdownVisible, setExportDropdownVisible] = useState(false);
  const [checkInOut, setCheckInOut] = useState("Punch-in"); // Renamed "Check-in" to "Punch-in"
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
    try {
      const response = await axios.get(
        `http://localhost:8082/dataservice/getAllUserDetails`
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
    if (checkInOut === "Punch-in") { // Renamed "Check-in" to "Punch-in"
      // Logic for Punch-in
      console.log("Punched-in");
      message.success("You are punched-in successfully");
      setCheckInOut("Punch-out"); // Renamed "Check-out" to "Punch-out"
    } else {
      // Logic for Punch-out
      console.log("Punched-out");
      message.success("You are punched-out successfully");
      setCheckInOut("Punch-in"); // Renamed "Check-in" to "Punch-in"
    }
  };

  const handleExportCSV = () => {
    // Set the export dropdown visibility to true
    setExportDropdownVisible(true);
  };

  const handleExport = () => {
    // Generate CSV content
    const csvContent = "data:text/csv;charset=utf-8," +
      employeeData.map(employee =>
        Object.values(employee).join(",")
      ).join("\n");
    
    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "employee_data.csv");
    document.body.appendChild(link);
    
    // Trigger download
    link.click();

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
            onChange={() => {}}
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
