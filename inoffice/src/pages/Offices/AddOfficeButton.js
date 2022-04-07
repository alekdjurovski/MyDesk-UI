import React from "react";
import { Button, Typography, List } from "antd";

const Trigger = ({ addOfficeText, buttonRef, showModal }) => {
  return (
    <Button
    block
      onClick={() => (window.location = "/admin/addoffice")}
      id="addOffice"
      ref={buttonRef}
      onClick={showModal}
      type="primary"
      shape="round"
    >
      {addOfficeText}
    </Button>
  );
};
export default Trigger;
