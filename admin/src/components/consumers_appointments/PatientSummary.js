import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Avatar } from "antd";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import "./PatientSummary.css";
import { useParams } from "react-router-dom";

const PatientSummary = () => {
  const [patientData, setPatientData] = useState({});

  const { appointmentId } = useParams();
  useEffect(() => {
    fecthPatientDataByAppointmentId();

    // Fetch patient data from the API
  }, []);

  const fecthPatientDataByAppointmentId = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/dataservice/getPatientDetailsByAppointmentId?appointmentId=" +
          appointmentId
      );
      console.log(response.data);
      setPatientData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // Handle error, such as setting an error state
    }
  };

  return (
    <div className="card-container">
      <div className="profile-card">
        <Avatar size={100} src="" />
        <div style={{ padding: "0px", height: "80px" }}>
          <h2>{patientData.patientName}</h2>
          <p>{patientData.emailId}</p>
        </div>
        <div className="appointments-count">
          <div className="past-apts">
            <h3>
              {patientData.pastAppointmentsCount == null
                ? 0
                : patientData.pastAppointmentsCount}
              <br />
              <span>Past</span>
            </h3>
          </div>
          <div className="upcoming-apts">
            <h3>
              {patientData.upcomingAppointmentsCounts == null
                ? 0
                : patientData.upcomingAppointmentsCounts}
              <br />
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
            <strong>City:</strong>{" "}
            {patientData.city == null ? "Bangalore" : patientData.city}
          </div>
          <div>
            <strong>Zip Code:</strong> {patientData.zipCode}
          </div>
          <div>
            <strong>Member Status:</strong> {patientData.memberStatus}
          </div>
          <div>
            <strong>Registered Date:</strong> {patientData.appointmentDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSummary;
