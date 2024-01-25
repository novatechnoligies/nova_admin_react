import React, { useState } from 'react';
import './Ems.css';

const Ems = () => {
  // Sample employee data
  const initialEmployees = [
    { id:'1', name: 'Krishna', Phone_Number:'8874646783',Address:'Bangalore', Email:'krishna111d@gmail.com',
      Pincode:'560008',Adhar_Number:'776865673456',position: 'Tecnisian',Gender:'Male' },
    { id:'2', name: 'Ramakant', Phone_Number:'8546786342',Address:'Bangalore', Email:'ramakant222@gmail.com',
      Pincode:'560001',Adhar_Number:'887999556633',position: 'Cashier',Gender:'Male' },
      { id:'3', name: 'Shankar P', Phone_Number:'9567843567',Address:'Bangalore', Email:'shankarp333@gmail.com',
      Pincode:'530068',Adhar_Number:'6677455443322',position: 'Developer',Gender:'Male' },
      { id:'4', name: 'Parvatidevi', Phone_Number:'6785467434',Address:'Bangalore', Email:'parvatid444@gmail.com',
      Pincode:'562157',Adhar_Number:'555447778899',position: 'Designer',Gender:'Female' },
      { id:'5', name: 'Shivakumar', Phone_Number:'7453287895',Address:'Bangalore', Email:'shivak555@gmail.com',
      Pincode:'562162',Adhar_Number:'999777556832',position: 'Admin',Gender:'Male' },
      { id:'6', name: 'Kavita R', Phone_Number:'9867534569',Address:'Bangalore', Email:'kavitar666@gmail.com',
      Pincode:'570075',Adhar_Number:'8877755443322',position: 'Developer',Gender:'Female' },
      { id:'7', name: 'Sarswati M', Phone_Number:'8874646783',Address:'Bangalore', Email:'sarswatim456@gmail.com',
      Pincode:'570078',Adhar_Number:'776865673456',position: 'Developer',Gender:'Female' },
    // Add more employee data as needed
  ];

  const [employees, setEmployees] = useState(initialEmployees);
  const handleEditClick = (employeeId) => {
    // Implement the logic for editing an employee
    console.log(`Edit button clicked for employee with ID ${employeeId}`);
  };

  const handleDeleteClick = (employeeId) => {
    // Implement the logic for deleting an employee
    const updatedEmployees = employees.filter((employee) => employee.id !== employeeId);
    setEmployees(updatedEmployees);
  };
  
return (
    <div className="Ems">
      <h1>Employee Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Email</th>
            <th>Pincode</th>
            <th>Adhar Number</th>
            <th>Position</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.Phone_Number}</td>
              <td>{employee.Address}</td>
              <td>{employee.Email}</td>
              <td>{employee.Pincode}</td>
              <td>{employee.Adhar_Number}</td>
              <td>{employee.position}</td>
              <td>{employee.Gender}</td>
              <td>
            <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => handleEditClick(employee.id)}>Edit </button>
              {' '}
              <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => handleDeleteClick(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Ems;
