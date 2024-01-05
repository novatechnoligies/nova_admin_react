import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Avatar } from "antd";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import "./PatientAppointmentsSummary.css";

const PatientAppointmentsSummary = () => {
  // Testing with Dummy Data
  const [currentAppointment, setCurrentAppointment] = useState({
    dateAndTime: "2024-01-04 14:30", // Replace with your actual date and time
    serviceName: "Medical Checkup",
    technicianName: "Dr. John Doe",
    status: "Pending",
  });

  //   useEffect(() => {
  //     // Fetch data from the API
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${BASE_URL}/api/appointments/current`
  //         );
  //         setCurrentAppointment(response.data); // Assuming the API response contains the necessary data
  //       } catch (error) {
  //         console.error("Error fetching appointment data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  return (
    <div className="p-appointments-container">
      <div className="btn-appointments">
        <a href="#" className="appointment-button">
          Current Appointments
        </a>
        <a href="#" className="appointment-button">
          Past Appointments
        </a>
        <a href="#" className="appointment-button">
          Medical Record
        </a>
      </div>
      <div className="apt-info-container">
        <div className="apt-info">
          {currentAppointment ? (
            <div className="inline-info">
              <div className="info-item">
                <p>
                  <strong>Date/Time:</strong>
                  <br />
                  {currentAppointment.dateAndTime}
                </p>
                <p>
                  <strong>Service Name:</strong>
                  <br />
                  {currentAppointment.serviceName}
                </p>
                <p>
                  <strong>Technician Name:</strong>
                  <br />
                  {currentAppointment.technicianName}
                </p>
                <p>
                  <strong>Status:</strong> <br />
                  {currentAppointment.status}
                </p>
              </div>
            </div>
          ) : (
            <p>No current appointments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientAppointmentsSummary;
