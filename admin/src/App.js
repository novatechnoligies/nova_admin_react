import React, { useEffect, useState } from "react";
import { Menu, Upload, Button, Modal } from "antd";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  HomeOutlined,
  ProfileOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingOutlined,
  IdcardOutlined,
  UploadOutlined,
} from "@ant-design/icons/lib/icons";
import LabTable from "./components/lab_components/LabTable";
import ClinicTable from "./components/clinic_components/ClinicTable";
import LoginPage from "./components/login_components/Login";
import Acards from "./components/consumers_appointments/Acards";
import { NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { Badge, Avatar, Select } from "antd";
import "./App.css";
import NewConsumer from "./components/consumer_components/consumermodule";
import { More } from "./components/consumers_appointments/More";
import AppointmentBookingPage from "./components/consumers_appointments/AppointmentBookingPage";
import defaultProfilePhoto from "./default-profile-photo.png";
import AppointmentDetails from "./components/consumers_appointments/AppointmentDetails";
import TestForm from "./components/result/TestForm";
import axios from "axios";
import { BASE_URL } from "./constants/constants";
import AccessManagement from "./components/access_management/AccessManagement";
import Ems from "./components/ems_components/Ems";
import Ims from "./components/IMS/Ims";
import Createpromotions from "./components/promotions_offers/Createpromotions";
import Dashboard from "./components/Dashboard_Components/Dashboard";
import EmployeeMapping from "./components/employee_mapping/EmployeeMapping";
import BulkAppointments from "./components/bulk_appointments/BulkAppointments";
import Organizations from "./components/org_components/Organizations";
import Locations from "./components/locations_components/Locations";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userFullName, setUserFullName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    const userDataObject = JSON.parse(storedUserData);
    if (userDataObject) {
      const fullName = `${userDataObject.firstName} ${userDataObject.lastName}`;
      setUserFullName(fullName);
    }
  }, [loggedIn]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setIsModalVisible(false);
    setLoggedIn(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpload = () => {
    // Logic for uploading photo
    setIsModalVisible(false);
  };

  const handleSave = () => {
    // Logic for saving photo
    setIsModalVisible(false);
  };

  return (
    <div>
      {loggedIn ? (
        <section>
          <div>
            <Header onLogout={handleLogout} showModal={showModal} />
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
      )}
      <Modal
        title="Profile"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key="cancel"
            onClick={handleCancel}
            styles={{ marginRight: "8px" }}
          >
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={handleSave}
            styles={{ marginRight: "8px" }}
          >
            Save
          </Button>,
          <Button
            key="signout"
            onClick={handleLogout}
            style={{ float: "left", marginRight: "4px" }}
          >
            Sign Out
          </Button>,
        ]}
        style={{ maxWidth: "20%" }} // Set the maximum width of the modal
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100px", marginBottom: "10px" }}>
            <Upload>
              <Avatar
                src={defaultProfilePhoto}
                alt="Default Profile"
                className="profile-photo"
                style={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "10px",
                }}
              />
            </Upload>
            {/* Add other profile details or controls here */}
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Header({ onLogout, showModal }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [labData, setLabData] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedLab, setSelectedLab] = useState([]);
  

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (selected, field) => {
    if (field === "organization") {
      setSelectedOrganization(selected);
      setSelectedLocation([]); // Clear location when organization changes
      setSelectedLab([]); // Clear lab when organization changes
    } else if (field === "location") {
      setSelectedLocation(selected);
      setSelectedLab([]); // Clear lab when location changes
    } else if (field === "lab" && (selectedOrganization.length === 0 || selectedLocation.length === 0)) {
      alert("Please select both Organization and Location first.");
      setSelectedLab([]);
    } else {
      setSelectedLab(selected);
    }
  };

  const labOptions = labData
    ? labData.map((item) => ({
        key: item.id,
        label: item.shopName,
      }))
    : [];

  const defaultSelectedValue = labOptions.length > 0 ? [labOptions[0].key] : [];

  const organizationOptions = [
    { value: "org1", label: "Organization 1" },
    { value: "org2", label: "Organization 2" },
    { value: "org3", label: "Organization 3" },
  ];

  const locationOptions = [
    { value: "loc1", label: "Location 1" },
    { value: "loc2", label: "Location 2" },
    { value: "loc3", label: "Location 3" },
  ];

  return (
    <div
      className="top-bar"
      style={{ position: "fixed", top: 0, width: "100%" }}
    >
      {organizationOptions && organizationOptions.length > 0 && (
        <Select
          style={{ width: "20%", marginRight: "20px" }}
          placeholder="Select Organization"
          dropdownStyle={{ width: "200px" }}
          onChange={(selected) => handleChange(selected, "organization")}
          value={selectedOrganization}
        >
          {organizationOptions.map((org) => (
            <Select.Option key={org.value} value={org.value}>
              {org.label}
            </Select.Option>
          ))}
        </Select>
      )}

      {locationOptions && locationOptions.length > 0 && (
        <Select
          style={{ width: "20%", marginRight: "20px" }}
          placeholder="Select Location"
          dropdownStyle={{ width: "200px" }}
          onChange={(selected) => handleChange(selected, "location")}
          value={selectedLocation}
        >
          {locationOptions.map((loc) => (
            <Select.Option key={loc.value} value={loc.value}>
              {loc.label}
            </Select.Option>
          ))}
        </Select>
      )}

<Select
        style={{ width: "20%", marginRight: "20px" }}
        placeholder={labOptions && labOptions.length > 0 ? "Select Your Lab" : "No Labs Available"}
        onChange={(selected) => handleChange(selected, "lab")}
        value={selectedLab}
        dropdownStyle={{ width: "200px" }}
      >
        {labOptions.map((item, index) => (
          <Select.Option key={item.key} value={item.key}>
            {item.label}
          </Select.Option>
        ))}
      </Select>

      <div className="top_bar_icons">
        <Badge offset={[10, 0]} style={{ marginTop: "5px" }}>
          <NotificationOutlined style={{ image: "80px", marginTop: "5px" }} />
        </Badge>
      </div>
      <div className="top_bar_icons">
        <Badge offset={[10, 0]} style={{ marginTop: "5px" }}>
          <MailOutlined style={{ image: "80px", marginTop: "5px" }} />
        </Badge>
      </div>
      <div className="top_bar_icons">
        <Avatar
          src={defaultProfilePhoto}
          alt="Default Profile"
          className="profile-photo"
          onClick={showModal}
        />
      </div>
    </div>
  );
}

