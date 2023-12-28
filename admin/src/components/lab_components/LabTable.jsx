import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {Button, Modal, Form, Input, Select, DatePicker, Checkbox, TimePicker, Card} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { BASE_URL } from "../../constants/constants";
import axios from "axios";
import LabFormModal from "./LabFormModal";
import LabAvailabilityModal from "./LabAvailabilityModal";
import LabServiceModal from "./LabServiceModal";
import Summary from "./Suummary";


const LabDataTable = ({ data, onDeleteLab }) => {

  const [filterLabData, setFilterLabData] = useState([]);
  const [search, setSearch] = useState("");
  const [labData, setLabData] = useState([]);
  const [isCreateLabModalVisible, setIsCreateLabModalVisible] = useState(false);
  const [isLabAvailabilityModalVisible, setIsLabAvailabilityModalVisible] = useState(false);
  const [isAddServiceModalVisible, setIsAddServiceModalVisible] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const [showLabTable, setShowLabTable] = useState(true);
  

  const handleRowClick = (row) => {
    setSelectedLab(row);
    setShowSummary(true);
    setShowLabTable(false);
  };

  const onEditLab = (row) => {
    alert(row.id)
  }

  // ON LOAD
  useEffect(() => {
    getLabData();
    const result = labData.filter((lab) => {
      return lab.shopName.toLowerCase().includes(search.toLowerCase());
    });
    console.log("Filtered result:", result);
    setFilterLabData(result);
  }, [search]);
 
  const getLabData = async () => {
    try {
      const response = await axios.get(
        BASE_URL + "/dataservice/findAllShopDetails"
      );
      setLabData(response.data);
      //setFilterLabData(response.data);
    } catch (error) {}
  };

  const columns = [
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
    setIsLabAvailabilityModalVisible(true);
  };

  const handleLabAvailabilityModalCancel = () => {
    setIsLabAvailabilityModalVisible(false);
  };

  const handleLabAvailabilityModalSubmit = (values) => {
    console.log("Lab created:", values);
    setIsLabAvailabilityModalVisible(false);
  };

  // Handle Add Services Modal
  const handleLabService = () => {
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
          marginBottom: '16px',  // Adjust the margin bottom as needed
        },
      }}
      actions={
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
           <Button type="primary" style={{ marginRight: "10px" }}  onClick={handleCreateLabClick}><PlusOutlined /> Create New Lab</Button>
           <Button type="primary"  style={{ marginRight: "10px" }} onClick={handleLabAvailabilityModalClick}>Update Lab Availibility</Button>
           <Button type="primary"  onClick={handleLabService}>Update Service</Button>
          
        </div>
      }
      subHeaderComponent={
        <div>
          <input
            type="text"
            placeholder="Search Here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>
      }
      subHeader
      onRowClicked={handleRowClick}
    />):(
    <Summary labData={selectedLab} />
    )}

      <LabFormModal
        visible={isCreateLabModalVisible}
        onCancel={handleCreateLabModalCancel}
        onCreate={handleCreateLabModalSubmit}
      />

        <LabAvailabilityModal
          visible={isLabAvailabilityModalVisible}
          onCancel={handleLabAvailabilityModalCancel}
          onCreate={handleLabAvailabilityModalSubmit}
        />

        <LabServiceModal
             visible={isAddServiceModalVisible}
             onCancel={handleLabServiceCancel}
             onCreate={handleLabServiceSubmit}
        />

    </div>
  );
};

export default LabDataTable;

// import DataTable from "react-data-table-component";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {Button, Modal, Form, Input, Select, DatePicker, Checkbox, TimePicker, Card} from "antd";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import {DeleteOutlined, EditOutlined, ExportOutlined} from "@ant-design/icons/lib/icons";
// import "./LabTable.css";
// import moment from "moment";
// import { BASE_URL } from "../../constants/constants";

