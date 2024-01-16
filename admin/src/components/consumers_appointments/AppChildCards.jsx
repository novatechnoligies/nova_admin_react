// AppChildCards.js
import React, { useState, useEffect } from "react";
import { NavLink, Route, useNavigate } from "react-router-dom";
import { Card_Data } from "./AcardData";
import { Button, Checkbox } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import itac from "./itac.jpg";
import AppointmentCard from "./AppointmentCard";

const AppChildCards = () => {
  const handleBookAppointment = () => {
    navigate("/appointment-booking");
  };

  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
        }}
      >
        <Button type="primary" onClick={handleBookAppointment}>
          <PlusOutlined /> Book an Appointment
        </Button>
      </div>
      <div>
        <h2 className="section_title">Today's Appointments</h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <AppointmentCard />
        </div>
      </div>
    </div>
  );
};

export default AppChildCards;
