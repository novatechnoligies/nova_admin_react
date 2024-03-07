import React, { useState } from 'react';
import { Form, Input, Button, Table, Space } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { BASE_URL } from "../../constants/constants";
import axios from "axios";
import { Link } from 'react-router-dom';
import qs from 'qs';

const ExistingAccountSearch = ({ onSelectAccount }) => {
  const [form] = Form.useForm();
  const [consumerListByPhone, setConsumerListByPhone] = useState([]);

  const getConsumerListByPhone = (value) => {
    axios.get(BASE_URL + `/dataservice/getConsumerByPhone/${value.searchQuery}`)
      .then((response) => {
        const searchOwner = response.data.map((result) => ({
          id: result.id,
          name: result.firstName,
          contactNumber: result.phone,
        }));

        setConsumerListByPhone(searchOwner);
      })
      .catch((error) => {
        console.error(error);
      });
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
          {/* Use handleSelectAccount directly instead of onSelectAccount */}
          <Button type="primary" icon={<PlusOutlined />} onClick={() => handleSelectAccount(record)}>
            Select
          </Button>
        </Space>
      ),
    },
  ];

  const handleSelectAccount = (selectedAccount) => {
    console.log('Selected Account:', selectedAccount);
    onSelectAccount(selectedAccount);
  };

  return (
    <div>
      <Form form={form} onFinish={getConsumerListByPhone} layout="inline">
        <Form.Item name="searchQuery"   style={{ width: '150px', marginRight: "10px" }}>
          <Input placeholder="Search by name or contact number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" 
          htmlType="submit" icon={<SearchOutlined />}style={{ width: "90px",  marginRight: "10px"  }}>
            Search
          </Button>
          <Link to="/newconsumeraccount">
            <Button
              type="primary"
              style={{ float: "right", marginLeft: "5px", width: "206px"}}
              icon={<PlusOutlined />}
            >
              Create Consumer Account
            </Button>
          </Link>
        </Form.Item>
      </Form>

      <Table columns={columns} dataSource={consumerListByPhone} />
    </div>
  );
};

export default ExistingAccountSearch;
