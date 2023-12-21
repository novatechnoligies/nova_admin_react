import React, { useState } from 'react';
import { Form, Input, Button, Table, Space } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

const ExistingAccountSearch = () => {
  const [form] = Form.useForm();
  const [searchResults, setSearchResults] = useState([]);

  const onFinish = (values) => {
    console.log('Search values:', values);
    // Add logic to search for existing accounts (e.g., API call, etc.)
    // Update the searchResults state with the search results
    const dummySearchResults = [
      { id: 1, name: 'John Doe', contactNumber: '123-456-7890' },
      { id: 2, name: 'Jane Smith', contactNumber: '987-654-3210' },
    ];
    setSearchResults(dummySearchResults);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {/* Add an action for selecting an existing account */}
          <Button type="primary" icon={<PlusOutlined />} onClick={() => handleSelectAccount(record)}>
            Select
          </Button>
        </Space>
      ),
    },
  ];

  const handleSelectAccount = (selectedAccount) => {
    console.log('Selected Account:', selectedAccount);
    // Add logic to handle the selected account (e.g., pass it to the booking form)
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="inline">
        <Form.Item name="searchQuery">
          <Input placeholder="Search by name or contact number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            Search
          </Button>
        </Form.Item>
      </Form>

      <Table columns={columns} dataSource={searchResults} />
    </div>
  );
};

export default ExistingAccountSearch;
