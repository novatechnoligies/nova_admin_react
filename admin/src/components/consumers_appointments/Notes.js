import React, { useState } from "react";
import { Button, Input } from "antd";
import "./Notes.css";

const Notes = () => {
  const [notes, setNotes] = useState([
    "Dummy note 1",
    "Dummy note 2",
    "Dummy note 3",
  ]);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote("");
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
        <Input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
        />
        <Button type="primary" onClick={handleAddNote}>
          Save Note
        </Button>
      </div>
    </div>
  );
};

export default Notes;
