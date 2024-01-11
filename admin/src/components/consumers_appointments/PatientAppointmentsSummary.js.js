import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Avatar } from "antd";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import "./PatientAppointmentsSummary.css";
import { useParams } from "react-router-dom";

const PatientAppointmentsSummary = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [technicianName, setTechnicianName] = useState("");

  const { appointmentId } = useParams();

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    const userDataObject = JSON.parse(storedUserData);

    setTechnicianName(userDataObject.firstName);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/dataservice/getAllServicesByAppointmentIdAndPatientId?appointmentId=" +
            appointmentId
        );
        console.log(response.data);
        setAppointmentsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle error, such as setting an error state
      }
    };

    fetchData();
  }, []);

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
      <div className="apt-info-container" style={{ overflow: "scroll" }}>
        <div className="apt-info">
          {appointmentsData.length > 0 ? (
            appointmentsData.map((appointment, index) => (
              <div className="inline-info" key={index}>
                <div className="info-item">
                  <p>
                    <strong>Date/Time:</strong>
                    <br />
                    {`${appointment.appointmentDate} ${appointment.appointmentTime}`}
                  </p>
                  <p>
                    <strong>Service Name:</strong>
                    <br />
                    {appointment.serviceName}
                  </p>
                  <p>
                    <strong>Technician Name:</strong>
                    <br />
                    {technicianName}
                  </p>
                  <p>
                    <strong>Status:</strong> <br />
                    {appointment.appointmentStatus}
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
