import React from 'react';
import "./LabTable.css";

const Summary = ({ labData }) => {
    console.log("here"+labData)
  return (
    <div>

    <div className="lab-summary-container">
      <h2>Lab Summary</h2>

      <table className="lab-summary">
        <tbody>
        <tr>
            <td className='col-diff'>
              <strong>Name: </strong>
              {labData.shopName}
            </td>
            
            <td>
              <strong>Phone:</strong>
              {labData.phone}
            </td>
            
            <td>
              <strong>Email:</strong>
              {labData.email}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Address:</strong>
              {labData.address}
            </td>
            <td>
              <strong>Owner:</strong>
              {labData.owner}
            </td>
            <td>
              <strong>Ratings:</strong>
              {labData.ratings}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Total Appointments:</strong>
              {labData.totalAppointments}
            </td>
            <td>
              <strong>Active Employees:</strong>
              {labData.activeEmployees}
            </td>
            <td>
              <strong>Location:</strong>
              {labData.location}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Org:</strong>
              {labData.org}
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    

    <div className="lab-summary-container">
      <h2>Lab Summary</h2>

      <table className="lab-summary">
        <tbody>
        <tr>
            <td className='col-diff'>
              <strong>Name: </strong>
              {labData.shopName}
            </td>
            
            <td>
              <strong>Phone:</strong>
              {labData.phone}
            </td>
            
            <td>
              <strong>Email:</strong>
              {labData.email}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Address:</strong>
              {labData.address}
            </td>
            <td>
              <strong>Owner:</strong>
              {labData.owner}
            </td>
            <td>
              <strong>Ratings:</strong>
              {labData.ratings}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Total Appointments:</strong>
              {labData.totalAppointments}
            </td>
            <td>
              <strong>Active Employees:</strong>
              {labData.activeEmployees}
            </td>
            <td>
              <strong>Location:</strong>
              {labData.location}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Org:</strong>
              {labData.org}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="lab-summary-container">
      <h2>Lab Summary</h2>

      <table className="lab-summary">
        <tbody>
        <tr>
            <td className='col-diff'>
              <strong>Name: </strong>
              {labData.shopName}
            </td>
            
            <td>
              <strong>Phone:</strong>
              {labData.phone}
            </td>
            
            <td>
              <strong>Email:</strong>
              {labData.email}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Address:</strong>
              {labData.address}
            </td>
            <td>
              <strong>Owner:</strong>
              {labData.owner}
            </td>
            <td>
              <strong>Ratings:</strong>
              {labData.ratings}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Total Appointments:</strong>
              {labData.totalAppointments}
            </td>
            <td>
              <strong>Active Employees:</strong>
              {labData.activeEmployees}
            </td>
            <td>
              <strong>Location:</strong>
              {labData.location}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Org:</strong>
              {labData.org}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default Summary;