// const LabTable = ({ selectedLocation, handleLocationChange }) => {
//   //const [showFlash, setShowFlash] = useState(false);
//   const [shopAvailibilityModal, setShopAvailibilityModal] = useState(false);
//   const [showServiceModel, setShowServiceModel] = useState(false);
//   const [serviceData, setServiceData] = useState([]);
//   const [creatShopModalData, setCreateShopModalData] = useState(null);
//   const [selectedServices, setSelectedServices] = useState([]);

//   const [form] = Form.useForm();
//   const [availibilityForm] = Form.useForm();
//   const [dropdownOptions, setDropdownOptions] = useState([]);

//   const handleCheckboxChange = (serviceId) => {
//     setPriceInputs((prevInputs) => {
//       const updatedInputs = { ...prevInputs };
//       updatedInputs[serviceId] = !updatedInputs[serviceId];

//       // Move the selected value to a new list if checked
//       if (updatedInputs[serviceId]) {
//         setSelectedServices((prevServices) => [...prevServices, serviceId]);
//       } else {
//         // Remove the value from the list if unchecked
//         setSelectedServices((prevServices) =>
//           prevServices.filter((service) => service !== serviceId)
//         );
//       }
//       console.log(updatedInputs);
//       return updatedInputs;
//     });
//   };

//   const handlePriceInputChange = (e, serviceId) => {
//     const { value } = e.target;
//     setPriceInputs((prevInputs) => ({
//       ...prevInputs,
//       [serviceId]: value,
//     }));
//   };

//   // Fetch data from API and set the serviceData state
//   useEffect(() => {
//     // Simulating API call with a timeout
//     setTimeout(() => {
//       const data = [
//         { id: 1, name: "Service 1", description: "Service 1 Description" },
//         { id: 2, name: "Service 2", description: "Service 2 Description" },
//         { id: 3, name: "Service 3", description: "Service 3 Description" }, //added to work on FIRST-33
//         { id: 4, name: "Service 4", description: "Service 4 Description" }, //added to work on FIRST-33
//         { id: 5, name: "Service 5", description: "Service 5 Description" }, //added to work on FIRST-33
//         // Added more services here
//       ];
//       setServiceData(data);
//     }, 1000);
//   }, []);

//   // const handleOk = () => {
//   //   const selectedServices = serviceData.filter((service) => priceInputs[service.id]);
//   //   console.log('Selected Services:', selectedServices);
//   //   setShowServiceModel(false);
//   // };

//   const handleCreateShopModalPost = (values) => {
//     console.log("Form values:", values);
//     setShopAvailibilityModal(true);
//     const modifiedData = {
//       ...values,
//       owner: { id: values.owner },
//     };
//     axios
//       .post(BASE_URL + "/dataservice/saveShopDetails", modifiedData)
//       .then((response) => {
//         console.log("Post request successful:", response.data.id);
//         setShopAvailibilityModal(true);
//         setShowServiceModel(false);
//         setCreateShopModalData(response.data.id);
//       })
//       .catch((error) => {
//         console.error("Post request error:", error);
//       });
//   };
//   const handleShopAvailibilityModalPost = async (values) => {
//     try {
//       const formattedData = formatFormData(values);
//       console.log("Formatted data:", formattedData);

//       console.log("values.fromDate before formatting:", moment(values.fromDate).format("YYYY-MM-DD"));
//       console.log("Editing Lab From Date:", editingLab?.fromDate);

//       const response = await axios.post(BASE_URL + "/dataservice/saveShopAvailability", formattedData);
//       console.log("Post request successful:", response.data);

//       setShopAvailibilityModal(false);
//       setShowServiceModel(true);
//       getAllLabServices();
//     } catch (error) {
//       console.error("Post request error:", error);
//       // Handle specific error cases if needed
//     }
//   };

