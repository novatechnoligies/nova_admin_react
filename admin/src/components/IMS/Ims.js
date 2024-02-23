import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, Form } from 'antd'; // Import Modal and Form components
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants';
import "./Ims.css";

const Ims = () => {
  const [search, setSearch] = useState('');
  const [employeeData, setEmployeeData] = useState([]);
  const [editFormData, setEditFormData] = useState(null); // State to store data for editing
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State to manage edit modal visibility

  useEffect(() => {
    getEmployeeTableData();
  }, [search]);

  const getEmployeeTableData = async () => {
    const storedUserData = sessionStorage.getItem('userData');
    const userDataObject = JSON.parse(storedUserData);

    try {
      const response = await axios.get(
        BASE_URL + `/dataservice/getAllLabListByOwnerId?ownerId=${userDataObject.id}`
      );
      setEmployeeData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.shopID,
      sortable: true,
      style: {
        fontWeight: 'bold',
        wordWrap: 'break-word',
      },
    },
    {
      name: 'Name',
      selector: (row) => row.shopName,
      sortable: true,
      style: {
        fontWeight: 'bold',
        wordWrap: 'break-word',
      },
    },
    {
      name: 'Phone No',
      selector: (row) => row.phoneNo,
      sortable: true,
      style: { wordWrap: 'break-word' },
    },
    {
      name: 'Address',
      selector: (row) => row.shopAddress,
      sortable: true,
      style: { wordWrap: 'break-word' },
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      style: { wordWrap: 'break-word' },
    },
    {
      name: 'Pincode',
      selector: (row) => row.pincode,
      sortable: true,
      style: { wordWrap: 'break-word' },
    },
    {
      name: 'Position',
      selector: (row) => row.position,
      sortable: true,
      style: { wordWrap: 'break-word' },
    },
    {
      name: 'Adhar Number',
      selector: (row) => row.adharNumber,
      sortable: true,
      style: { wordWrap: 'break-word' },
    },
    {
      name: 'Gender',
      selector: (row) => row.gender,
      sortable: true,
      style: { wordWrap: 'break-word' },
    },
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <Button type="link" onClick={() => handleEditClick(row)} icon={<EditOutlined />} />
          <Button type="link" onClick={() => handleDeleteClick(row.id)} icon={<DeleteOutlined />} />
        </div>
      ),
      style: {
        fontWeight: 'bold',
        wordWrap: 'break-word',
      },
    },
  ];

  const handleEditClick = (rowData) => {
    setEditFormData(rowData); // Set data for editing
    setIsEditModalVisible(true); // Show edit modal
  };

  const handleDeleteClick = (employeeId) => {
    // Implement the logic for deleting an employee
    const updatedEmployeeData = employeeData.filter((employee) => employee.id !== employeeId);
    setEmployeeData(updatedEmployeeData);
  };

  const handleEditModalOk = () => {
    // Handle submit logic for edit modal form
    // You can send edited data to the server here
    setIsEditModalVisible(false); // Hide edit modal after submission
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false); // Hide edit modal if canceled
  };

  return (
    <div className="">
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
            marginBottom: '16px', // Adjust the margin bottom as needed
          },
        }}
        subHeaderComponent={
          <div>
            <Input
              type="text"
              placeholder="Search Here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        }
        subHeader
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Inventory Details"
        visible={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        {editFormData && (
          <Form
            initialValues={editFormData} // Prefill form with editFormData
            onFinish={handleEditModalOk} // Handle form submission
          >
            {/* Form fields for editing data */}
            <div className="edit-form-wrapper">
              <Form.Item name="shopID" label="ID">
                <Input readOnly />
              </Form.Item>
              <Form.Item name="shopName" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="phoneNo" label="Phone No">
                <Input />
              </Form.Item>
              <Form.Item name="shopAddress" label="Address">
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>
              <Form.Item name="pincode" label="Pincode">
                <Input />
              </Form.Item>
              <Form.Item name="position" label="Position">
                <Input />
              </Form.Item>
              <Form.Item name="adharNumber" label="Adhar Number">
                <Input />
              </Form.Item>
              <Form.Item name="gender" label="Gender">
                <Input />
              </Form.Item>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Ims;
