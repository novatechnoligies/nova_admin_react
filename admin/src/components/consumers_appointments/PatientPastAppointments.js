import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PatientPastAppointments.css";

const PatientPastAppointments = () => {
  const [pastAppointments, setPastAppointments] = useState([]);

  useEffect(() => {
    const fetchPastAppointments = async () => {
      try {
        const labData = sessionStorage.getItem("labData");
        console.log("LabData from Session", labData);
        const response = await axios.get(
          `http://localhost:8082/dataservice/getPastAppointmentsByLabIdAndPatientId?labId=${labData}&patientId=1`
        );
        console.log("API Response for Past Appointments:", response.data);
        setPastAppointments(response.data || []); // Set an empty array if response.data is falsy
      } catch (error) {
        console.error("Error fetching past appointments:", error);
      }
    };

    fetchPastAppointments();
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  return (
    <div className="p-appointments-container">
      <div className="apt-info-container" style={{ overflow: "scroll" }}>
        <div className="apt-info">
          {pastAppointments.length > 0 ? (
            <div className="inline-info clickable">
              {pastAppointments.map((appointment) => (
                <div className="info-item" key={appointment.appointmentId}>
                  <p>
                    <strong>Date/Time:</strong> {appointment.appointmentDate}
                  </p>
                  <p>
                    <strong>Service Name:</strong>{" "}
                    {appointment.serviceName || "N/A"}
                  </p>
                  <p>
                    <strong>Technician Name:</strong>{" "}
                    {appointment.technicianName || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {appointment.appointmentStatus || "N/A"} <br />
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No past appointments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientPastAppointments;
