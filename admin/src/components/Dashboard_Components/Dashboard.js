import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

const Dashboard = () => {
  const [earningsData, setEarningsData] = useState({});
  const [ageCatAppointmentCount, setAgeCatAppointmentCount] = useState(0);
  const [adultCount, setAdultCount] = useState(0);

  useEffect(() => {
    getEarningDetails();
    fetchAppointmentCounts();
  }, []);

  const getEarningDetails = async () => {
    const storedUserData = sessionStorage.getItem("userData");
    const userDataObject = JSON.parse(storedUserData);

    console.log("User Data from the Session Is", userDataObject);

    try {
      const response = await axios.get(
        // Need to make the fromDate and toDate Dynamic instead of hardcoded in the API
        BASE_URL +
          `/dataservice/getEarningDetailsByOwnerIdAndDate?ownerId=${userDataObject.id}&fromDate=2024-01-06&to=2024-01-31`
      );
      console.log("Earnings Details from API", response.data);
      setEarningsData(response.data);
      //setFilterLabData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const fetchAppointmentCounts = async () => {
    const labData = sessionStorage.getItem("labData");
    console.log("LabData from Session", labData);
    try {
      const appointmentsCountResponse = await axios.get(
        BASE_URL + `/dataservice/adultCount/${labData}`
      );
      console.log(
        "Appointments Count from API",
        appointmentsCountResponse.data
      );
      // Set the appointment counts for each age category
      setAgeCatAppointmentCount(
        appointmentsCountResponse.data.reduce((acc, cur) => {
          acc[cur.ageCategory] = cur.ageCatAppointmentCount;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error fetching Appointment Counts:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="first-container">
        <div className="tile tile1">Total Appointment &rarr;</div>
        <div className="tile tile2">Todays Appointment Count</div>
        <div className="tile tile3">
          Total Earnings: {earningsData.totalEarnings}
        </div>
        <div className="tile tile4">
          Todays Earnings: {earningsData.todaysEarnings}
        </div>
        <div className="tile tile5">Todays Count</div>

        <div className="tile6">
          <div className="heading custom-heading">Pax Count</div>
          <div className="box box1">
            {" "}
            Adult Count
            <div className="count-cicle custom-count">{ageCatAppointmentCount["Adult"]}</div>
          </div>
          <div className="box box2">
            {" "}
            Kids Count
            <div className="count-cicle custom-count">{ageCatAppointmentCount["Child"]}</div>
          </div>
          <div className="box box3">
            Extra Adult Count
            <div className="count-cicle custom-count">{ageCatAppointmentCount["Extra Adult"]}</div>
          </div>
        </div>
      </div>

      <div className="second-container">
        <div className="tile1">
          <heading>Lab Details</heading>
          <table>
            <thead>
              <tr>
                <th className="custom-th">Id</th>
                <th className="custom-th">Lab Name</th>
                <th className="custom-th">Todays Earnings</th>
                <th className="custom-th">Owner Name</th>
                <th className="custom-th">Status</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
        <div className="tile2" style={{backgroundColor:"violet"}}>
          <heading>News and Feeds</heading>
          <div className="news-feeds"></div>
        </div>
      </div>

      <div className="third-container">
        <div className="tile1">
          <div className="chart-heading">Lab Status</div>
          <div className="pie-chart"></div>
          <div className="color-box-container">
            <div class="color-box-label">
              <div class="color-box green"></div>
              <div className="color-name">Total Appointment</div>
            </div>
            <div class="color-box-label">
              <div class="color-box gray"></div>
              <div className="color-name">Todays Appointment</div>
            </div>
            <div class="color-box-label">
              .<div class="color-box red"></div>
              <div className="color-name">Total Earnings</div>
            </div>
            <div class="color-box-label">
              <div class="color-box blue"></div>
              <div className="color-name">Todays Earnings</div>
            </div>
          </div>
        </div>
        <div className="tile2">
          <heading>Todays Earnings</heading>
          <table>
            <thead>
              <tr>
                <th className="custom-th">SN</th>
                <th className="custom-th">Total Inventories</th>
                <th className="custom-th">Total Earnings</th>
                <th className="custom-th">Active pramotions</th>
                <th className="custom-th">Cancel Action</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
