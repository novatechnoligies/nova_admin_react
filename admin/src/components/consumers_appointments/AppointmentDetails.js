// AppointmentDetails.js
import React from "react";
import { useParams } from "react-router-dom";
import { Button,  Row, Col  } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import PatientSummary from "./PatientSummary";
import Notes from "./Notes";
import PatientAppointmentsSummary from "./PatientAppointmentsSummary.js";
import FileDocument from "./FileDocument.js";

const AppointmentDetails = () => {
  const { name } = useParams();

  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={goBack}
          style={{ fontSize: "18px", marginRight: "10px" }}
        />
        <h2>Appointment Details</h2>
      </div>
      <div>
      <Row gutter={16}>
        {/* First Section - Takes up 8 columns */}
        <Col span={16}>
          {/* Your content for the first section */}
          <div style={{ border: "1px solid #ddd", padding: "10px" }}>
            <PatientSummary />
            <PatientAppointmentsSummary />
          </div>
        </Col>

        {/* Second Section - Takes up 4 columns */}
        <Col span={8}>
          {/* Your content for the second section */}
          <div style={{ border: "1px solid #ddd", padding: "10px" }}>
            <Notes />
            <FileDocument />
          </div>
        </Col>
      </Row>
    </div>
     
    </div>
  );
};

export default AppointmentDetails;
