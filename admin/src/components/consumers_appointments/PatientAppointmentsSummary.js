import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PatientAppointmentsSummary.css";
import LabTestResultsEntry from "./LabTestResultsEntry";
import PatientPastAppointments from "./PatientPastAppointments";
import PatientCurrentAppointments from "./PatientCurrentAppointments";

const PatientAppointmentsSummary = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [technicianName, setTechnicianName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLabTestModal, setShowLabTestModal] = useState(false);
  const [modalWidth, setModalWidth] = useState(700);
  const [viewType, setViewType] = useState("current"); // "current" or "past"

  const handleInfoItemClick = (appointment) => {
    setShowLabTestModal(true);
  };

  const handleModalCancel = () => {
    setShowLabTestModal(false);
  };

  const handleViewTypeChange = (newViewType) => {
    setViewType(newViewType);
  };

  return (
    <div>
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

      {/* Display Appointments based on the selected viewType */}
      {viewType === "current" ? (
        <PatientCurrentAppointments handleInfoItemClick={handleInfoItemClick} />
      ) : (
        <PatientPastAppointments />
      )}

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
