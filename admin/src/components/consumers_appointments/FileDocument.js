import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Avatar } from "antd";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import "./FileDocument.css";

const FileDocument = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    // Assuming you want to store the file details in the state
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  return (
    <div className="file-container">
      <h2 style={{ display: "flex", alignItems: "center" }}>
        Files/Documents
        <label
          htmlFor="fileInput"
          style={{
            marginLeft: "30px",
            cursor: "pointer",
            color: "#007bff",
          }}
        >
          Add files
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileUpload}
          multiple
          style={{ display: "none" }}
        />
      </h2>
      {uploadedFiles.length > 0 && (
        <div>
          <h3>Uploaded Files:</h3>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileDocument;
