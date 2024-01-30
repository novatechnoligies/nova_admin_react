import React, { useState } from 'react';
import './App.css';
import React from 'react';

const TableHeader = () => {
  const headerStyle = {
    backgroundColor: '#3498db',  // Replace with the desired color
    color: '#fff',               // Replace with the desired text color
    fontWeight: 'bold',
  };

/*const App = () => {
  // Sample employee data
  const initialEmployees = [
    { id: 1, name: 'John Doe', position: 'Developer' },
    { id: 2, name: 'Jane Smith', position: 'Designer' },
    // Add more employee data as needed
  ];

  const [employees, setEmployees] = useState(initialEmployees);

  return (
    <div className="App">
      <h1>Employee Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;*/