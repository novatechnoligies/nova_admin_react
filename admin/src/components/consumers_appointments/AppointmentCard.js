// AppointmentCard.js
import React from "react";
import { Card, Avatar } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const AppointmentCard = ({ data }) => {
  const { photo, name, status, date, time } = data;
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to the appointment details page
    navigate(`/appointment-details/${name}`); // You can customize the URL as needed
  };

  const statusColors = {
    booked: "#ff8c8c",
    closed: "#a0d9a0",
    inProgress: "#ffd700",
    reportReady: "#add8e6",
  };

  const cardStyle = {
    width: 350,
    margin: 5,
    border: `2px solid ${statusColors[status] || "gray"}`,
    cursor: "pointer", // Add cursor pointer to indicate it's clickable
  };

  const headerStyle = {
    background: statusColors[status] || "gray",
    color: "white",
    padding: 2,
    borderBottom: "2px solid white",
  };

  return (
    <Card style={cardStyle} bordered={true} onClick={handleCardClick}>
      <div>
        <div style={headerStyle}>
          <p>Your Appointment</p>
        </div>
        <div style={{ display: "flex", marginBottom: -25 }}>
          <div>
            <h3 style={{ marginBottom: 0 }}>{name}</h3>
            <div>
              <p style={headerStyle}>Status: {status}</p>
              <div>
                <p style={{ marginBottom: 0 }}>
                  <span style={{ borderBottom: "1px solid #000" }}>
                    {moment(date).format("MMMM Do YYYY")}{" "}/{moment(time, "HH:mm:ss").format("h:mm A")}
                  </span>
                </p>
                <p style={{ marginTop: 0 }}>Appointment Date/Time</p>
              </div>
            </div>
          </div>

          <div style={{ marginLeft: 30, marginTop: 25 }}>
            <Avatar src={photo} size={100} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AppointmentCard;
