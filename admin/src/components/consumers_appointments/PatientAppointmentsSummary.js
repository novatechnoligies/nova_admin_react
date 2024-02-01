import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PatientAppointmentsSummary.css";
import LabTestResultsEntry from "./LabTestResultsEntry";

const PatientAppointmentsSummary = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [technicianName, setTechnicianName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLabTestModal, setShowLabTestModal] = useState(false);
  const [modalWidth, setModalWidth] = useState(700);
  const [viewType, setViewType] = useState("current"); // "current" or "past"

  const { appointmentId } = useParams();

  useEffect(() => {
    console.log("View Type:", viewType);
    console.log("Appointments Data:", appointmentsData);

    const storedUserData = sessionStorage.getItem("userData");
    const userDataObject = JSON.parse(storedUserData);

    setTechnicianName(userDataObject.firstName);

    const fetchData = async () => {
      /*If the console log indicates that the viewType is correctly 
      set to "past," and you are still not seeing the expected data for past 
      appointments, consider the following steps: Check API Response for "Past" Appointments: 
      spect the API response for past appointments to ensure that the 
      API is returning the expected data. Log the entire response and 
      examine the data structure for past appointments. */
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
  }, [appointmentId, viewType]);

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

  const handleInfoItemClick = (appointment) => {
    // Additional logic if needed before showing the modal
    setShowLabTestModal(true);
  };

  const handleModalCancel = () => {
    // Additional logic if needed before closing the modal
    setShowLabTestModal(false);
  };

  const handleViewTypeChange = async (newViewType) => {
    // Update the view type and fetch data for the selected type
    setViewType(newViewType);
    // Simulate fetching data for past appointments
    if (newViewType === "past") {
      try {
        // Simulate an asynchronous delay (you can remove this in a real scenario)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dummy data for past appointments - Need to integrate Past Appointments from the API Later
        const dummyPastAppointments = [
          {
            appointmentDate: "2023-01-01",
            appointmentTime: "09:00 AM",
            serviceName: "Dummy Service 1",
            technicianName: "John Doe",
            appointmentStatus: "Completed",
          },
          {
            appointmentDate: "2023-02-01",
            appointmentTime: "02:30 PM",
            serviceName: "Dummy Service 2",
            technicianName: "Jane Smith",
            appointmentStatus: "Completed",
          },
          // Add more dummy data as needed
        ];

        // Set the dummy data for past appointments
        setAppointmentsData(dummyPastAppointments);
      } catch (error) {
        console.error("Error fetching dummy data:", error.message);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-appointments-container">
      <div className="btn-appointments">
        <Button
          type={viewType === "current" ? "primary" : "default"}
          onClick={() => handleViewTypeChange("current")}
        >
          Current Appointments
        </Button>
        <Button
          type={viewType === "past" ? "primary" : "default"}
          onClick={() => handleViewTypeChange("past")}
        >
          Past Appointments
        </Button>
        <Button type="default">Medical Record</Button>
      </div>
      <div className="apt-info-container" style={{ overflow: "scroll" }}>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <div className="apt-info">
            {appointmentsData.length > 0 ? (
              appointmentsData.map((appointment, index) => (
                <div
                  className="inline-info clickable"
                  key={index}
                  onClick={() => handleInfoItemClick(appointment)}
                >
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
              <p>
                No {viewType === "current" ? "current" : "past"} appointments
              </p>
            )}
          </div>
        )}
      </div>
      {/* Lab Test Entry Modal */}
      <Modal
        width={modalWidth}
        visible={showLabTestModal}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            Back
          </Button>,
        ]}
      >
        {/* Add Lab Test Entry Form or content here */}
        {/* You can use LabTestEntry component or include the form directly */}
        <LabTestResultsEntry />
      </Modal>
    </div>
  );
};

export default PatientAppointmentsSummary;
