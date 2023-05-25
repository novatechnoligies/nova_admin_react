import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
} from "@ant-design/icons/lib/icons";
import "./SpaTable.css";
const style = {
  border: "1px solid black",
  padding: "10px",
  borderRadius: "5px",
};

const SpaTable = () => {
  const [spaData, setSpaData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterSpaData, setFilterSpaData] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [editingSpa, setEditingSpa] = useState(null);
  const getSpaData = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setSpaData(response.data);
      setFilterSpaData(response.data);
    } catch (error) {}
  };

  const onDeleteSpa = (spa) => {
    Modal.confirm({
      title: "Do you really want to delet shop" + spa.name + "?",
      okText: "YES",
      okType: "danger",
      onOk: () => {
        //call delete API
      },
    });
  };

  const editSpaDetails = (spaDetails) => {
    setIsEditing(true);
    setEditingSpa({ ...spaDetails });
  };

  const createSpaDetails = () => {
    setIsEditing(true);
  };

  const columns = [
    {
      name: "Spa Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Spa Address",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Phone Number",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Email",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Logo",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "IsDeleted",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    
    {
      name: "Action",
      cell: (row) => (
        <div>
          <EditOutlined
            onClick={() => {
              editSpaDetails(row);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              onDeleteSpa(row);
            }}
            style={{ color: "red", marginLeft: "20px" }}
          />
        </div>
        // <Button type="primary" onClick={() => alert(row.name)}>
        //   Edit
        // </Button>
      ),
      style: {
        fontWeight: "bold",
      },
    },
  ];

  useEffect(() => {
    getSpaData();
  }, []);

  useEffect(() => {
    const result = spaData.filter((spaData) => {
      return spaData.name.match(search);
    });
    setFilterSpaData(result);
  }, [search]);

  const updaetSpaDetails = () => {
    alert("success");
  };
  return (
    <div className="novaTable">
      <DataTable
        className="container headerStyles"
        title="SPA DETAILS"
        columns={columns}
        data={filterSpaData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        actions={
          <div>
            <ExportOutlined>
              <Button>Export</Button>
            </ExportOutlined>

            <Button
              style={{ marginLeft: "20px" }}
              type="primary"
              onClick={() => {
                editSpaDetails();
              }}
            >
              Create New Shop
            </Button>
          </div>
        }
        subHeader
        subHeaderComponent={
          <input
            className="w-25 form-control"
            type="text"
            placeholder="Search Here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        }
      />

      <Modal
        title="Create Spa:"
        visible={isEditing}
        onCancel={() => {
          setIsEditing(false);
        }}
        onOk={() => {
          updaetSpaDetails();
          setIsEditing(false);
        }}
      >
        <input value={editingSpa?.name} />
      </Modal>

      <Modal
        title="Edit Spa:"
        visible={isCreate}
        onCancel={() => {
          setIsCreate(false);
        }}
        onOk={() => {
          updaetSpaDetails();
          setIsCreate(false);
        }}
      >
        <input placeholder="spa name" />
      </Modal>
    </div>
  );
};

export default SpaTable;