//   const formatFormData = (values) => {
//     console.log("Form values before formatting:", values);
//     return {
//       ...values,
//       shop: { id: 8 },
//       fromDate: moment(values.fromDate).format("YYYY-MM-DD"),
//       toDate: moment(values.toDate).format("YYYY-MM-DD"),
//       fromTime: moment(values.fromTime).format("HH:mm"),
//       toTime: moment(values.toTime).format("HH:mm"),
//     };
//   };

//   const daysOfWeekOptions = [
//     { label: "Monday", value: "monday" },
//     { label: "Tuesday", value: "tuesday" },
//     { label: "Wednesday", value: "wednesday" },
//     { label: "Thursday", value: "thursday" },
//     { label: "Friday", value: "friday" },
//     { label: "Saturday", value: "saturday" },
//     { label: "Sunday", value: "sunday" },
//   ];
//   // const { Option } = Select;

//   const handleSearch = (value) => {
//     axios
//       .get(BASE_URL + `/dataservice/searchOwnerByName?ownerName=${value}`)
//       .then((response) => {
//         const searchOwner = response.data.map((result) => ({
//           value: result.id,
//           label: result.username,
//         }));

//         setDropdownOptions(searchOwner);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const mapContainerStyle = {
//     width: "100%",
//     height: "400px",
//   };
//   const defaultCenter = {
//     lat: 37.7749, // Set default latitude
//     lng: -122.4194, // Set default longitude
//   };

//   const handleMapClick = (event) => {
//     const { latLng } = event;
//     const lat = latLng.lat();
//     const lng = latLng.lng();

//     handleLocationChange({ lat, lng });
//   };

//   const [labData, setLabData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filterLabData, setFilterLabData] = useState([]);

//   const [isEditing, setIsEditing] = useState(false);
//   const [isCreate, setIsCreate] = useState(false);
//   const [editingLab, setEditingLab] = useState({});
//   const [priceInputs, setPriceInputs] = useState({});

//   const getLabData = async () => {
//     try {
//       const response = await axios.get(
//         BASE_URL + "/dataservice/findAllShopDetails"
//       );
//       console.log("lab data" + response.data);
//       setLabData(response.data);
//       setFilterLabData(response.data);
//     } catch (error) {}
//   };

//   const getAllLabServices = async () => {
//     try {
//       await axios
//         .get(BASE_URL + "/dataservice/findAllMaster")
//         .then((response) => {
//           setServiceData(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         });
//     } catch (error) {}
//   };

//   const filterOption = (input, option) => {
//     if (option && option.label) {
//       return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
//     }
//     return false;
//   };

//   const onDeleteLab = (lab) => {
//     Modal.confirm({
//       title: "Do you really want to delet lab" + lab.name + "?",
//       okText: "YES",
//       okType: "danger",
//       onOk: () => {
//         //call delete API
//       },
//     });
//   };

//   const editLabDetails = (labDetails) => {
//     setIsEditing(true);
//     setEditingLab({ ...labDetails });
//   };

//   // const createLabDetails = () => {
//   //   setIsEditing(true);
//   // };

//   const columns = [
//     {
//       name: "Lab Name",
//       selector: (row) => row.shopName,
//       sortable: true,
//       style: {
//         fontWeight: "bold",
//       },
//       style: {wordWrap: 'break-word' },

