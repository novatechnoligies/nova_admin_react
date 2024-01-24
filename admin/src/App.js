import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  HomeOutlined,
  ProfileOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingOutlined,
  IdcardOutlined,
} from "@ant-design/icons/lib/icons";
import ShopTable from "./components/shop_components/ShopTable";
 import SpaTable from "./components/spa_components/SpaTable";
import LabTable from "./components/lab_components/LabTable";
import CscTable from "./components/csc_components/CscTable";
import ClinicTable from "./components/clinic_components/ClinicTable";
import LoginPage from "./components/login_components/Login";
// import Filter from './components/filter_componets/Filter';
import Acards from "./components/consumers_appointments/Acards";
import { NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { Badge, Avatar, Upload, Button, Popover, Select } from "antd";
import "./App.css";
import NewConsumer from "./components/consumer_components/consumermodule";
import { More } from "./components/consumers_appointments/More";
import AppointmentBookingPage from "./components/consumers_appointments/AppointmentBookingPage";
import defaultProfilePhoto from "./default-profile-photo.png";
import AppointmentDetails from "./components/consumers_appointments/AppointmentDetails";
import TestForm from "./components/result/TestForm";
import axios from "axios";
import { BASE_URL } from "./constants/constants";
import Ems from "./components/ems_components/Ems";
import Ims from "./components/ems_components/Ims";
import Createpromotions from "./components/ems_components/Createpromotions";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  
  const handleLogin = () => {
    // Perform login logic here
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic here
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        <section>
          <div>
            <Header onLogout={handleLogout} />
          </div>
          <div className="wrapper">
            <div className="container">
              <div className=" left-side">
                <SlideMenu
                  location={location}
                  navigate={navigate}
                  onLogout={handleLogout}
                />
              </div>
              <div className="right-side">
                <div className="container-row">
                  {/* <div className="top"><Filter></Filter></div> */}
                  <div className>
                    <Content />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <LoginPage onLogin={handleLogin}></LoginPage>
        // <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

function Header({ onLogout, profilePhoto }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [labData, setLabData] = useState([]);

  useEffect(() => {
    getLabData();
  }, []);

  const getLabData = async () => {
    const storedUserData = sessionStorage.getItem("userData");
    const userDataObject = JSON.parse(storedUserData);

    try {
      const response = await axios.get(
        BASE_URL +
          "/dataservice/getAllLabListByOwnerId?ownerId=" +
          userDataObject.id
      );
      setLabData(response.data);

      console.log("LabData from API", response.data);
      //setFilterLabData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (selected) => {
    sessionStorage.setItem("labData", JSON.stringify(selected));
    setSelectedValues(selected);
  };

  const labOptions = labData
    ? labData.map((item) => ({
        key: item.id,
        label: item.shopName,
      }))
    : [];

  // Set the default selected value
  const defaultSelectedValue = labOptions.length > 0 ? [labOptions[0].key] : [];

  return (
    <div
      className="top-bar"
      style={{ position: "fixed", top: 0, width: "100%" }}
    >
      <Select
        style={{ width: "20%", marginRight: "20px" }}
        placeholder="Select Your Lab"
        onChange={handleChange}
        value={selectedValues}
        defaultValue={defaultSelectedValue}
        dropdownStyle={{ width: "200px" }}
      >
        {labOptions.map((item, index) => (
          <Select.Option key={item.key} value={item.key}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
      {/* <div>Header</div> */}

      <div className='top_bar_icons' >
        <Badge  offset={[10, 0]} style={{marginTop:"5px"}}>
        <NotificationOutlined style={{image:"80px", marginTop:"5px"}}/>
        </Badge>
      </div>
      <div  className='top_bar_icons' >
        <Badge  offset={[10, 0]} style={{marginTop:"5px"}}>
        <MailOutlined style={{image:"80px", marginTop:"5px"}}/>

        </Badge>
      </div>
      <div className="top_bar_icons">
        {profilePhoto ? (
          <img src={profilePhoto} alt="Profile" className="profile-photo" />
        ) : (
          <img
            src={defaultProfilePhoto}
            alt="Default Profile"
            className="profile-photo"
          />
        )}
      </div>
    </div>
  );
}

function SlideMenu({ location, navigate, onLogout }) {
  const selectedKeys = [location.pathname];

  return (
    <div className="App">
      <Menu
        style={{
          background: "#0B8C73",
          color: "white",
          height: "100vh",
          overflow: "hidden",
          position: "fixed",
          width: "250px",
        }}
        selectedKeys={selectedKeys}
        onClick={({ key }) => {
          if (key === "/logout") {
            onLogout();
          } else {
            navigate(key);
          }
        }}
        items={[
          { label: "Home", key: "/", icon: <HomeOutlined /> },
          { label: "Dashboard", key: "/dash", icon: <DashboardOutlined /> },
          { label: "Appointments", key: "Acard", icon: <IdcardOutlined /> },
          { label: "Lab", key: "/lab", icon: <ShopOutlined /> },

          { label: "EMS", key: "/ems", icon: <UserOutlined /> },
          { label: "IMS", key: "/ims", icon: <UserOutlined /> },
          { label: "Create Promotions", key: "/createpromotions", icon: <UserOutlined /> },

          { label: "Spa", key: "/spa", icon: <ShopOutlined /> },
          { label: "Shalon", key: "/shalon", icon: <ShopOutlined /> },
          { label: "CSC", key: "/csc", icon: <ShopOutlined /> },

          { label: "Clinic", key: "/clinic", icon: <ShopOutlined /> },
          {
            label: "Consumer",
            key: "/consumer",
            icon: <ShoppingOutlined />,
            children: [
              { label: "Active", key: "/active", icon: <ShopOutlined /> },
              { label: "Inactive", key: "/inactive", icon: <ShopOutlined /> },
              {
                label: "New Consumer Account",
                key: "/newconsumeraccount",
                icon: <ShopOutlined />,
              },
            ],
          },
          { label: "Profile", key: "/profile", icon: <ProfileOutlined /> },
          {
            label: "Sign Out",
            key: "/logout",
            icon: <SettingOutlined />,
            danger: true,
          },
        ]}
      />
    </div>
  );
}

function Content() {
  return (
    <div style={{ marginTop: "1px" }}>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/dash" element={<div>Dashboard</div>} />
        <Route
          path="/lab"
          element={
            <div className="d-flex flex-column align-items-center">
              {" "}
              <LabTable />
            </div>
          }
        />
        <Route
          path="/Acard"
          element={
            <div className="d-flex flex-column align-items-center">
              {" "}
              <Acards />
            </div>
          }
        />
        <Route
          path="/spa"
          element={
            <div className="d-flex flex-column align-items-center">
              {" "}
              <SpaTable />
            </div>
          }
        />
        <Route
          path="/shalon"
          element={
            <div className="d-flex flex-column align-items-center">
              {" "}
              <ShopTable />
            </div>
          }
        />
        <Route
          path="/csc"
          element={
            <div className="d-flex flex-column align-items-center">
              {" "}
              <CscTable />
            </div>
          }
        />
        <Route
          path="/clinic"
          element={
            <div className="d-flex flex-column align-items-center">
              {" "}
              <ClinicTable />
            </div>
          }
        />
        <Route path="/consumer" element={<div>Consumer</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/logout" element={<div>Logout</div>} />
        <Route path="/active" element={<div>Active</div>} />
        <Route path="/inactive" element={<div>Inactive</div>} />
        <Route path="/AppChildCards/:id" element={<More />} />
        <Route
          path="/newconsumeraccount"
          element={
            <div>
              <NewConsumer />
            </div>
          }
        />
        <Route
          path="/appointment-booking"
          element={<AppointmentBookingPage />}
        />
        <Route
          path="/appointment-details/:appointmentId"
          element={<AppointmentDetails />}
        />
        <Route path="/report" element={<TestForm />} />
        <Route path="/ems" element={<Ems/>}/>
        <Route path="/ims" element={<Ims/>} />
        <Route path="/createpromotions" element={<Createpromotions/>} />
        
      </Routes>
    </div>
  );
}

function Login({ onLogin }) {
  const handleLogin = () => {
    // Perform login logic here
    onLogin();
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}></button>
    </div>
  );
}

export default App;
