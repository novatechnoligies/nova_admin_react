import React, { useState } from "react";
import { Select, DatePicker, Space, TimePicker } from "antd";
import "./AddDrop.css";
const OPTIONS = ["service 1", "service 2", "service 3", "service 4"];

const onChangeD = (date, dateString) => {
  console.log(date, dateString);
};

const onChangeT = (time, timeString) => {
  console.log(time, timeString);
};

const AddDrop = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  return (
    <div className="option-css">
      <div className="select-css">
        Add Services :
        <Select
          mode="multiple"
          placeholder="select services"
          value={selectedItems}
          onChange={setSelectedItems}
          style={{
            width: "80%",
          }}
          options={filteredOptions.map((item) => ({
            value: item,
            label: item,
          }))}
        />
      </div>

      <div className="date-time">
        <div className="select-date">
          Date:
          <Space direction="vertical">
            <DatePicker onChange={onChangeD} />
          </Space>
        </div>

        <div className="select-time">
          Time :
          <Space wrap>
            <TimePicker use12Hours onChange={onChangeT} />
          </Space>
        </div>
      </div>
    </div>
  );
};
export default AddDrop;