//     },
//     {
//       name: "Address",
//       selector: (row) => row.shopAddress,
//       sortable: true,
//       style: {wordWrap: 'break-word' },
//     },
//     {
//       name: "Phone",
//       selector: (row) => row.phone,
//       sortable: true,
//       style: {wordWrap: 'break-word' },
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email,
//       sortable: true,
//       style: {wordWrap: 'break-word' },
//     },
//     {
//       name: "pinCode",
//       selector: (row) => row.pinCode,
//       sortable: true,
//       style: {wordWrap: 'break-word' },
//     },
//     {
//       name: "Ownername",
//       selector: (row) => row.shopName,
//       sortable: true,
//       style: {wordWrap: 'break-word' },
//     },
//     {
//       name: "GST NO",
//       selector: (row) => row.gstNo,
//       sortable: true,
//       style: {wordWrap: 'break-word' },
//     },
//     {
//       name: "Logo",
//       selector: (row) => row.logo,
//       sortable: true,
//       style: {wordWrap: 'break-word' },
//     },
//     {
//       name: "Is deleted ",
//       selector: (row) => row.shopName,
//       sortable: true,
//       style: {wordWrap: 'break-word' },
//     },
//     {
//       name: "Action",
//       cell: (row) => (
//         <div>
//           <EditOutlined
//             onClick={() => {
//               editLabDetails(row);
//             }}
//           />
//           <DeleteOutlined
//             onClick={() => {
//               onDeleteLab(row);
//             }}
//             style={{ color: "red", marginLeft: "20px" }}
//           />
//         </div>
//         // <Button type="primary" onClick={() => alert(row.name)}>
//         //   Edit
//         // </Button>
//       ),
//       style: {
//         fontWeight: "bold",
//       },
//       style: {wordWrap: 'break-word' },
//     },
//   ];

//   useEffect(() => {
//     getLabData();
//     getAllLabServices();
//   }, []);

//   const handleCancel = () => {
//     // Handle cancellation of the service model modal
//     setShowServiceModel(false);
//   };

//   useEffect(() => {
//     console.log("Original labData:", labData);
//     console.log("Search value:", search);

//     const result = labData.filter((lab) => {
//       return lab.shopName.toLowerCase().includes(search.toLowerCase());
//     });

//     console.log("Filtered result:", result);
//     setFilterLabData(result);
//   }, [search]);

//   const updaetLabDetails = () => {
//     alert("success");
//   };
//   return (
//     <div className=" ">
//       <header></header>
//       <DataTable
//         className="container headerStyles"
//         title="LAB DETAILS"
//         columns={columns}
//         data={filterLabData}
//         pagination
//         fixedHeader
//         fixedHeaderScrollHeight="400px"
//         selectableRows
//         selectableRowsHighlight
//         highlightOnHover
//         style={{ width: "100%" }}
//         actions={
//           <div>
//             <ExportOutlined>
//               <Button>Export</Button>
//             </ExportOutlined>

//             <Button
//               style={{ marginLeft: "20px" }}
//               type="primary"
//               onClick={() => {
//                 editLabDetails();
//               }}
//             >
//               Create New Lab
//             </Button>
//           </div>
//         }
//         subHeaderComponent={
//           <input
//             className="w-25 form-control"
//             type="text"
//             placeholder="Search Here"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           ></input>
//         }
//         subHeader
//       />

//       <Modal
//         title="Create New Lab"
//         visible={isEditing}
//         onCancel={() => {
//           setIsEditing(false);
//           form.resetFields();
//         }}
//         onOk={() => {
//           form
//             .validateFields()
//             .then((values) => {
//               handleCreateShopModalPost(values);
//               form.resetFields();
//               setIsEditing(false);
//             })
//             .catch((error) => {
//               console.log("Form validation error:", error);
//             });
//         }}
//       >
//         <Form
//           form={form}
//           name="registration_form"
//           labelCol={{ span: 8 }}
//           wrapperCol={{ span: 16 }}
//         >
//           <Form.Item label="id" name="id" initialValue={editingLab?.id} hidden>
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Name"
//             name="shopName"
//             initialValue={editingLab?.shopName}
//             rules={[{ required: true, message: "Please enter your name" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Adress"
//             name="shopAddress"
//             initialValue={editingLab?.shopAddress}
//             rules={[
//               { required: true, message: "Please enter your adress" },
//               { message: "Please enter a valid adress" },
//             ]}
//           >
//             <Input.TextArea />
//           </Form.Item>

//           {/* <Form.Item
//                 label="Password"
//                 name="password"
//                 initialValue={editingLab?.alpha2Code}
//                 rules={[
//                   { required: true, message: 'Please enter a password' },
//                   { min: 6, message: 'Password must be at least 6 characters long' },
//                 ]}>
//               <Input.Password />
//               </Form.Item> */}

