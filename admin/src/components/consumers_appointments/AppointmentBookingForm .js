import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, Select, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import "./AppointmentBookingForm.css";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

const { Option } = Select;

const AppointmentBookingForm = (selectedAccount) => {
  const [form] = Form.useForm();
  const [labDropdownOptions, setLabDropdownOptions] = useState([]);
  const [serviceDropdownOptions, setServiceDropdownOptions] = useState([]);
  useEffect(() => {
    console.log("Selected Account:", selectedAccount);

    if (selectedAccount && selectedAccount.selectedAccount) {
      form.setFieldsValue({
        id: selectedAccount.selectedAccount.id,
        name: selectedAccount.selectedAccount.name,
        phone: selectedAccount.selectedAccount.contactNumber,
        // Add similar lines for other fields
      });
    } else {
      // Set default values when selectedAccount or selectedAccount.selectedAccount is null
      form.setFieldsValue({
        id: "",
        name: "",
        phone: "",
        // Add default values for other fields
      });
    }
  }, [selectedAccount, form]);

  const handleSearch = (value) => {
    axios
      .get(BASE_URL + `/dataservice/searchLabByName?labName=${value}`)
      .then((response) => {
        const searchLab = response.data.map((result) => ({
          value: result.id,
          label: result.shopName,
        }));
        setLabDropdownOptions(searchLab);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
    // Add logic to handle the form submission (e.g., API call, etc.)
  };

  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedLab, setSelectedLab] = useState([]);

  const handleDateChange = (selectedDate) => {
    if (!selectedDate) {
      // Handle the case when selectedDate is null or undefined
      return;
    }
  
    const availableTimeSlots = getAvailableTimeSlots(
      moment(selectedDate).startOf("day"),
      selectedLab
    );
  
    setTimeSlots(availableTimeSlots);
    console.log("availableTimeSlots   ::: " + availableTimeSlots);
    // if (selectedLab) {
    //   fetchServices(selectedLab, selectedDate);
    // }
  };
  

  const getAvailableTimeSlots = (selectedDate, selectedLab) => {

    

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
          .format("hh:mm A");

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
        prevSelectedButton.classList.remove("selected");
      }
    }

    // Apply styles for the clicked time
    setSelectedTime(time);
    const selectedButton = document.getElementById(time);
    if (selectedButton) {
      selectedButton.classList.add("selected");
    }
  };

  const filterOption = (input, option) => {
    if (option && option.label) {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    return false;
  };

  const handleLabSelect = (value) => {
    setSelectedLab(value);
  };

  const handleServices = (value) => {
    //alert(selectedLab);
    axios
      .get(
        BASE_URL +
          `/dataservice/findAllShopServiceByLab/${selectedLab}/${value}`
      )
      .then((response) => {
        const searchService = response.data.map((result) => ({
          value: result.shopId,
          label: `${result.serviceName} - ${result.amount}`,
        }));
        setServiceDropdownOptions(searchService);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="id"
        name="id"
        hidden
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Full Name"
        name="name"
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Appointment Date"
        name="appointmentDate"
        rules={[
          { required: true, message: "Please select the appointment date" },
        ]}
      >
        <DatePicker showTime format="YYYY-MM-DD" onChange={handleDateChange} />
      </Form.Item>

      <Form.Item label="Appointment Slot" name="slot">
        <div className="time-slot-container">
          {timeSlots.map((time) => (
            <Button
              key={time}
              id={time}
              className={`time-slot-button ${
                selectedTime === time ? "selected" : ""
              }`}
              onClick={() => handleTimeSlotClick(time)}
            >
              {time}
            </Button>
          ))}
        </div>
      </Form.Item>

      <Form.Item
        label="Contact Number"
        name="phone"
        rules={[
          { required: true, message: "Please enter your contact number" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Select Lab"
        name="shop"
        rules={[
          { required: false, message: "Please search your Lab here" },
          { type: "name", message: "Please enter a valid name" },
        ]}
      >
        <Select
          showSearch
          onSearch={handleSearch}
          placeholder="Select an Lab"
          optionFilterProp="label"
          filterOption={filterOption}
          options={labDropdownOptions}
          onChange={handleLabSelect}
        />
      </Form.Item>

      <Form.Item
        label="Select Service"
        name="service"
        rules={[{ required: true, message: "Please select a service" }]}
      >
        <Select
          showSearch
          onSearch={handleServices}
          placeholder="Select an service"
          optionFilterProp="label"
          filterOption={filterOption}
          options={serviceDropdownOptions}
        />
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
