import React, { useState, useEffect } from "react";
import "./LabTable.css";
import { BASE_URL } from "../../constants/constants";
import axios from "axios";
import AvailableService from "./AvailableServices";

const Summary = ({ selectedLabData }) => {
  console.log("here" + JSON.stringify(selectedLabData));

  const [availabilityData, setAvailabilityData] = useState([]);

  useEffect(() => {
    getAvailabilityDetails();
  }, []);

  const getAvailabilityDetails = async () => {
    const storedUserData = sessionStorage.getItem("userData");
    const userDataObject = JSON.parse(storedUserData);
    try {
      const response = await axios.get(
        BASE_URL + `/dataservice/getShopAvaibilityById/${selectedLabData.id}`
      );
      // console.log("availability" + JSON.stringify(response));
      setAvailabilityData(response.data);
      console.log("Lab Availability From API" + JSON.stringify(availabilityData));
      console.log("availability" + availabilityData);
      // setFilterLabData(response.data);
    } catch (error) {}
  };

  return (
    <div>
      <div className="lab-summary-container">
        <h2>Lab Summary</h2>

        <table className="lab-summary">
          <tbody>
            <tr>
              <td className="td-key">
                <strong>Name: </strong>
              </td>
              <td>{selectedLabData.shopName}</td>

              <td>
                <strong>Phone:</strong>
              </td>
              <td>{selectedLabData.phone}</td>

              <td>
                <strong>Email:</strong>
              </td>
              <td>{selectedLabData.email || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <strong>Address:</strong>
              </td>
              <td>{selectedLabData.shopAddress}</td>
              <td>
                <strong>Owner:</strong>
              </td>
              <td>{selectedLabData.owner || "N/A"}</td>
              <td>
                <strong>GST:</strong>
              </td>
              <td>{selectedLabData.gstNo || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <strong>Total Appointments:</strong>
              </td>
              <td>{selectedLabData.totalAppointments || "N/A"}</td>
              <td>
                <strong>Active Employees:</strong>
              </td>
              <td>{selectedLabData.activeEmployees || "N/A"}</td>
              <td>
                <strong>Location:</strong>
              </td>
              <td>{selectedLabData.location || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <strong>Org:</strong>
              </td>
              <td> {selectedLabData.org || "NOVA"}</td>
              <td>
                <strong>PinCode:</strong>
              </td>
              <td>{selectedLabData.pinCode || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="lab-summary-container">
        <h2>Availability Summary</h2>

        <table className="lab-summary">
          <tbody>
            <tr>
              <td className="col-diff">
                <strong>Start Date:</strong>
                {availabilityData.fromDate}
              </td>

              <td>
                <strong>End Date:</strong>
                {availabilityData.toDate}
              </td>

              <td>
                <strong>Opens At:</strong>
                {availabilityData.fromTime}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Closes At:</strong>
                {availabilityData.toTime}
              </td>
              <td>
                <strong>Slot Intervals:</strong>
                {availabilityData.timeInterval}
              </td>
              <td>
                <strong>Holidays:</strong>
                {availabilityData.holidays}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="lab-summary-container">
        <AvailableService labId={selectedLabData.id}/>
      </div>
    </div>
  );
};

export default Summary;