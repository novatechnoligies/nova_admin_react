import React from "react";
import './AvailableServices.css';
import {Row, Col, Table, Button} from "antd";



const AvailableService = () => {

    const pricingData = [
        { plan: 'Basic Price', price: '$10/month' },
        { plan: 'GST', price: '$20/month' },
        { plan: 'Discount', price: '$30/month' },
        { plan: 'Net Price', price: '$50/month' },
      ];
      
      const columns = [
        {
          title: 'Price(in Rs)',
          dataIndex: 'plan',
          key: 'plan',
        },
        {
          dataIndex: 'price',
          key: 'price',
        },
      ];

      const tableStyle = {
        marginTop: '0px',
        // Adjust row height and font size
        rowHeight: 1, // You can adjust this value
        fontSize: 14, // You can adjust this value
      };

    
    return (
        <div className="service-container">
            <div className="filter-section">
                <div className="filter-forms">
                    <label htmlFor="sort">Sort By:</label>
                    <select id="sort">
                    <option value="">None</option>
                    <option value="price">Price</option>
                    </select>
                    <label htmlFor="search">Search:</label>
                    <input
                    type="text"
                    id="search"
                    />
                    <Button className="ant-btn ant-btn-primary" style={{marginLeft:"10px"}}>Add Services</Button>
                </div>              
            </div> <br/>

            <div className="service-card-header">
                <h2>Blood Test</h2>
                <div className="service-card-ratings">
                    4.5
                    <span>⭐⭐⭐⭐⭐</span> {/* You can use any appropriate representation for ratings */}
                </div>
            </div>

            <div className="card-description-section">
            <div>
          <Row gutter={16}>
             
              <Col span={18}>
                  <div style={{ padding: '20px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                      <h2>Description</h2> 
                  </div>
                  
              </Col>

              
              <Col span={6}>
                  <div style={{ padding: '20px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                      {/* <h2>price section</h2> */}
                      <Table className="custom-table" dataSource={pricingData} columns={columns} pagination={false} style={tableStyle} />
                      <Button style={{background:"red", color:"white", marginLeft:"40px", marginTop:"20px"}}>Update Price</Button>
                  </div>
              </Col>
          </Row>
</div>
            </div>
        </div>
    )
}
export default AvailableService;