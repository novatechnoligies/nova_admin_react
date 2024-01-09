import React from "react";
import { Form, Input, Button, InputNumber, Row, Col } from "antd";

const TestForm = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <Form
      name="testForm"
      onFinish={onFinish}
      layout="vertical"
    >
      {/* First Section - Top Row */}
      <Row gutter={16} >
        <h2>Ptient Summury</h2>
      </Row>

      {/* Second Section - Bottom Row */}
      <Row gutter={16}>
       <h2> Test Result</h2>
      </Row>

      
    </Form>
  );
};

export default TestForm;
