import React, { useState } from 'react';
import { Button, Modal, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

function NewConsumer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); // Create a form instance

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Validate form fields and post data if validation is successful
      console.log('Form values:', values);

      axios.post('/api/consumer/create', values)
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
        <Form form={form} name="newConsumerForm">
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
          
          
            
        </Form>
      </Modal>
    </div>
  );
}

export default NewConsumer;