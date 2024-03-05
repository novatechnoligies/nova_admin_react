import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink, Route, useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
  TimePicker,
  Card,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { LeftOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../constants/constants";
import axios from "axios";
import LabFormModal from "./LabFormModal";
import LabAvailabilityModal from "./LabAvailabilityModal";
import LabServiceModal from "./LabServiceModal";
import Summary from "./Suummary";

const LabDataTable = ({ data }) => {
  const navigate = useNavigate();
  const [filterLabData, setFilterLabData] = useState([]);
  const [search, setSearch] = useState("");
  const [labData, setLabData] = useState([]);
  const [isCreateLabModalVisible, setIsCreateLabModalVisible] = useState(false);
  const [isLabAvailabilityModalVisible, setIsLabAvailabilityModalVisible] =
    useState(false);
  const [isAddServiceModalVisible, setIsAddServiceModalVisible] =
    useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const [showLabTable, setShowLabTable] = useState(true);

  const handleBackButtonClick = () => {
    setShowSummary(false);
    setShowLabTable(true);
  };

  const handleRowClick = (row) => {
    setSelectedLab(row);
    setShowSummary(true);
    setShowLabTable(false);
  };

  const onEditLab = (row) => {
    alert(row.id);
  };

  const onDeleteLab = async (row) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete the lab?"
      );

      if (!isConfirmed) {
        // If user clicks "Cancel" in the confirmation dialog
        return;
      }
      await axios.put(
        `${BASE_URL}/dataservice/deleteShopDetails?shopId=${row.id}`
      );
      alert("Lab deleted successfully");
      console.log("Deleting lab with ID:", row.id);
      getLabData();
    } catch (error) {
      console.error("Error deleting lab:", error.message);
      alert("Error deleting lab. Please try again.");
    }
  };

  // ON LOAD
  useEffect(() => {
    getLabData();
  }, []);

  useEffect(() => {
    const result = labData.filter((lab) => {
      return lab.shopName.toLowerCase().includes(search.toLowerCase());
    });
    console.log("Filtered result:", result);
    setFilterLabData(result);
  }, [search, labData]);

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
      //setFilterLabData(response.data);
    } catch (error) {}
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "70px", // Set to auto size
    },
    {
      name: "Lab Name",
      selector: (row) => row.shopName,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
      style: { wordWrap: "break-word" },
    },
    {
      name: "Address",
      selector: (row) => row.shopAddress,
      sortable: true,
      style: { wordWrap: "break-word" },
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
      style: { wordWrap: "break-word" },
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      style: { wordWrap: "break-word" },
    },
    {
      name: "pinCode",
      selector: (row) => row.pinCode,
      sortable: true,
      style: { wordWrap: "break-word" },
    },
    {
      name: "Ownername",
      selector: (row) => row.shopName,
      sortable: true,
      style: { wordWrap: "break-word" },
    },
    {
      name: "GST NO",
      selector: (row) => row.gstNo,
      sortable: true,
      style: { wordWrap: "break-word" },
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <EditOutlined onClick={() => onEditLab(row)} />
          <DeleteOutlined
            onClick={() => onDeleteLab(row)}
            style={{ color: "red", marginLeft: "20px" }}
          />
        </div>
      ),
      style: {
        fontWeight: "bold",
      },
      style: { wordWrap: "break-word" },
    },
  ];

  // handle create lab modal
  const handleCreateLabClick = () => {
    setIsLabAvailabilityModalVisible(false);
    setIsAddServiceModalVisible(false);
    setIsCreateLabModalVisible(true);
  };

  const handleCreateLabModalCancel = () => {
    setIsCreateLabModalVisible(false);
  };

  const handleCreateLabModalSubmit = (values) => {
    console.log("Lab created:", values);
    setIsCreateLabModalVisible(false);
  };

  // handle Lab  availibility modal
  const handleLabAvailabilityModalClick = () => {
    setIsCreateLabModalVisible(false);
    setIsAddServiceModalVisible(false);
    setIsLabAvailabilityModalVisible(true);
  };

  const handleEmployeeMap = () =>{
    navigate("/employee-mapping");
  }

  const handleLabAvailabilityModalCancel = () => {
    setIsLabAvailabilityModalVisible(false);
  };

  const handleLabAvailabilityModalSubmit = (values) => {
    console.log("Lab created:", values);
    setIsLabAvailabilityModalVisible(false);
  };

  // Handle Add Services Modal
  const handleLabService = () => {
    setIsCreateLabModalVisible(false);
    setIsLabAvailabilityModalVisible(false);
    setIsAddServiceModalVisible(true);
  };

  const handleLabServiceCancel = () => {
    setIsAddServiceModalVisible(false);
  };

  const handleLabServiceSubmit = (values) => {
    console.log("service :", values);
    setIsAddServiceModalVisible(false);
  };

  return (
    <div>
      {showLabTable ? (
        <DataTable
          className="container custom-table lab-data-table-container"
          title=""
          columns={columns}
          data={filterLabData}
          pagination
          paginationPosition="bottom"
          fixedHeader
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          customStyles={{
            pagination: {
              marginBottom: "16px", // Adjust the margin bottom as needed
            },
          }}
          actions={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <Button
                type="primary"
                style={{ marginRight: "10px" }}
                onClick={handleCreateLabClick}
              >
                <PlusOutlined /> Create New Lab
              </Button>
              <Button
                type="primary"
                style={{ marginRight: "10px" }}
                onClick={handleLabAvailabilityModalClick}
              >
                Update Lab Availibility
              </Button>
              <Button type="primary" onClick={handleLabService}>
                Update Service
              </Button>

              <Button
                type="primary"
                style={{ marginLeft: "10px" }}
                onClick={handleEmployeeMap}
              >
                <PlusOutlined /> Map Employee.
              </Button>
            </div>
          }
          subHeaderComponent={
            <div>
              <Input
                type="text"
                placeholder="Search Here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          }
          subHeader
          onRowClicked={handleRowClick}
        />
      ) : (
        <div>
          <Button
            type="primary"
            style={{
              marginBottom: "5px",
              marginTop: "10px",
              marginLeft: "10px",
            }}
            onClick={handleBackButtonClick}
          >
            <LeftOutlined /> Back to Lab Table
          </Button>
          <Summary selectedLabData={selectedLab} />
        </div>
      )}

      <LabFormModal
        visible={isCreateLabModalVisible}
        onCancel={() => setIsCreateLabModalVisible(false)}
        onCreate={handleCreateLabModalSubmit}
      />
      <LabAvailabilityModal
        visible={isLabAvailabilityModalVisible}
        onCancel={() => setIsLabAvailabilityModalVisible(false)}
        onCreate={handleLabAvailabilityModalSubmit}
      />

      <LabServiceModal
        visible={isAddServiceModalVisible}
        onCancel={() => setIsAddServiceModalVisible(false)}
        onCreate={handleLabServiceSubmit}
        labData={labData}
      />
    </div>
  );
};

export default LabDataTable;
