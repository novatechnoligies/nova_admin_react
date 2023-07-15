import React, { useState, useEffect } from "react";

const FlashMessage = ({ message, duration }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return isVisible ? <div className="flash-message">{message}</div> : null;
};

export default FlashMessage;
