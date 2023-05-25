import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
} from "@ant-design/icons/lib/icons";
import "./CscTable.css";
const style = {
  border: "1px solid black",
  padding: "10px",
  borderRadius: "5px",
};

const CscTable = () => {
  const [cscData, setCscData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCscData, setFilterCscData] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [editingCsc, setEditingCsc] = useState(null);
  const getCscData = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCscData(response.data);
      setFilterCscData(response.data);
    } catch (error) {}
  };

  const onDeleteCsc = (csc) => {
    Modal.confirm({
      title: "Do you really want to delet csc" + csc.name + "?",
      okText: "YES",
      okType: "danger",
      onOk: () => {
        //call delete API
      },
    });
  };

  const editCscDetails = (cscDetails) => {
    setIsEditing(true);
    setEditingCsc({ ...cscDetails });
  };

  const createCscDetails = () => {
    setIsEditing(true);
  };

  const columns = [
    {
      name: "Csc Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Phone",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Phone",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Phone",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Phone",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Phone",
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
              editCscDetails(row);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              onDeleteCsc(row);
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
    getCscData();
  }, []);

  useEffect(() => {
    const result = cscData.filter((cscData) => {
      return cscData.name.match(search);
    });
    setFilterCscData(result);
  }, [search]);

  const updaetCscDetails = () => {
    alert("success");
  };
  return (
    <div className="novaTable">
      <DataTable
        className="container headerStyles"
        title="CSC DETAILS"
        columns={columns}
        data={filterCscData}
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
                editCscDetails();
              }}
            >
              Create New Csc
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
        title="Edit Csc:"
        visible={isEditing}
        onCancel={() => {
          setIsEditing(false);
        }}
        onOk={() => {
          updaetCscDetails();
          setIsEditing(false);
        }}
      >
        <input value={editingCsc?.name} />
      </Modal>

      <Modal
        title="Edit Csc:"
        visible={isCreate}
        onCancel={() => {
          setIsCreate(false);
        }}
        onOk={() => {
          updaetCscDetails();
          setIsCreate(false);
        }}
      >
        <input placeholder="csc name" />
      </Modal>
    </div>
  );
};

export default CscTable;
