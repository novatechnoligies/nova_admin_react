import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal ,Form, Input} from "antd";
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
      name: "Pincode",
      selector: (row) => row.name,
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
      name: "Today's appointment",
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
        // title="SPA DETAILS"
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
              onClick={() => {editSpaDetails();}}
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
       <div>

<Form

name="registration_form"

labelCol={{ span: 8 }}
wrapperCol={{ span: 16 }}
>
<Form.Item
label="Name"
name="name"
initialValue={editingSpa?.name}
rules={[{ required: true, message: 'Please enter your name' }]}
>
<Input />
</Form.Item>

<Form.Item
label="Adress"
name="Adress"
initialValue={editingSpa?.topLevelDomain}
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
initialValue={editingSpa?.alpha2Code}
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
initialValue={editingSpa?.alpha3Code}
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
initialValue={editingSpa?.callingCodes}
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
initialValue={editingSpa?.capital}
rules={[
  { required: true, message: 'Please enter your name' },
  { type: 'name', message: 'Please enter a valid name' },
]}
>
{/* <Select
    showSearch
    onSearch={handleSearch}
    placeholder="Select an owner"
    optionFilterProp="label"
    filterOption={filterOption}
    options={dropdownOptions}
  /> */}
</Form.Item>

<Form.Item
label="Logo"
name="Logo"
initialValue={editingSpa?.altSpellings}
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
initialValue={editingSpa?.subregion}
rules={[
  { required: true, message: 'deleted' },
  { type: 'delete', message: 'deleted' },
]}
> <Input/>
</Form.Item>

<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
<Button type="primary" htmlType="submit">
  Update Spa Details
</Button>

</Form.Item>
</Form>
</div>
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
