import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal ,Form, Input} from "antd";
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
      name: "Lab Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.alpha2Code,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Phone",
      selector: (row) => row.alpha3Code,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Email",
      selector: (row) => row.callingCodes,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Pincode",
      selector: (row) => row.callingCodes,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Ownername",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Today's appoinment",
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
      name: "Is deleted ",
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
        //title="SHOP DETAILS"
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
        <div>

<Form

name="registration_form"

labelCol={{ span: 8 }}
wrapperCol={{ span: 16 }}
>
<Form.Item
label="Name"
name="name"
initialValue={editingShop?.name}
rules={[{ required: true, message: 'Please enter your name' }]}
>
<Input />
</Form.Item>

<Form.Item
label="Adress"
name="Adress"
initialValue={editingShop?.topLevelDomain}
rules={[
  { required: true, message: 'Please enter your adress' },
  { type: 'email', message: 'Please enter a valid adress' },
]}
>
<Input />
</Form.Item>

<Form.Item
label="Password"
name="password"
initialValue={editingShop?.Password}
rules={[
  { required: true, message: 'Please enter a password' },
  { min: 6, message: 'Password must be at least 6 characters long' },
]}

 
>
<Input.Password />
</Form.Item>

<Form.Item
label="Email"
name="email"
initialValue={editingShop?.alpha3Code}
rules={[
  { required: true, message: 'Please enter your email' },
  { type: 'email', message: 'Please enter a valid email' },
]}
>
 <Input />
</Form.Item>

<Form.Item
label="Pincode"
name="Pincode"
initialValue={editingShop?.callingCodes}
rules={[
  { required: true, message: 'Please enter your Pincode' },
  { type: 'pincode', message: 'Please enter a valid Pincode' },
]}
>
 <Input />
</Form.Item>

<Form.Item
label="Ownername"
name="Ownername"
initialValue={editingShop?.capital}
rules={[
  { required: true, message: 'Please enter your name' },
  { type: 'name', message: 'Please enter a valid name' },
]}
>
 <Input />
</Form.Item>

<Form.Item
label="Logo"
name="Logo"
initialValue={editingShop?.altSpellings}
rules={[
  { required: true, message: 'Please enter your logo' },
  { type: 'logo', message: 'Please enter a valid logo' },
]}
>
<Input />
</Form.Item>

<Form.Item
label="Is deleted"
name="Is deleted"
initialValue={editingShop?.subregion}
rules={[
  { required: true, message: 'deleted' },
  { type: 'delete', message: 'deleted' },
]}
> <Input />
</Form.Item>

<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
<Button type="primary" htmlType="submit">
 // Update Shop Details
</Button>

</Form.Item>
</Form>
</div>
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
