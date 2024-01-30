import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants';

import './Ems.css';

const Ems = () => {
  const [search, setSearch] = useState('');
  const [employeeData, setEmployeeData] = useState([]);

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
      selector: (row) => row.phone,
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
      name: 'Adhar Number',
      selector: (row) => row.adharNumber,
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
      name: 'Gender',
      selector: (row) => row.gender,
      sortable: true,
      style: { wordWrap: 'break-word' },
    },
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <Button type="link" onClick={() => handleEditClick(row.id)} icon={<EditOutlined />} />
          <Button type="link" onClick={() => handleDeleteClick(row.id)} icon={<DeleteOutlined />} />
        </div>
      ),
      style: {
        fontWeight: 'bold',
        wordWrap: 'break-word',
      },
    },
  ];

  const handleEditClick = (employeeId) => {
    // Implement the logic for editing an employee
    console.log(`Edit button clicked for employee with ID ${employeeId}`);
  };

  const handleDeleteClick = (employeeId) => {
    // Implement the logic for deleting an employee
    const updatedEmployeeData = employeeData.filter((employee) => employee.id !== employeeId);
    setEmployeeData(updatedEmployeeData);
  };

  return (
    <div className="Ems">
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
    </div>
  );
};

export default Ems;
