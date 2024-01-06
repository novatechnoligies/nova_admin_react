import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Avatar } from "antd";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import "./PatientSummary.css";

const PatientSummary = () => {
  const [patientData, setPatientData] = useState({
    name: "",
    email: "",
    imageUrl: "",
    pastAppointments: 0,
    upcomingAppointments: 0,
    gender: "",
    birthday: "",
    phoneNumber: "",
    address: "",
    city: "",
    zipCode: "",
    memberStatus: "",
    registeredDate: "",
  });

  useEffect(() => {
    // Fetch patient data from the API
    axios.get(`${BASE_URL}/patient`).then((response) => {
      const data = response.data;
      setPatientData({
        name: data.name,
        email: data.email,
        imageUrl: data.imageUrl,
        pastAppointments: data.pastAppointments,
        upcomingAppointments: data.upcomingAppointments,
        gender: data.gender,
        birthday: data.birthday,
        phoneNumber: data.phoneNumber,
        address: data.address,
        city: data.city,
        zipCode: data.zipCode,
        memberStatus: data.memberStatus,
        registeredDate: data.registeredDate,
      });
    });
  }, []);

  return (
    <div className="card-container">
      <div className="profile-card">
        <Avatar size={100} src="" />
        <div style={{ padding: "0px", height: "80px" }}>
          <h2>John Doe</h2>
          <p>Test@gmail.com</p>
        </div>
        <div className="appointments-count">
          <div className="past-apts">
            <h3>
              15 <br />
              <span>Past</span>
            </h3>
          </div>
          <div className="upcoming-apts">
            <h3>
              2 <br />
              <span>Upcoming</span>
            </h3>
          </div>
        </div>
        <Button className="primary w-900">Send Message</Button>
      </div>
      <div className="profile-details">
        <div className="profile-details-grid">
          <div>
            <strong>Gender:</strong> {patientData.gender}
          </div>
          <div>
            <strong>Birthday:</strong> {patientData.birthday}
          </div>
          <div>
            <strong>Phone Number:</strong> {patientData.phoneNumber}
          </div>
          <div>
            <strong>Address:</strong> {patientData.address}
          </div>
          <div>
            <strong>City:</strong> {patientData.city}
          </div>
          <div>
            <strong>Zip Code:</strong> {patientData.zipCode}
          </div>
          <div>
            <strong>Member Status:</strong> {patientData.memberStatus}
          </div>
          <div>
            <strong>Registered Date:</strong> {patientData.registeredDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSummary;
