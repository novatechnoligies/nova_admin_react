// AppointmentDetails.js
import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";

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
      {/* Add your appointment details rendering logic here */}
      <p>Name: {name}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default AppointmentDetails;
