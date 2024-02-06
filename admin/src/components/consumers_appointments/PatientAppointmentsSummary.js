import React, { useState } from "react";
import { Button } from "antd";
import "./PatientAppointmentsSummary.css";
import PatientPastAppointments from "./PatientPastAppointments";
import PatientCurrentAppointments from "./PatientCurrentAppointments";

const PatientAppointmentsSummary = () => {
  const [viewType, setViewType] = useState("current");

  const handleViewTypeChange = (newViewType) => setViewType(newViewType);

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

      {viewType === "current" ? (
        <PatientCurrentAppointments />
      ) : (
        <PatientPastAppointments />
      )}
    </div>
  );
};

export default PatientAppointmentsSummary;
