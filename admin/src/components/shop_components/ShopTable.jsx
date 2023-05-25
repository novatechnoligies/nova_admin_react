import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
} from "@ant-design/icons/lib/icons";
import "./ShopTable.css";
const style = {
  border: "1px solid black",
  padding: "10px",
  borderRadius: "5px",
};

const ShopTable = () => {
  const [shopData, setShopData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterShopData, setFilterShopData] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [editingShop, setEditingShop] = useState(null);
  const getShopData = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setShopData(response.data);
      setFilterShopData(response.data);
    } catch (error) {}
  };

  const onDeleteShop = (shop) => {
    Modal.confirm({
      title: "Do you really want to delet shop" + shop.name + "?",
      okText: "YES",
      okType: "danger",
      onOk: () => {
        //call delete API
      },
    });
  };

  const editShopDetails = (shopDetails) => {
    setIsEditing(true);
    setEditingShop({ ...shopDetails });
  };

  const createShopDetails = () => {
    setIsEditing(true);
  };

  const columns = [
    {
      name: "Shop Name",
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
              editShopDetails(row);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              onDeleteShop(row);
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
    getShopData();
  }, []);

  useEffect(() => {
    const result = shopData.filter((shopData) => {
      return shopData.name.match(search);
    });
    setFilterShopData(result);
  }, [search]);

  const updaetShopDetails = () => {
    alert("success");
  };
  return (
    <div className="novaTable">
      <DataTable
        className="container headerStyles"
        title="SHOP DETAILS"
        columns={columns}
        data={filterShopData}
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
                editShopDetails();
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
        title="Edit Shop:"
        visible={isEditing}
        onCancel={() => {
          setIsEditing(false);
        }}
        onOk={() => {
          updaetShopDetails();
          setIsEditing(false);
        }}
      >
        <input value={editingShop?.name} />
      </Modal>

      <Modal
        title="Edit Shop:"
        visible={isCreate}
        onCancel={() => {
          setIsCreate(false);
        }}
        onOk={() => {
          updaetShopDetails();
          setIsCreate(false);
        }}
      >
        <input placeholder="shop name" />
      </Modal>
    </div>
  );
};

export default ShopTable;
