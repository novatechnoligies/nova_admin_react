import React, { useState } from 'react';
import { Button, Modal, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASE_URL } from "../../constants/constants";

function NewConsumer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cusumerform] = Form.useForm(); // Create a form instance

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    cusumerform.validateFields().then((values) => {
      // Validate form fields and post data if validation is successful
      const modifiedData = {
        ...values,
        role: { id: values.role }
      };
      console.log('Form values:', modifiedData);

      axios.post(BASE_URL+'/dataservice/saveUserDetails', modifiedData)
        .then((response) => {
          console.log('API response:', response);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error('API error:', error);
        });
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" style={{ float: 'right', marginTop: '20px' }} onClick={showModal}>
        Create Consumer Account
      </Button>
      <Modal title="New Consumer Account" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={cusumerform} name="newConsumerForm">
        <Form.Item
            name="id"
            label="id"
          >
            <Input />
        </Form.Item>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ max: 50 }]}
          >
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
            label="gender"
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="username"
            label="username"
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="password"
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="adharNo"
            label="adharNo"
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="adharPhoto"
            label="adharPhoto"
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="role"
            label="role"
            rules={[{ required: true, max: 50 }]}
          >
            <Input />
          </Form.Item>
          
          
            
        </Form>
      </Modal>
    </div>
  );
}

export default NewConsumer;