import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Select } from "antd";

const { Option } = Select;

const ShopFilterOptions = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const [selectedOptions, setSelectedOptions] = useState([]);

  const [isMinimized, setIsMinimized] = useState(false);

  const handleToggleClick = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSelection = (value) => {
    setSelectedOptions(value);
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const [showPicker, setShowPicker] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
    setShowPicker(false); // close the picker after a date range is selected
  };

  const handleButtonClick = () => {
    setShowPicker(!showPicker); // toggle the picker's visibility on button click
  };

  return (
    <div>
      <div>
        <button onClick={handleButtonClick}>SELECT DATE RANGE</button>
        {showPicker && (
          <DateRangePicker ranges={[dateRange]} onChange={handleSelect} />
        )}
      </div>
      <div>
        <Select
          value={selectedOption}
          onChange={handleSelectChange}
          style={{ width: 200 }}
        >
          <Option value="option1">City</Option>
          <Option value="option2">PIN</Option>
          <Option value="option3">Phone</Option>
        </Select>
      </div>

      <div>
        <Select
          mode="multiple"
          value={selectedOptions}
          onChange={handleSelection}
          style={{ width: 200 }}
        >
          <Option value="option1">Bagalkot</Option>
          <Option value="option2">Bijapur</Option>
          <Option value="option3">Bangalore</Option>
        </Select>
      </div>
    </div>
  );
};

export default ShopFilterOptions;
