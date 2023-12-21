import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, TimePicker, Space, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AppointmentBookingForm from './AppointmentBookingForm ';
import ExistingAccountSearch from './ExistingAccountSearch';

const AppointmentBookingPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Go back to the previous page
    navigate(-1);
  };

  const handleBooking = () => {
    navigate('/'); // Navigating to the home page for this example
  };
    
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = (values) => {
    setIsSubmitting(true);

    // Perform your appointment booking logic here
    console.log('Form values:', values);

    // Simulate async operation
    setTimeout(() => {
      setIsSubmitting(false);
      form.resetFields();
    }, 1000);
  };

  return (
      <div>
          <Row gutter={16}>
              {/* Left Section (Appointment Form) */}
              <Col span={12}>
                  <div style={{ padding: '20px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                      <h2>Appointment Booking</h2>
                      <AppointmentBookingForm />
                  </div>
              </Col>

              {/* Right Section (Existing Account Search) */}
              <Col span={12}>
                  <div style={{ padding: '20px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                      <h2>Search Existing Account</h2>
                      <ExistingAccountSearch />
                  </div>
              </Col>
          </Row>
      </div>
  );
};

export default AppointmentBookingPage;
