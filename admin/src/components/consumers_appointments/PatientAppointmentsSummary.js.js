import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Avatar } from "antd";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import "./PatientAppointmentsSummary.css";

const PatientAppointmentsSummary = () => {
  // Replace this with actual data from API
  const [appointments, setAppointments] = useState([
    {
      dateAndTime: "2024-01-04 14:30",
      serviceName: "Medical Checkup",
      technicianName: "Dr. John Doe",
      status: "Pending",
    },
    {
      dateAndTime: "2024-01-05 10:00",
      serviceName: "Dental Cleaning",
      technicianName: "Dr. Jane Smith",
      status: "Confirmed",
    },
    {
      dateAndTime: "2024-01-06 15:45",
      serviceName: "Eye Examination",
      technicianName: "Dr. Mike Johnson",
      status: "Completed",
    },
    {
      dateAndTime: "2024-01-07 12:15",
      serviceName: "Blood Test",
      technicianName: "Dr. Sarah Brown",
      status: "Pending",
    },
    // Add more appointments as needed
  ]);

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
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div className="inline-info" key={index}>
                <div className="info-item">
                  <p>
                    <strong>Date/Time:</strong>
                    <br />
                    {appointment.dateAndTime}
                  </p>
                  <p>
                    <strong>Service Name:</strong>
                    <br />
                    {appointment.serviceName}
                  </p>
                  <p>
                    <strong>Technician Name:</strong>
                    <br />
                    {appointment.technicianName}
                  </p>
                  <p>
                    <strong>Status:</strong> <br />
                    {appointment.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No current appointments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientAppointmentsSummary;
