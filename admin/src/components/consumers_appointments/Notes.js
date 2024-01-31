import React, { useEffect, useState } from "react";
import { Button, Input, Form, message } from "antd";
import "./Notes.css";
import { BASE_URL } from "../../constants/constants";
import axios from "axios";

const Notes = () => {
  // Need to integrate Get Appointment Notes by Technician
  const [notes, setNotes] = useState([
    "Dummy note 1",
    "Dummy note 2",
    "Dummy note 3",
  ]);

  const [newNote, setNewNote] = useState("");
  const [technicianId, setTechnicianId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");

  useEffect(() => {
    const sessionUserData = JSON.parse(sessionStorage.getItem("userData"));
    setTechnicianId(sessionUserData.id);
    setPatientId(4);
    setAppointmentId(1);
  }, []);

  const [form] = Form.useForm();

  const handleAddNote = async () => {
    const trimmedNote = newNote.trim();

    if (trimmedNote !== "") {
      // Update local state
      setNotes([...notes, trimmedNote]);
      setNewNote("");

      // Prepare data for POST request
      const postData = {
        note: trimmedNote,
        patientId: patientId, // Access patientId from the form
        technicianId: technicianId,
        appointmentId:appointmentId 
         // Access technicianId from the form
        // Add other fields as needed
      };

      try {
        // Send POST request to your server
        const response = await axios.post(
          BASE_URL + "/dataservice/saveTechnicianDetails",
          postData
        );
        message.success("Note successfully saved");
        // Handle response from the server (optional)
        console.log("Note successfully saved:", response.data);
      } catch (error) {
        message.error("Error saving note");
        console.error("Error saving note:", error.message);
      }
    }
  };

  return (
    <div className="Notes-Container">
      <h2>Notes</h2>
      <div className="Notes-List">
        {notes.map((note, index) => (
          <p key={index}>{note}</p>
        ))}
      </div>
      <div className="Add-Note">
        <Form form={form} onFinish={handleAddNote}>
          {/* Hidden input fields for PatientID and TechnicianID */}
          <Form.Item name="patientId" hidden initialValue={patientId}>
            <Input />
          </Form.Item>
          <Form.Item name="technicianId" hidden initialValue={technicianId}>
            <Input />
          </Form.Item>

          <Form.Item name="appointmentId" hidden initialValue={appointmentId}>
            <Input />
          </Form.Item>

          {/* Visible input field for new note */}
          <Form.Item name="newNote">
            <Input
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new note..."
            />
          </Form.Item>

          {/* Submit button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Note
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Notes;
