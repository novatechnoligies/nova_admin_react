import React from "react";
import { Button, Modal, Form, Input, Popconfirm  } from "antd";

const OrganizationSummary = ({ organization, onClose }) => {
    // Implement the UI for the organization summary
    return (
      // Your organization summary UI here
      <div>
        <h2>{organization.name}</h2>
        {/* Display other organization details */}
        <Button onClick={onClose}>Close</Button>
      </div>
    );
  };

  export default OrganizationSummary;