import React, { useState, useEffect } from "react";
import "./AvailableServices.css";
import { Row, Col, Table, Button } from "antd";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

const AvailableService = () => {
  const [serviceSummary, setServiceSummary] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getServiceSummary();
  }, [search]);

  const getServiceSummary = () => {
    // const storedLabData = sessionStorage.getItem('labData');
    // const labDataObject = JSON.parse(storedLabData);

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
          testDescription:result.testDescription,
        }));
        setServiceSummary(serviceSummaryFromApi);
        console("setServiceSummary"+ setServiceSummary);

      })
      .catch((error) => {
        console.error(error);
      });
  };

  const calculateNetPrice = (amount) => {
    // Default GST to 18%
    const gst = (18 / 100) * amount;
    const netPrice = amount + gst;
    return netPrice;
  };

  const columns = [
    { title: "Price (in Rs)", dataIndex: "plan", key: "plan" },
    { dataIndex: "price", key: "price" },
  ];

  return (
    <div className="main-container">
       <div className="filter-section"> 
        <div className="filter-forms">
          <label htmlFor="sort">Sort By:</label>
          <select id="sort">
            <option value="">None</option>
            <option value="price">Price</option>
          </select>
          <label htmlFor="search">Search:</label>
          <input type="text" id="search" />
          <Button
            className="ant-btn ant-btn-primary"
            style={{ marginLeft: "10px" }}
          >
            Add Services
          </Button>
        </div>
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
                      { plan: "Service Price", price: `₹${service.amount}` },
                      {
                        plan: "GST (18%)",
                        price: `₹${(18 / 100) * service.amount}`,
                      },
                      { plan: "Discount", price: "₹0" },
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
                  <Button
                    style={{
                      background: "red",
                      color: "white",
                      marginLeft: "40px",
                      marginTop: "20px",
                    }}
                  >
                    Update Price
                  </Button>
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
