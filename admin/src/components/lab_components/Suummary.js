import React, { useState, useEffect} from 'react';
import "./LabTable.css";
import { BASE_URL } from "../../constants/constants";
import axios from "axios";
import AvailableService from './AvailableServices';


const Summary = ({ labData }) => {
    console.log("here" +JSON.stringify(labData))

const [availabilityData ,setAvailabilityData] = useState([]);

useEffect(() => {
  
  getAvailabilityDetails();
}, []);

const getAvailabilityDetails = async () => {
      try {
        const response = await axios.get(
          BASE_URL + "/dataservice/getShopAvaibilityById/1" // Replace with Shop availability by ShopId
        );
        // console.log("availability" + JSON.stringify(response)); 
        setAvailabilityData(response.data);
        console.log("availability" + JSON.stringify(availabilityData));
        console.log("availability" +availabilityData);
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
              <td>{labData.shopName}</td>

              <td>
                <strong>Phone:</strong>
              </td>
              <td>{labData.phone}</td>

              <td>
                <strong>Email:</strong>
              </td>
              <td>{labData.email || 'N/A'}</td>
            </tr>
            <tr>
              <td>
                <strong>Address:</strong>
              </td>
              <td>{labData.shopAddress}</td>
              <td>
                <strong>Owner:</strong>
              </td>
              <td>{labData.owner || 'N/A'}</td>
              <td>
                <strong>GST:</strong>
              </td>
              <td>{labData.gstNo || 'N/A'}</td>
            </tr>
            <tr>
              <td>
                <strong>Total Appointments:</strong>
              </td>
              <td>{labData.totalAppointments || 'N/A'}</td>
              <td>
                <strong>Active Employees:</strong>
              </td>
              <td>{labData.activeEmployees || 'N/A'}</td>
              <td>
                <strong>Location:</strong>
              </td>
              <td>{labData.location || 'N/A'}</td>
            </tr>
            <tr>
              <td>
                <strong>Org:</strong>
              </td>
              <td> {labData.org || 'NOVA'}</td>
              <td>
                <strong>PinCode:</strong>
              </td>
              <td>{labData.pinCode || 'N/A'}</td>
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
        <h2>Available Services</h2>
        <AvailableService />
       
      </div>
    </div>
  );
};

export default Summary;
