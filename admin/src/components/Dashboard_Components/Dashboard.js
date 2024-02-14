import React from "react";
import "./Dashboard.css";
import { BASE_URL } from "../../constants/constants";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [labData, setLabData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [earningsData, setEarningsData] = useState({});
  const [ageCatAppointmentCount, setAgeCatAppointmentCount] = useState(0);
  const [adultCount, setAdultCount] = useState(0);


  const getLabData = async () => {
    try {
      const storedUserData = sessionStorage.getItem("userData");
      const userDataObject = JSON.parse(storedUserData);

      const response = await axios.get(
        BASE_URL +
          "/dataservice/getAllLabListByOwnerId?ownerId=" +
          userDataObject.id
      );

      // Log the data to the console
      console.log("Lab Data From the API For Dashboard", response.data);

      // Update the state with the received data
      setLabData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching lab data:", error);
      setError("Error fetching lab data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getLabData();
  }, []);

  // Dummy news and feeds data
  const dummyNewsAndFeeds = [
    {
      id: 1,
      category: "Lab",
      content: "Exciting news about our lab's latest achievements!",
    },
    {
      id: 2,
      category: "Appointment",
      content: "Tips for a smoother appointment experience with us.",
    },
    {
      id: 3,
      category: "Feature",
      content: "Check out our new feature and how it benefits you.",
    },
    // Add more dummy data as needed
  ];
  
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
            <div className="count-cicle custom-count">
              {ageCatAppointmentCount["Adult"]}
            </div>
          </div>
          <div className="box box2">
            {" "}
            Kids Count
          </div>
        </div>
      </div>
      <div className="second-container">
        <div className="tile1">
          <heading>
            <b>Quick View Of Your Lab</b>
          </heading>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && labData.length === 0 && (
            <p>No lab data available.</p>
          )}
          {!loading && !error && labData.length > 0 && (
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
              <tbody>
                {labData.map((lab) => (
                  <tr key={lab.id}>
                    <td>{lab.id}</td>
                    <td>{lab.shopName}</td>
                    <td>0</td>
                    <td>{lab.shopName}</td>
                    <td>{lab.status ? "Active" : "Inactive"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="tile2">
          <heading>
            <b>News and Feeds</b>
          </heading>
          <div className="news-feed-container">
            {/* Map through dummy news and feeds data */}
            {dummyNewsAndFeeds.map((item) => (
              <p key={item.id} className="news-feed-item">
                <strong>{item.category}:</strong> {item.content}
              </p>
            ))}
            <div className="count-cicle custom-count">
              {ageCatAppointmentCount["Child"]}
            </div>
          </div>
          <div className="box box3">
            Extra Adult Count
            <div className="count-cicle custom-count">
              {ageCatAppointmentCount["Extra Adult"]}
            </div>
          </div>
        </div>
      </div>
      <div className="third-container">
        <div className="tile1">
          <heading>
            <b>How is our Progress?</b>
          </heading>
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
            <div className="tile2" style={{ backgroundColor: "violet" }}>
              <heading>News and Feeds</heading>
              <div className="news-feeds"></div>
            </div>
          </div>
          <div className="pie-chart"></div>
          <div className="color-box-container">
            <div className="color-box-label">
              <div className="color-box green"></div>
              <div className="color-name">Total Appointment</div>
            </div>
            <div className="color-box-label">
              <div className="color-box gray"></div>
              <div className="color-name">Todays Appointment</div>
            </div>
            <div className="color-box-label">
              <div className="color-box red"></div>
              .<div className="color-box red"></div>
              <div className="color-name">Total Earnings</div>
            </div>
            <div className="color-box-label">
              <div className="color-box blue"></div>
              <div className="color-name">Todays Earnings</div>
            </div>
          </div>
        </div>
        <div className="tile2">
          <heading>
            <b>Your Lab Inventry</b>
          </heading>
          <table>
            <thead>
              <tr>
                <th className="custom-th">Inventry Type</th>
                <th className="custom-th">Total Stock</th>
                <th className="custom-th">Used Count</th>
                <th className="custom-th">Available Count</th>
                <th className="custom-th">Action</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;