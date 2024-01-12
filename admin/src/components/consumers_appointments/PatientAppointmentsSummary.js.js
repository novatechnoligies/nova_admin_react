import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PatientAppointmentsSummary.css";

const PatientAppointmentsSummary = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [technicianName, setTechnicianName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { appointmentId } = useParams();

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    const userDataObject = JSON.parse(storedUserData);
  
    setTechnicianName(userDataObject.firstName);
  
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/dataservice/getAllServicesByAppointmentIdAndPatientId?appointmentId=${appointmentId}`
        );
        console.log("API Response:", response.data);
  
        // Make sure response.data is an array
        if (Array.isArray(response.data)) {
          setAppointmentsData(response.data);
        } else {
          console.error("Data received is not an array:", response.data);
          setError("Error fetching data. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [appointmentId]);

  
  // useEffect(() => {
  //   const storedUserData = sessionStorage.getItem("userData");
  //   const userDataObject = JSON.parse(storedUserData);

  //   setTechnicianName(userDataObject.firstName);

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8082/dataservice/getAllServicesByAppointmentIdAndPatientId?appointmentId=${appointmentId}`
  //       );
  //       setAppointmentsData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error.message);
  //       setError("Error fetching data. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [appointmentId]);

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
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
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
        )}
      </div>
    </div>
  );
};

export default PatientAppointmentsSummary;
