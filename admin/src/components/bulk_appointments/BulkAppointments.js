import React, { useState } from 'react';
import { Form, Upload, Button, Input, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './BulkAppointments.css'; // Import CSS file for styling

const { TextArea } = Input;

const BulkAppointments = () => {
  const [note, setNote] = useState(""); // State to manage the note input
  const [modalVisible, setModalVisible] = useState(false); // State to manage the visibility of the modal

  // Function to handle changes in the note input
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  // Function to handle saving the note as instruction
  const saveNoteAsInstruction = () => {
    // You can implement the logic to save the note as instruction here
    console.log("Note saved as instruction:", note);
    setModalVisible(true); // Show the modal
  };

  // Function to handle closing the modal
  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <div className="container-box">
      <h2 className="bulk-appointments-title">Bulk Appointments Upload</h2>
      <div className="bulk-appointments-container">
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <div className="form-content">
            <Form.Item
              name="upload"
              label="Choose File"
              valuePropName="fileList"
              rules={[{ required: true, message: 'Please upload a file!' }]}
              className="choose-file"
            >
              <Upload
                name="logo"
                action="/upload.do"
                listType="picture"
                beforeUpload={() => false} // Disable automatic upload
              >
                <Button className="upload-button" icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            <div className="button-group">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button>Cancel</Button>
            </div>
          </div>
        </Form>

        {/* Additional Content Section */}
        <div className="additional-content">
          <h3>Additional Information</h3>
          <p>
            You can provide additional information here. This section can include any instructions, guidelines,
            or additional details related to bulk appointments upload.
          </p>

          {/* Note Input Box */}
          <div className="note-input">
            <TextArea
              value={note}
              onChange={handleNoteChange}
              placeholder="Type your note here..."
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
            <Button type="primary" onClick={saveNoteAsInstruction} style={{ marginTop: '10px' }}>
              Save as Instruction
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for Note Saved Confirmation */}
      <Modal
        title="Note Saved!"
        visible={modalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
      >
        <p>Your note has been saved as instruction.</p>
      </Modal>
    </div>
  );
};

export default BulkAppointments;