function SlideMenu({ location, navigate, onLogout }) {
  const selectedKeys = [location.pathname];
  const storedUserData = sessionStorage.getItem("userData");
  const userDataObject = JSON.parse(storedUserData);

  const accessPermissionItems = userDataObject.accePermissions[0]?.items;
  let isHideClinic = false;
  let isHideLab = false;
  let isHideCreatePromotions = false;

  if (accessPermissionItems !== undefined) {
    const itemsArray = JSON.parse(accessPermissionItems);
    isHideClinic = itemsArray.some(
      (item) => item.label === "Clinic" && item.isOn
    );
    isHideLab = itemsArray.some((item) => item.label === "Lab" && item.isOn);
    isHideCreatePromotions = itemsArray.some(
      (item) => item.label === "Create Promotions" && item.isOn
    );
  }

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
          isHideClinic
            ? null
            : { label: "Access Management", key: "/accessManagement", icon: <UserOutlined /> },
          { label: "Dashboard", key: "/dash", icon: <DashboardOutlined /> },
          { label: "Appointments", key: "Acard", icon: <IdcardOutlined /> },
          isHideLab
            ? null
            : { label: "Manage Orgs", key: "/lab", icon: <ShopOutlined />,  
            children: [
              {label: "Lab", key: "/lab",icon: <ShopOutlined />},
              { label: "Organizations", key: "/org", icon: <ShopOutlined /> },
              {label: "Locations", key: "/location",icon: <ShopOutlined />},

            ], },
          //isHideClinic ? null : { label: "Clinic", key: "/clinic", icon: <ShopOutlined /> },
          {
            label: "Bulk upload",
            key: "/bulkupload",
            icon: <ProfileOutlined />,
          },
          { label: "EMS", key: "/ems", icon: <UserOutlined /> },
          { label: "IMS", key: "/ims", icon: <UserOutlined /> },
          isHideCreatePromotions
            ? null
            : {
                label: "Create Promotions",
                key: "/createpromotions",
                icon: <UserOutlined />,
              },
          isHideClinic
            ? null
            : { label: "Clinic", key: "/clinic", icon: <ShopOutlined /> },
          {
            label: "Consumer",
            key: "/consumer",
            icon: <ShoppingOutlined />,
            children: [
              { label: "Active", key: "/active", icon: <ShopOutlined /> },
              {
                label: "New Consumer Account",
                key: "/newconsumeraccount",
                icon: <ShopOutlined />,
              },
            ],
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
        <Route
          path="/dash"
          element={
            <div>
              <Dashboard />
            </div>
          }
        />
        <Route
          path="/lab"
          element={
            <div className="d-flex flex-column align-items-center">
              {" "}
              <LabTable />{" "}
            </div>
          }
        />
         <Route
          path="/org"
          element={
            <div className="d-flex flex-column align-items-center">
              {" "}
              <Organizations /> {" "}
            </div>
          }
        />
        <Route
          path="/location"
          element={
            <div className="d-flex flex-column align-items-center">
              {" "}
              <Locations /> {" "}
            </div>
          }
        />
        <Route
          path="/Acard"
          element={
            <div className="d-flex flex-column align-items-center">
              {" "}
              <Acards />{" "}
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
              {" "}
              <NewConsumer />{" "}
            </div>
          }
        />
        <Route
          path="/appointment-booking"
          element={<AppointmentBookingPage />}
        />
        <Route path="/employee-mapping" element={<EmployeeMapping />} />
        <Route
          path="/appointment-details/:appointmentId"
          element={<AppointmentDetails />}
        />
        <Route path="/report" element={<TestForm />} />
        <Route path="/accessManagement" element={<AccessManagement />} />
        <Route path="/ems" element={<Ems />} />
        <Route path="/ims" element={<Ims />} />
        <Route path="/createpromotions" element={<Createpromotions />} />
        <Route path="/bulkupload" element={<BulkAppointments />} />
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
