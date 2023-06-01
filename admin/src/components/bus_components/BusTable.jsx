// import DataTable from "react-data-table-component";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Modal } from "antd";
// import {
//   DeleteOutlined,
//   EditOutlined,
//   ExportOutlined,
// } from "@ant-design/icons/lib/icons";
// import "./BusTable.css";
// const style = {
//   border: "1px solid black",
//   padding: "10px",
//   borderRadius: "5px",
// };

// const BusTable = () => {
//   const [busData, setBusData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filterBusData, setFilterBusData] = useState([]);

//   const [isEditing, setIsEditing] = useState(false);
//   const [isCreate, setIsCreate] = useState(false);
//   const [editingBus, setEditingBus] = useState(null);
//   const getBusData = async () => {
//     try {
//       const response = await axios.get("https://restcountries.com/v2/all");
//       setBusData(response.data);
//       setFilterBusData(response.data);
//     } catch (error) {}
//   };

//   const onDeleteBus = (bus) => {
//     Modal.confirm({
//       title: "Do you really want to delet bus" + bus.name + "?",
//       okText: "YES",
//       okType: "danger",
//       onOk: () => {
//         //call delete API
//       },
//     });
//   };

//   const editBusDetails = (busDetails) => {
//     setIsEditing(true);
//     setEditingBus({ ...busDetails });
//   };

//   const createBusDetails = () => {
//     setIsEditing(true);
//   };

//   const columns = [
//     {
//       name: "Bus Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Address",
//       selector: (row) => row.name,
//       sortable: true,
//       style: {
//         fontWeight: "bold",
//       },
//     },
//     {
//       name: "Phone",
//       selector: (row) => row.name,
//       sortable: true,
//       style: {
//         fontWeight: "bold",
//       },
//     },
//     {
//       name: "Phone",
//       selector: (row) => row.name,
//       sortable: true,
//       style: {
//         fontWeight: "bold",
//       },
//     },
//     {
//       name: "Phone",
//       selector: (row) => row.name,
//       sortable: true,
//       style: {
//         fontWeight: "bold",
//       },
//     },
//     {
//       name: "Phone",
//       selector: (row) => row.name,
//       sortable: true,
//       style: {
//         fontWeight: "bold",
//       },
//     },
//     {
//       name: "Phone",
//       selector: (row) => row.name,
//       sortable: true,
//       style: {
//         fontWeight: "bold",
//       },
//     },
//     {
//       name: "Action",
//       cell: (row) => (
//         <div>
//           <EditOutlined
//             onClick={() => {
//               editBusDetails(row);
//             }}
//           />
//           <DeleteOutlined
//             onClick={() => {
//               onDeleteBus(row);
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
//     },
//   ];

//   useEffect(() => {
//     getBusData();
//   }, []);

//   useEffect(() => {
//     const result = busData.filter((busData) => {
//       return busData.name.match(search);
//     });
//     setFilterBusData(result);
//   }, [search]);

//   const updaetBusDetails = () => {
//     alert("success");
//   };
//   return (
//     <div className="novaTable">
//       <DataTable
//         className="container headerStyles"
//         title="BUS DETAILS"
//         columns={columns}
//         data={filterBusData}
//         pagination
//         fixedHeader
//         fixedHeaderScrollHeight="400px"
//         selectableRows
//         selectableRowsHighlight
//         highlightOnHover
//         actions={
//           <div>
//             <ExportOutlined>
//               <Button>Export</Button>
//             </ExportOutlined>

//             <Button
//               style={{ marginLeft: "20px" }}
//               type="primary"
//               onClick={() => {
//                 editBusDetails();
//               }}
//             >
//               Create New Bus
//             </Button>
//           </div>
//         }
//         subHeader
//         subHeaderComponent={
//           <input
//             className="w-25 form-control"
//             type="text"
//             placeholder="Search Here"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           ></input>
//         }
//       />

//       <Modal
//         title="Edit Bus:"
//         visible={isEditing}
//         onCancel={() => {
//           setIsEditing(false);
//         }}
//         onOk={() => {
//           updaetBusDetails();
//           setIsEditing(false);
//         }}
//       >
//         <input value={editingBus?.name} />
//       </Modal>

//       <Modal
//         title="Edit Bus:"
//         visible={isCreate}
//         onCancel={() => {
//           setIsCreate(false);
//         }}
//         onOk={() => {
//           updaetBusDetails();
//           setIsCreate(false);
//         }}
//       >
//         <input placeholder="bus name" />
//       </Modal>
//     </div>
//   );
// };

// export default BusTable;
