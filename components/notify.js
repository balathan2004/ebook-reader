import React, { useEffect } from "react";
export default function Notify({ message, messageFunction }) {
  useEffect(() => {
    setTimeout(() => {
      messageFunction(null);
    }, 5000);
  });

  if (message) {
    return (
      <div className="notify">
        <span>{message}</span>
      </div>
    );
  }
}
