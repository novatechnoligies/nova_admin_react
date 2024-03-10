import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button, Modal, Form, Input, Popconfirm  } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";

const Organizations = () => {
  const [data, setData] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  // Dummy Data
  const dummyData = [
    { id: 1, name: "Organization 1", OrgCode: "123", GSTNumber: "123" , Phone: "12345", Email: "org1@gmail.com", location: "Location 1", address: "address 1", Status:"Active"},
    { id: 1, name: "Organization 1", OrgCode: "123", GSTNumber: "123" , Phone: "12345", Email: "org1@gmail.com", location: "Location 1", address: "address 2", Status:"Active"},
    { id: 1, name: "Organization 1", OrgCode: "123", GSTNumber: "123" , Phone: "12345", Email: "org1@gmail.com", location: "Location 1", address: "address 2", Status:"Active"},
    { id: 1, name: "Organization 1", OrgCode: "123", GSTNumber: "123" , Phone: "12345", Email: "org1@gmail.com", location: "Location 1", address: "address 2", Status:"Active"},
  ];

  useEffect(() => {
    setData(dummyData);
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
        name: "OrgCode",
        selector: (row) => row.OrgCode,
        sortable: true,
    },
    {
        name: "GSTNumber",
        selector: (row) => row.GSTNumber,
        sortable: true,
    },
    {
        name: "Phone",
        selector: (row) => row.Phone,
        sortable: true,
    },
    {
        name: "Email",
        selector: (row) => row.Email,
        sortable: true,
    },
    {
        name: "Location",
        selector: (row) => row.location,
        sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
  },
    {
        name: "Status",
        selector: (row) => row.Status,
        sortable: true,
    },
    {
        name: "Action",
        cell: (row) => (
          <div>
            <EditOutlined onClick={() => handleUpdateClick(row)} style={{ marginRight: '8px' }} />
            <Popconfirm
              title="Are you sure you want to delete this organization?"
              onConfirm={() => handleDeleteClick(row)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ color: "red" }} />
            </Popconfirm>
          </div>
        ),
      },
  ];

  const handleCreateClick = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateModalCancel = () => {
    setIsCreateModalVisible(false);
  };

  const handleCreateModalSubmit = (values) => {
    // Handle organization creation logic here
    console.log("Create Organization:", values);
    setIsCreateModalVisible(false);
  };

  const handleUpdateClick = (row) => {
    setSelectedOrganization(row);
    setIsUpdateModalVisible(true);
  };

  const handleDeleteClick = (row) => {
    // Handle organization deletion logic here
    console.log("Delete Organization:", row);
    // You may want to update the data state after deletion
    // For example: setData(data.filter(org => org.id !== row.id));
  };

  const handleUpdateModalCancel = () => {
    setSelectedOrganization(null);
    setIsUpdateModalVisible(false);
  };

  const handleUpdateModalSubmit = (values) => {
    // Handle organization update logic here
    console.log("Update Organization:", values);
    setSelectedOrganization(null);
    setIsUpdateModalVisible(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <Button
          type="primary"
          style={{ marginRight: "10px" }}
          onClick={handleCreateClick}
        >
          <PlusOutlined /> Create Organization
        </Button>
        <Button type="primary" 
        style={{marginRight:"10px"}}
        onClick={handleUpdateClick}>
          <EditOutlined /> Update Organization
        </Button>
      </div>

      <DataTable
        title=""
        columns={columns}
        data={data}
        pagination
        paginationPosition="bottom"
        fixedHeader
        selectableRows
        selectableRowsHighlight
        highlightOnHover
      />

      <Modal
        title="Create Organization"
        visible={isCreateModalVisible}
        onCancel={handleCreateModalCancel}
        onOk={handleCreateModalSubmit}
      >
        <Form>
          <Form.Item
            label="Name"
            name="name"
            initialValue={selectedOrganization?.name}
            rules={[{ required: true }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="OrgCode"
            name="OrgCode"
            initialValue={selectedOrganization?.OrgCode}
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="GST Number"
            name="GSTNumber"
            initialValue={selectedOrganization?.GSTNumber}
            rules={[{ required: true }]}
          >
            <Input type="number"/>
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            initialValue={selectedOrganization?.Phone}
            rules={[{ required: true }]}
          >
            <Input type="number"/>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email "
            initialValue={selectedOrganization?.Email}
            rules={[{ required: true }]}
          >
            <Input type="email"/>
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            initialValue={selectedOrganization?.location}
            rules={[{ required: true }]}
          >
            <Input type="text"/>
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            initialValue={selectedOrganization?.address}
            rules={[{ required: true }]}
          >
            <Input type="text" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update Organization"
        visible={isUpdateModalVisible}
        onCancel={handleUpdateModalCancel}
        onOk={handleUpdateModalSubmit}
      >
        {/* Add your organization update form here */}
        <Form>
          <Form.Item
            label="Name"
            name="name"
            initialValue={selectedOrganization?.name}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="OrgCode"
            name="OrgCode"
            initialValue={selectedOrganization?.OrgCode}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="GST Number"
            name="GSTNumber"
            initialValue={selectedOrganization?.GSTNumber}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            initialValue={selectedOrganization?.Phone}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email "
            initialValue={selectedOrganization?.Email}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            initialValue={selectedOrganization?.location}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Organizations;