//           <Form.Item
//             label="Email"
//             name="email"
//             initialValue={editingLab?.email}
//             rules={[
//               { required: true, message: "Please enter your email" },
//               { type: "email", message: "Please enter a valid email" },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Post Pin"
//             name="pinCode"
//             initialValue={editingLab?.pinCode}
//             rules={[
//               { required: true, message: "Please enter your Pincode" },
//               {
//                 min: 6,
//                 type: "pinCode",
//                 message: "Please enter a valid Pincode",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Ownername"
//             name="owner"
//             rules={[
//               { required: false, message: "Please enter your name" },
//               { type: "name", message: "Please enter a valid name" },
//             ]}
//           >
//             <Select
//               showSearch
//               onSearch={handleSearch}
//               placeholder="Select an owner"
//               optionFilterProp="label"
//               filterOption={filterOption}
//               options={dropdownOptions}
//             />
//           </Form.Item>

//           <Form.Item
//             label="Phone"
//             name="phone"
//             initialValue={editingLab?.phone}
//             rules={[
//               { required: true, message: "Please enter your Phone" },
//               { type: "name", message: "Please enter a valid Phone number" },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="GST"
//             name="gstNo"
//             initialValue={editingLab?.gstNo}
//             rules={[{ message: "Please enter your name" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Logo"
//             name="logo"
//             initialValue={editingLab?.Logo}
//             rules={[
//               { required: true, message: "Please enter your logo" },
//               { type: "logo", message: "Please enter a valid logo" },
//             ]}
//           >
//             <Input type="file" />
//           </Form.Item>

//           <LoadScript googleMapsApiKey="YOUR_API_KEY">
//             <GoogleMap
//               mapContainerStyle={mapContainerStyle}
//               zoom={12} // Adjust the initial zoom level as needed
//               center={selectedLocation ? selectedLocation : defaultCenter}
//               onClick={handleMapClick}
//             >
//               {selectedLocation && <Marker position={selectedLocation} />}
//             </GoogleMap>
//           </LoadScript>

//           {/* <Form.Item
//                 label="Is deleted"
//                 name="Is deleted"
//                 initialValue={editingLab?.subregion}
//                 rules={[
//                   { required: true, message: 'deleted' },
//                   { type: 'delete', message: 'deleted' },
//                 ]}>
//                   <Input />
//               </Form.Item> */}
//         </Form>
//       </Modal>

//       <Modal
//         title="Edit Lab:"
//         visible={isCreate}
//         onCancel={() => {
//           setIsCreate(false);
//         }}
//         onOk={() => {
//           updaetLabDetails();
//           setIsCreate(false);
//         }}
//       >
//         <input placeholder="lab name" />
//       </Modal>

//       <Modal
//         title="WelCome to Nova Update Shop Availbility here"
//         visible={shopAvailibilityModal}
//         inputData={creatShopModalData}
//         onCancel={() => {
//           setShopAvailibilityModal(false);
//           //setShopAvailibilityModal(false);
//         }}
//         onOk={() => {
//           availibilityForm
//             .validateFields()
//             .then((values) => {
//               handleShopAvailibilityModalPost(values);
//               availibilityForm.resetFields();
//               setIsEditing(false);
//             })
//             .catch((error) => {
//               console.log("Form validation error:", error);
//             });
//           // Handle Ok button click in the service model modal
//           setShowServiceModel(true); // Close the service model modal
//           setShopAvailibilityModal(false); // Show the new modal
//         }}
//       >
//         <Form
//           form={availibilityForm}
//           name="registration_form"
//           labelCol={{ span: 8 }}
//           wrapperCol={{ span: 16 }}
//         >
//           <Form.Item
//             label="id"
//             name="id"
//             initialValue={editingLab?.id}
//             hidden // Use the hidden prop to hide the form field
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="shopId"
//             name="shopId"
//             initialValue={creatShopModalData}
//             hidden // Use the hidden prop to hide the form field
//             rules={[{ required: false }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Start Date"
//             name="fromDate"
//             // initialValue={
//             //   editingLab?.fromDate
//             //     ? moment(editingLab.fromDate, "YYYY-MM-DD")
//             //     : undefined
//             // }
//             rules={[{ required: true, message: "Please enter the start date" }]}
//           >
//             <DatePicker format="YYYY-MM-DD" />
//           </Form.Item>

