import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PatientCurrentAppointments.css";
import { useParams } from "react-router-dom";

const PatientCurrentAppointments = () => {
  const [currentAppointmentsData, setCurrentAppointmentsData] = useState([]);
  const [technicianName, setTechnicianName] = useState("");
  const [error, setError] = useState(null);

  const { appointmentId } = useParams();

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    const userDataObject = JSON.parse(storedUserData);
    setTechnicianName(userDataObject.firstName);

    const fetchCurrentAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/dataservice/getAllServicesByAppointmentIdAndPatientId?appointmentId=${appointmentId}`
        );

        if (Array.isArray(response.data)) {
          setCurrentAppointmentsData(response.data);
        } else {
          console.error("Data received is not an array:", response.data);
          setError("Error fetching data. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(
          `Error fetching data. ${error.response?.data || "Please try again."}`
        );
      }
    };

    fetchCurrentAppointments();
  }, [appointmentId]);

  return (
    <div className="p-appointments-container">
      <div className="apt-info-container" style={{ overflow: "scroll" }}>
        <div className="apt-info">
          {currentAppointmentsData.length > 0 ? (
            <div className="inline-info clickable">
              {currentAppointmentsData.map((appointment, index) => (
                <div className="info-item" key={index}>
                  <p>
                    <strong>Date/Time:</strong>{" "}
                    {`${appointment.appointmentDate} ${appointment.appointmentTime}`}
                  </p>
                  <p>
                    <strong>Service Name:</strong> {appointment.serviceName}
                  </p>
                  <p>
                    <strong>Technician Name:</strong> {technicianName}
                  </p>
                  <p>
                    <strong>Status:</strong> {appointment.appointmentStatus}{" "}
                    <br />
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No appointments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientCurrentAppointments;
