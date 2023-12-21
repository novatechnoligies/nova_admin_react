import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, Select, Row, Col  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import "./AppointmentBookingForm.css"

const { Option } = Select;

const AppointmentBookingForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Add logic to handle the form submission (e.g., API call, etc.)
  };


  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const handleDateChange = (selectedDate) => {
    // Use your logic to fetch available time slots for the selected date
    // For demonstration, let's assume you have a function getAvailableTimeSlots(date)
    const availableTimeSlots = getAvailableTimeSlots(selectedDate);
    
    console.log("availableTimeSlots"+availableTimeSlots);
    setTimeSlots(availableTimeSlots);
  };

  const getAvailableTimeSlots = (selectedDate) => {
    // Your logic to fetch time slots based on the selected date
    // This is a placeholder, you should replace it with your actual implementation

    // For example, generate some dummy time slots for the sake of demonstration
    const startHour = 9;
    const endHour = 17;
    const timeSlotDuration = 60; // in minutes

    const timeSlots = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += timeSlotDuration) {
        const formattedTime = moment()
          .hour(hour)
          .minute(minute)
          .format('hh:mm A');

        timeSlots.push(formattedTime);
      }
    }

    return timeSlots;
  };
  
  const handleTimeSlotClick = (time) => {
    // Reset styles for previously selected time
    if (selectedTime) {
      const prevSelectedButton = document.getElementById(selectedTime);
      if (prevSelectedButton) {
        prevSelectedButton.classList.remove('selected');
      }
    }
  
    // Apply styles for the clicked time
    setSelectedTime(time);
    const selectedButton = document.getElementById(time);
    if (selectedButton) {
      selectedButton.classList.add('selected');
    }
  };


  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: 'Please enter your full name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Appointment Date"
        name="appointmentDate"
        rules={[{ required: true, message: 'Please select the appointment date' }]}
      >
        <DatePicker showTime format="YYYY-MM-DD" onChange={handleDateChange}/>
        
      </Form.Item>

      <Form.Item
      label="Appointment Slot"
      name="slot"
      >
          
        <div className="time-slot-container">
          {timeSlots.map((time) => (
            <Button
              key={time}
              id={time}
              className={`time-slot-button ${selectedTime === time ? 'selected' : ''}`}
              onClick={() => handleTimeSlotClick(time)}
            >
              {time}
            </Button>
          ))}
        </div>
      </Form.Item>

      <Form.Item
        label="Contact Number"
        name="contactNumber"
        rules={[{ required: true, message: 'Please enter your contact number' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Select Lab" name="lab"  rules={[{ required: true, message: 'Please select a service' }]}>
          <Select placeholder="Select a service">
            <Option value="service1">lab 1</Option>
            <Option value="service2">lab 2</Option>
            {/* Add more service options as needed */}
          </Select>
        </Form.Item>

      <Form.Item label="Select Service" name="service"  rules={[{ required: true, message: 'Please select a service' }]}>
          <Select placeholder="Select a service" mode="multiple">
            <Option value="service1">Service 1</Option>
            <Option value="service2">Service 2</Option>
            {/* Add more service options as needed */}
          </Select>
        </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          Book Appointment
        </Button>
      </Form.Item>

      
    </Form>
  );
};

export default AppointmentBookingForm;
