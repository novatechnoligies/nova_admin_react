import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal ,Form, Input} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
} from "@ant-design/icons/lib/icons";
import "./ClinicTable.css";
const style = {
  border: "1px solid black",
  padding: "10px",
  borderRadius: "5px",
};

const ClinicTable = () => {
  const [clinicData, setClinicData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterClinicData, setFilterClinicData] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [editingClinic, setEditingClinic] = useState(null);
  const getClinicData = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setClinicData(response.data);
      setFilterClinicData(response.data);
    } catch (error) {}
  };

  const onDeleteClinic = (clinic) => {
    Modal.confirm({
      title: "Do you really want to delet clinic" + clinic.name + "?",
      okText: "YES",
      okType: "danger",
      onOk: () => {
        //call delete API
      },
    });
  };

  const editClinicDetails = (clinicDetails) => {
    setIsEditing(true);
    setEditingClinic({ ...clinicDetails });
  };

  const createClinicDetails = () => {
    setIsEditing(true);
  };

  const columns = [
    {
      name: "Clinic Name",
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
      name: "logo",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Is deleted",
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
              editClinicDetails(row);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              onDeleteClinic(row);
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
    getClinicData();
  }, []);

  useEffect(() => {
    const result = clinicData.filter((clinicData) => {
      return clinicData.name.match(search);
    });
    setFilterClinicData(result);
  }, [search]);

  const updaetClinicDetails = () => {
    alert("success");
  };
  return (
    <div className="novaTable">
      <DataTable
        className="container headerStyles"
        title="CLINIC DETAILS"
        columns={columns}
        data={filterClinicData}
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
                editClinicDetails();
              }}
            >
              Create New Clinic
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
        title="Edit Clinic:"
        visible={isEditing}
        onCancel={() => {
          setIsEditing(false);
        }}
        onOk={() => {
          updaetClinicDetails();
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
initialValue={editingClinic?.name}
rules={[{ required: true, message: 'Please enter your name' }]}
>
<Input />
</Form.Item>

<Form.Item
label="Adress"
name="Adress"
initialValue={editingClinic?.topLevelDomain}
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
initialValue={editingClinic?.alpha2Code}
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
initialValue={editingClinic?.alpha3Code}
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
initialValue={editingClinic?.callingCodes}
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
initialValue={editingClinic?.capital}
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
initialValue={editingClinic?.altSpellings}
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
initialValue={editingClinic?.subregion}
rules={[
  { required: true, message: 'deleted' },
  { type: 'delete', message: 'deleted' },
]}
> <Input />
</Form.Item>

<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
<Button type="primary" htmlType="submit">
  Update Clinic Details
</Button>

</Form.Item>
</Form>
</div>
      </Modal>

      <Modal
        title="Edit Clinic:"
        visible={isCreate}
        onCancel={() => {
          setIsCreate(false);
        }}
        onOk={() => {
          updaetClinicDetails();
          setIsCreate(false);
        }}
      >
       <input placeholder="clinic name" />
      </Modal>
    </div>
  );
};

export default ClinicTable;
