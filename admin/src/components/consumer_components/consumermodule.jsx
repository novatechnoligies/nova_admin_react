// src/Page.js
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Form, Input, Radio, DatePicker, Checkbox, Upload } from 'antd';
const { TextArea } = Input;
import { UploadOutlined } from '@ant-design/icons';
import "../consumer_components/consumermodule.css";


function NewConsumer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div>
    <Button type="primary" style={{ float: 'right', marginTop:'20px'}} onClick={showModal}>Create Consumer Account</Button>
      <Modal title="New Consumer Account" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div style={{justifyContent:'flex-end'}}>
          <form>
          <Form.Item name="id" style={{ display: 'none' }}>
        <Input />
        </Form.Item>
        <Form.Item name="createdAt" style={{ display: 'none' }}>
        <Input />
        </Form.Item>
      <Form.Item name="status" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item name="isDeleted" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item name="ownerId" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item name="isPhoneNoVerified" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item name="role" style={{ display: 'none' }}>
        <Input />
      </Form.Item>

      {/* Visible Fields */}
      <Form.Item name="firstName" label="First Name" rules={[{ required: true, max: 50 }]}>
        <Input />
      </Form.Item>
      <Form.Item name="lastName" label="Last Name:" rules={[{ max: 50 }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', max: 50 }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone" rules={[{ required: true, pattern: /^\d{12}$/, message: 'Please enter a valid 12-digit phone number' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="pin" label="Pin" rules={[{pattern: /^\d{6}$/, message: 'Please enter a valid 6-digit pin' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender">
        <Radio.Group>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
          <Radio value="other">Other</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="username" label="Username" rules={[{ required: true, max: 50 }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true, max: 20 }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item name="adharNo" label="Aadhar Number" rules={[{ required: true, pattern: /^\d{12}$/, message: 'Please enter a valid 12-digit Aadhar number' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="adharPhoto" label="Aadhar Photo" rules={[{ required: true, max: 255 }]}>
      <Upload>
          <Button icon={<UploadOutlined />}>Upload Aadhar Photo</Button>
        </Upload>
      </Form.Item>
      <Form.Item name="ownerPhoto" label="Owner Photo" rules={[{ required: true, max: 255 }]}>
      <Upload>
          <Button icon={<UploadOutlined />}>Upload Owner Photo</Button>
        </Upload>
      </Form.Item>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default NewConsumer;