//           <Form.Item
//             label="End Date"
//             name="toDate"
//             // initialValue={
//             //   editingLab?.toDate
//             //     ? moment(editingLab.toDate, "YYYY-MM-DD")
//             //     : undefined
//             // }
//             rules={[{ required: true, message: "Please enter the end date" }]}
//           >
//             <DatePicker format="YYYY-MM-DD" />
//           </Form.Item>

//           <Form.Item
//             name="selectedDays"
//             label="Holidays:"
//             rules={[
//               { required: true, message: "Please select at least one day!" },
//             ]}
//           >
//             <Checkbox.Group
//               style={{ display: "flex", flexDirection: "column" }}
//             >
//               <Checkbox value="Monday" style={{ marginLeft: "8px" }}>
//                 Monday
//               </Checkbox>
//               <Checkbox value="Tuesday">Tuesday</Checkbox>
//               <Checkbox value="Wednesday">Wednesday</Checkbox>
//               <Checkbox value="Thursday">Thursday</Checkbox>
//               <Checkbox value="Friday">Friday</Checkbox>
//               <Checkbox value="Saturday">Saturday</Checkbox>
//               <Checkbox value="Sunday">Sunday</Checkbox>
//             </Checkbox.Group>
//           </Form.Item>

//           <Form.Item
//             label="Open Time"
//             name="fromTime"
//             // initialValue={
//             //   editingLab?.fromTime
//             //     ? moment(editingLab.fromTime, "HH:mm")
//             //     : undefined
//             // }
//             rules={[{ required: true, message: "Please enter the open time" }]}
//           >
//             <TimePicker format="HH:mm" />
//           </Form.Item>

//           <Form.Item
//             label="Close Time"
//             name="toTime"
//             // initialValue={
//             //   editingLab?.toTime
//             //     ? moment(editingLab.toTime, "HH:mm")
//             //     : undefined
//             // }
//             rules={[{ required: true, message: "Please enter the open time" }]}
//           >
//             <TimePicker format="HH:mm" />
//           </Form.Item>

//           <Form.Item
//             label="Intervals"
//             name="timeInterval"
//             initialValue={editingLab?.timeInterval}
//             rules={[{ required: true, message: "Please enter the open time" }]}
//           >
//             <Input />
//           </Form.Item>
//         </Form>

//         {/* New modal content */}
//       </Modal>

//       <Modal
//         style={{ width: "100%", display: "inline-flex", marginLeft: "300px" }}
//         onCancel={handleCancel}
//         title="Update Your Service With Price"
//         visible={showServiceModel}
//         onOk={() => {
//           // Handle Ok button click in the new modal
//           setShowServiceModel(false); // Close the new modal
//         }}
//       >
//         {Array.isArray(serviceData) ? (
//           serviceData.map((service) => (
//             <Card key={service.id}>
//               <Checkbox
//                 onChange={() => handleCheckboxChange(service.id)}
//                 checked={!!priceInputs[service.id]}
//               >
//                 {service.name}
//               </Checkbox>
//               {priceInputs[service.id] && (
//                 <Input
//                   placeholder="Enter price"
//                   defaultValue="0"
//                   value={priceInputs[service.id]}
//                   onChange={(e) => handlePriceInputChange(e, service.id)}
//                 />
//               )}
//               <p>Description: {service.description}</p>
//             </Card>
//           ))
//         ) : (
//           <p>Loading service data...</p>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default LabTable;
