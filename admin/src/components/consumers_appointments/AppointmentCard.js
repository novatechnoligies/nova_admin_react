// AppointmentCard.js
import React from "react";
import { Card, Avatar, message, Row, Col } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const { Meta } = Card;

const AppointmentCard = ({ data }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { photo, name, status, date, time } = data;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const labData = sessionStorage.getItem("labData");
        console.log("LabData from Session", labData);
        if (labData == null || labData == undefined) {
          message.warning("please select lab first");
        } else {
          const response = await axios.get(
            "http://localhost:8082/dataservice/getTodaysAppointemtsByLabId?labId=" +
              labData +
              "&date=2023-12-19"
          );

          console.log("Is Lab ID coming", response);
          const responseData = response.data;
          const isArray = Array.isArray(responseData);

          if (!isArray && responseData) {
            // If responseData is not an array but truthy, convert it to an array
            setAppointments([responseData]);
          } else {
            setAppointments(responseData || []); // Ensure appointments is an array
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle error, such as setting an error state
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (appointmentId) => {
    // Navigate to the appointment details page
    navigate(`/appointment-details/${appointmentId}`); // You can customize the URL as needed
  };

  const statusColors = {
    booked: "#ff8c8f",
    closed: "#a0d9a0",
    inProgress: "#ffd700",
    reportReady: "#add8e6",
  };

  // const cardStyle = {
  //   width: 350,
  //   margin: 5,
  //   border: `5px solid ${statusColors[status] || "gray"}`,
  //   cursor: "pointer", // Add cursor pointer to indicate it's clickable
  // };

  const headerStyle = {
    background: statusColors[status] || "gray",
    color: "white",
    padding: 2,
    borderBottom: "2px solid white",
  };

  return (
    <div>
      {loading && <p>Loading appointments...</p>}
      {!loading && appointments.length === 0 && (
        <p>No appointments available.</p>
      )}

      {!loading &&
        (Array.isArray(appointments) && appointments.length === 0 ? (
          <p>No appointments available.</p>
        ) : (
          <Row gutter={[16, 16]}>
            {appointments.map((appointment, index) => (
              <Col key={index} span={6} style={{ marginBottom: 10 }}>
                <Card
                  style={{
                    width: 250,
                    height:330,
                    backgroundColor:"whitesmoke",
                    border: `5px solid ${
                      statusColors[appointment.appointmentStatus] || "gray"
                    }`,
                    cursor: "pointer",
                  }}
                  bordered={true}
                  onClick={() => handleCardClick(appointment.appointmentId)}
                >
                  <div>
                    <div style={headerStyle}>
                      <p>Your Appointment</p>
                    </div>
                    <div style={headerStyle}>
                      <input
                        type="text"
                        name="appontmentId"
                        value={appointment.appointmentId}
                        hidden
                      />
                    </div>
                    <div style={{ display: "flex" }}>
                      <div>
                        <h3
                          style={{
                            marginTop: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>{appointment.patientName}</span>
                          <div style={{ margin:"auto"}}>
                            {/* Replace the following line with the actual avatar component */}
                            <Avatar size={80} src={appointment.patientAvatar} />
                          </div>
                        </h3>
                        <div>
                          <p style={headerStyle}>
                            Status: {appointment.appointmentStatus}
                          </p>
                          <div>
                            <p style={{ marginBottom: 0 }}>
                              <span style={{ borderBottom: "1px solid #000" }}>
                                {moment(appointment.appointmentDate).format(
                                  "MMMM Do YYYY"
                                )}{" "}
                                /
                                {moment(
                                  appointment.appointmentTime,
                                  "HH:mm:ss"
                                ).format("h:mm A")}
                              </span>
                            </p>
                            <p style={{ marginTop: 0 }}>
                              Appointment Date/Time
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ))}
    </div>
  );
};

export default AppointmentCard;
