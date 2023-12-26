// AppChildCards.js
import React, { useState, useEffect  } from "react";
import { NavLink, Route , useNavigate} from "react-router-dom";
import { Card_Data } from "./AcardData";
import { Button ,Checkbox } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import itac from "./itac.jpg";
import AppointmentCard from "./AppointmentCard";


const AppChildCards = () => {
  
  const handleBookAppointment = () => {
    navigate('/appointment-booking');
  };
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const appointmentsData = [
    {
      photo: "url_to_photo_1.jpg",
      name: "John Doe",
      status: "booked",
      date: "2023-01-01",
      time: "14:30:00",
    },
    {
      photo: "url_to_photo_2.jpg",
      name: "Jane Doe",
      status: "closed",
      date: "2023-01-02",
      time: "10:00:00",
    },
    {
      photo: "url_to_photo_1.jpg",
      name: "John Doe",
      status: "booked",
      date: "2023-01-01",
      time: "14:30:00",
    },
    {
      photo: "url_to_photo_2.jpg",
      name: "Jane Doe",
      status: "reportReady",
      date: "2023-01-02",
      time: "10:00:00",
    },
    {
      photo: "url_to_photo_1.jpg",
      name: "John Doe",
      status: "booked",
      date: "2023-01-01",
      time: "14:30:00",
    },
    {
      photo: "url_to_photo_2.jpg",
      name: "Jane Doe",
      status: "closed",
      date: "2023-01-02",
      time: "10:00:00",
    },    {
      photo: "url_to_photo_1.jpg",
      name: "John Doe",
      status: "inProgress",
      date: "2023-01-01",
      time: "14:30:00",
    },
    {
      photo: "url_to_photo_2.jpg",
      name: "Jane Doe",
      status: "inProgress",
      date: "2023-01-02",
      time: "10:00:00",
    },
    // Add more appointment objects as needed
  ];

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
          {appointmentsData.map((appointment, index) => (
            <AppointmentCard key={index} data={appointment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppChildCards;