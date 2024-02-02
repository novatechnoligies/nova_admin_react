import React, { useState, useEffect } from "react";
import "./AvailableServices.css";
import { Row, Col, Table, Button, Input } from "antd";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

const AvailableService = () => {
  const [serviceSummary, setServiceSummary] = useState([]);
  const [search, setSearch] = useState("");
  const [editedServicePrices, setEditedServicePrices] = useState({});

  useEffect(() => {
    getServiceSummary();
  }, [search]);

  const getServiceSummary = () => {
    axios
      .get(BASE_URL + `/dataservice/findAllShopServiceByLab/1`)
      .then((response) => {
        const serviceSummaryFromApi = response.data.map((result) => ({
          id: result.serviceId,
          shopName: result.shopName,
          serviceName: result.serviceName,
          amount: result.amount,
          shopId: result.shopId,
          serviceId: result.serviceId,
          testDescription: result.testDescription,
        }));
        setServiceSummary(serviceSummaryFromApi);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const calculateNetPrice = (amount) => {
    const gst = (18 / 100) * amount;
    const netPrice = amount + gst;
    return netPrice;
  };

  const columns = [
    { title: "Price (in Rs)", dataIndex: "plan", key: "plan" },
    { dataIndex: "price", key: "price" },
  ];

  const handleUpdatePrice = (serviceId) => {
    setEditedServicePrices((prevEditedServicePrices) => ({
      ...prevEditedServicePrices,
      [serviceId]: serviceSummary.find((s) => s.id === serviceId).amount,
    }));
  };

  const saveUpdatedPrice = (serviceId) => {
    // Call API to update the service price with editedServicePrices[serviceId]
    // You should implement this part based on your API structure
    // After updating, refresh the service data
    const updatedServicePrices = { ...editedServicePrices };
    delete updatedServicePrices[serviceId];
    setEditedServicePrices(updatedServicePrices);
    getServiceSummary();
  };

  return (
    <div className="main-container">
      <div className="filter-section">
        <h3>Available Services</h3>
        <Input
          type="search"
          id="search"
          placeholder="Search Available Service"
        />
        <Button
          className="ant-btn ant-btn-primary"
          style={{ marginLeft: "10px" }}
        >
          Add Services
        </Button>
      </div>
      <div className="scrollable-section">
        {serviceSummary.map((service) => (
          <div key={service.id} className="service-item">
            <div className="service-header">
              <h2 style={{ paddingLeft: "10px" }}>{service.serviceName}</h2>{" "}
              <div className="service-ratings">
                4.5
                <span>⭐⭐⭐⭐⭐</span>
              </div>
            </div>

            <Row gutter={16}>
              <Col span={18}>
                <div
                  style={{
                    padding: "20px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                  }}
                >
                  <h2>Description:</h2>
                  {service.testDescription}
                </div>
              </Col>
              <Col span={6}>
                <div
                  style={{
                    padding: "20px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                  }}
                >
                  <Table
                    className="custom-table"
                    dataSource={[
                      {
                        plan: "Service Price",
                        price:
                          editedServicePrices[service.id] !== undefined ? (
                            <Input
                              type="number"
                              value={
                                editedServicePrices[service.id] ||
                                service.amount
                              }
                              onChange={(e) =>
                                setEditedServicePrices((prev) => ({
                                  ...prev,
                                  [service.id]: e.target.value,
                                }))
                              }
                            />
                          ) : (
                            `₹${service.amount}`
                          ),
                      },
                      {
                        plan: "GST (18%)",
                        price: `₹${(18 / 100) * service.amount}`,
                      },
                      { plan: "Discount", price: "null" },
                      {
                        plan: "Net Price",
                        price: `₹${calculateNetPrice(service.amount).toFixed(
                          2
                        )}`,
                      },
                    ]}
                    columns={columns}
                    pagination={false}
                  />
                  {editedServicePrices[service.id] !== undefined ? (
                    <Button
                      onClick={() => saveUpdatedPrice(service.id)}
                      style={{
                        background: "red",
                        color: "white",
                        marginLeft: "40px",
                      }}
                    >
                      Save Price
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleUpdatePrice(service.id)}
                      style={{
                        background: "red",
                        color: "white",
                        marginLeft: "40px",
                      }}
                    >
                      Update Price
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableService;
