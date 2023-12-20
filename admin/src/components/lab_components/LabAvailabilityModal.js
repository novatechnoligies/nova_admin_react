import {React, useState} from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
  TimePicker,
  Card,
  message,
} from "antd";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import moment from "moment";
import LabFormModal from "./LabFormModal";
import LabServiceModal from "./LabServiceModal";


const LabAvailabilityModal = ({ visible, onCancel, onCreate }) => {
  const [availibilityForm] = Form.useForm();
  const [labDropdownOptions, setLabDropdownOptions] = useState([]);
  const [shopData,setShopData] =useState([]);
  
  const handleFinish = async (values) => {
    try {
      console.log(values);
      handleShopAvailibilityModalPost(values);
      availibilityForm.resetFields();
    } catch (error) {
      console.error("Error creating lab:", error);
    }
  };

  const handleShopAvailibilityModalPost = async (values) => {
    const modifiedData = {
      ...formattedData,
      shop: { id: values.shop },
    };
    console.log("Form values:", modifiedData);
    axios
      .post(BASE_URL + "/dataservice/saveShopAvailability", modifiedData)
      .then((response) => {
        message.success("successfully!");
        console.log("Post request successful:", response.data.id);
      })
      .catch((error) => {
        console.error("Post request error:", error);
      });
  };

  const formattedData = {
    fromDate: moment("2023-12-19T07:41:05.068Z").format("YYYY-MM-DD"),
    toDate: moment("2023-12-20T07:41:07.148Z").format("YYYY-MM-DD"),
    fromTime: moment("2023-12-18T21:30:00.146Z").format("HH:mm"),
    toTime: moment("2023-12-19T00:30:00.864Z").format("HH:mm"),
    timeInterval: "30",
    holidays: ["Saturday"],
    shop: 2,
  };

//   Search Shop Dropdown
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

const filterOption = (input, option) => {
  if (option && option.label) {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }
  return false;
};



  return (
    <Modal
      title="Welcome to Nova Update Shop Availability here"
      visible={visible}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={availibilityForm.submit}>
          Update Availibility
        </Button>,
      ]}
      onCancel={() => {
        onCancel();
        availibilityForm.resetFields();
      }}
    >
      <Form
        form={availibilityForm}
        name="registration_form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="id"
          name="id"
          hidden 
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
            />
          </Form.Item>

        <Form.Item
          label="Start Date"
          name="fromDate"
          rules={[{ required: true, message: "Please enter the start date" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="toDate"
          rules={[{ required: true, message: "Please enter the end date" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="holidays"
          label="Holidays:"
          rules={[
            { required: true, message: "Please select at least one day!" },
          ]}
        >
          <Checkbox.Group style={{ display: "flex", flexDirection: "column" }}>
            <Checkbox value="Monday" style={{ marginLeft: "8px" }}>
              Monday
            </Checkbox>
            <Checkbox value="Tuesday">Tuesday</Checkbox>
            <Checkbox value="Wednesday">Wednesday</Checkbox>
            <Checkbox value="Thursday">Thursday</Checkbox>
            <Checkbox value="Friday">Friday</Checkbox>
            <Checkbox value="Saturday">Saturday</Checkbox>
            <Checkbox value="Sunday">Sunday</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          label="Open Time"
          name="fromTime"
          rules={[{ required: true, message: "Please enter the open time" }]}
        >
          <TimePicker format="HH:mm" />
        </Form.Item>

        <Form.Item
          label="Close Time"
          name="toTime"
          rules={[{ required: true, message: "Please enter the open time" }]}
        >
          <TimePicker format="HH:mm" />
        </Form.Item>

        <Form.Item
          label="Intervals"
          name="timeInterval"
          rules={[{ required: true, message: "Please enter the open time" }]}
        >
          <Input />
        </Form.Item>
      </Form>

      <LabServiceModal visible={visible} onCancel={onCancel} onCreate={onCreate} shopData={shopData} />
    </Modal>
  );
};

export default LabAvailabilityModal;
