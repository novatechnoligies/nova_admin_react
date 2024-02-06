import React, { useState } from "react";
import { Button } from "antd";
import "./PatientAppointmentsSummary.css";

import LabTestResultsEntry from "./LabTestResultsEntry";

import PatientPastAppointments from "./PatientPastAppointments";
import PatientCurrentAppointments from "./PatientCurrentAppointments";



const PatientAppointmentsSummary = () => {
  const [viewType, setViewType] = useState("current");

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


      {/* Display Appointments based on the selected viewType */}
      {viewType === "current" ? (
        <PatientCurrentAppointments handleInfoItemClick={handleInfoItemClick} />
      ) : (
        <PatientPastAppointments />
      )}
    </div>
  );
};

export default PatientAppointmentsSummary;
