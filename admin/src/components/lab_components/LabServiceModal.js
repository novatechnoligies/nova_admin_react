import React, {useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Checkbox, Card, Row, Col, Select, message } from 'antd';
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

const LabServiceModal = ({ visible, onCancel, onCreate}) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [serviceMaster, setServiceMaster] = useState([]);
  const [modalVisible, setModalVisible] = useState(visible); // Manage the visibility state

  useEffect(() => {
    if (!visible) {
      setModalVisible(false);
    }
    if (visible) {
      setModalVisible(true);
      getServiceMaster();
    }
  }, [visible, search]);

  const handleModalVisibility = () => {
    setModalVisible(!modalVisible);
    onCancel(); // Close the modal
  };
  
  // Get all service Master from API
  const getServiceMaster = () => {
    axios
      .get(BASE_URL + `/dataservice/findAllMaster`)
      .then((response) => {
        
        const serviceMasterFromApi = response.data.map((result) => ({
          id: result.id,
          name: result.name,
          description: result.description,
        }));
        setServiceMaster(serviceMasterFromApi);
        serviceMaster.forEach((item) => {
          console.log("Name:", item);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle checkbox with Amout
  const handleCheckboxChange = (serviceId) => {
    setServiceMaster((prevServices) =>
      prevServices.map((service) =>
        service.id === serviceId
          ? { ...service, isChecked: !service.isChecked }
          : service
      )
    );
  };

  const handleAmountChange = (serviceId, value) => {
    setServiceMaster((prevServices) =>
      prevServices.map((service) =>
        service.id === serviceId ? { ...service, amount: value } : service
      )
    );
  };

  // Onclick Save Service - Send data to server
  const handleAddServices = () => {
    const selected = serviceMaster.filter((service) => service.isChecked);
    setSelectedServices(selected);
    const shopIds = ["1", "2"]; // Replace this with your actual shopId values

    const jsonData = {
      shopIds: shopIds,
      masterShopRelationDTOs: selected,
    };

    console.log("json data here : "+JSON.stringify(jsonData));  
    axios.post(BASE_URL + '/dataservice/saveServiceListForMultiShop', jsonData)
      .then((response) => {
        message.success("Services Added Successfully");
        // Handle success, if needed
        console.log('Service list saved successfully:', response.data);
      })
      .catch((error) => {
        // Handle error, if needed
        console.error('Error saving service list:', error);
        message.error("Failed to add services to the lab")
      });
    //console.log(selected);
  };

const { Option } = Select;

const [selectedValues, setSelectedValues] = useState([]);

const handleChange = (selected) => {
  setSelectedValues(selected);
  console.log(selectedValues);
};

const yourData = [
  { key: 'value1', label: 'Value 1' },
  { key: 'value2', label: 'Value 2' },
  { key: 'value3', label: 'Value 3' },
  // Add more data as needed
];

const allOption = { key: 'all', label: 'Select All' };

const handleSelectAll = () => {
  const allKeys = yourData.map((item) => item.key);
  setSelectedValues(allKeys);
  console.log(selectedValues);
};

  return (
    <Modal
    title="Add Services which will be provided by Lab"
    visible={modalVisible}
    footer={[
      <Button key="cancel" onClick={handleModalVisibility}>
        Cancel
      </Button>,
      <Button
        key="submit"
        type="primary"
        onClick={handleAddServices}
        
        >
          Add Services
        </Button>,
      ]}
      onCancel={onCancel}
    >
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Select values"
        onChange={handleChange}
        value={selectedValues}
      >
        <Select.Option key={allOption.key}>{allOption.label}</Select.Option>
        {yourData.map((item) => (
          <Select.Option key={item.key}>{item.label}</Select.Option>
        ))}
      </Select>
      <br />
      <br />

     <Row gutter={[16, 16]}>
        {serviceMaster.map((service) => (
          <Col key={service.id} span={8}>
            <Card
              title={
                <>
                  <Checkbox
                    checked={service.isChecked}
                    onChange={() => handleCheckboxChange(service.id)}
                  >
                    {service.name}
                  </Checkbox>
                  <Form.Item label="Amount">
                    <Input
                      type="number"
                      disabled={!service.isChecked}
                      value={service.amount}
                      onChange={(e) =>
                        handleAmountChange(service.id, e.target.value)
                      }
                    />
                  </Form.Item>
                </>
              }
              style={{ width: "100%" }}
            >
              <p>{service.description}</p>
              {/* You can add more content here as needed */}
            </Card>
          </Col>
        ))}
      </Row>
    </Modal>
  );
};

export default LabServiceModal;
