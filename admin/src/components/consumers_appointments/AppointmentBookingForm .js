import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, Select, message, } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import "./AppointmentBookingForm.css";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

const AppointmentBookingForm = (selectedAccount) => {
  const [form] = Form.useForm();
  const [labDropdownOptions, setLabDropdownOptions] = useState([]);
  const [serviceDropdownOptions, setServiceDropdownOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
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
      form.setFieldsValue({
        id: "",
        name: "",
        phone: "",
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

  const bookAppointmentForm = (values) => {
    const formValuesWithSlot = {
      ...values,
      slotId: selectedTime,
      shopId: selectedLab,
      serviceId: 1,
    };

    console.log("Received values:", formValuesWithSlot);

    axios
      .post(BASE_URL + "/dataservice/saveAppointment", formValuesWithSlot)
      .then((response) => {
        message.success("appointment booked ..!");
        console.log("Appointment submitted successfully:", response.data);
      })
      .catch((error) => {
        message.error("appointment failed  booked ..!");
        console.error("Error submitting appointment:", error.message);
      });
  };

  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedLab, setSelectedLab] = useState([]);

  const handleDateChange = (selectedDate) => {
    if (!selectedDate) {
      return;
    }
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    getAvailableTimeSlots(moment(formattedDate).startOf("day"), selectedLab);
  };

  const getAvailableTimeSlots = async (selectedDate, selectedLab) => {
    alert(selectedDate.format("YYYY-MM-DD"));
    try {
      const response = await axios.get(  BASE_URL +  `/dataservice/getAllSlotAvailabilityByLabIdAndDate?labId=${selectedLab}&date=${selectedDate.format("YYYY-MM-DD")}`);
      const responseData = response.data;
      const timeSlots = Array.isArray(responseData)
        ? responseData.map((result) => ({
            value: result.id,
            label: moment(result.slot, "HH:mm:ss").format("hh:mm A"),
          }))
        : [];

      console.log(response);
      setTimeSlots(timeSlots);
    } catch (error) {
      console.error("Error fetching time slots:", error.message);
    }
  };

  const handleTimeSlotClick = (time) => {
    const prevSelectedButton = document.querySelector(".time-slot-button.selected");
    if (prevSelectedButton) {
      prevSelectedButton.classList.remove("selected");
    }
    const selectedButton = document.getElementById(time.value);
    if (selectedButton) {
      selectedButton.classList.add("selected");
    }
    setSelectedTime(time.value);
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

  const handleChangeServices = (selected) => {
    setSelectedValues(selected);
    console.log(selectedValues);
  };

  // const handleServices = (value) => {
  //   axios
  //     .get(BASE_URL +`/dataservice/findAllShopServiceByLab/${selectedLab}/${value}`)
  //     .then((response) => {
  //       const searchService = response.data.map((result) => ({
  //         value: result.shopId,
  //         label: `${result.serviceName} - ${result.amount}`,
  //       }));
  //       setServiceDropdownOptions(searchService);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const allOption = { key: "all", label: "Select All" };
  
  const handleServices = (value) => {
    axios
      .get(BASE_URL + `/dataservice/findAllShopServiceByLab/${selectedLab}/${value}`)
      .then((response) => {
        const searchService = response.data.map((result, index) => ({
          key: result.id || index, // Use index if id is null
          label: `${result.serviceName} - ${result.amount}`,
        }));
  
        console.log("serviceDropdownOptions:", searchService);
        console.log("Selected Service:", value);
  
        // Set both options and selected value
        setServiceDropdownOptions(searchService);
        form.setFieldsValue({ serviceId: value });
      })
      .catch((error) => {
        console.error(error);
        // Handle the error or set default options if needed
        setServiceDropdownOptions([]); // Set default options to an empty array
      });
  };
  
  
  
  
  

  return (
    <Form form={form} onFinish={bookAppointmentForm} layout="vertical">
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
        label="Select Lab"
        name="shopId"
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
          {timeSlots.length > 0 ? (
            timeSlots.map((time) => (
              <Button
                key={time.value}
                id={time.value}
                className={`time-slot-button ${
                  selectedTime === time.value ? "selected" : ""
                }`}
                onClick={() => handleTimeSlotClick(time)}
              >
                {time.label}
              </Button>
            ))
          ) : (
            <p>No available time slots for the selected date</p>
          )}
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
        label="Select Service"
        name="serviceId"
        rules={[{ required: true, message: "Please select a service" }]}
      >
        <Select
          showSearch
          onSearch={handleServices}
          placeholder="Select a service"
          //optionFilterProp="label"
         // filterOption={filterOption}
          //options={serviceDropdownOptions}
          value={serviceDropdownOptions}
          onChange={handleChangeServices}
          mode="multiple"
        >
          <Select.Option key={allOption.key}>{allOption.label}</Select.Option>
        {serviceDropdownOptions.map((item) => (
          <Select.Option key={item.key}>{item.label}</Select.Option>
        ))}
      </Select>

{/* <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Select values"
        onChange={handleChange}
        value={selectedValues}
      >
        <Select.Option key={allOption.key}>{allOption.label}</Select.Option>
        {labOptions.map((item) => (
          <Select.Option key={item.key}>{item.label}</Select.Option>
        ))}
      </Select> */}
        
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
