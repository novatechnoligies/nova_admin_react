import React, { useState } from "react";
import ShopFilterOptions from "./ShopFilterOptions";

const ShopFilter = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleToggleClick = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      style={{
        marginLeft: "50%",
        borderBlockColor: "black",
        borderBlockStyle: "double",
      }}
    >
      Filters Options :
      <button onClick={handleToggleClick}>{isMinimized ? "+" : "-"}</button>
      {!isMinimized && (
        <div>
          <ShopFilterOptions />
        </div>
      )}
    </div>
  );
};

export default ShopFilter;
