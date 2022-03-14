import React from "react";
import { Form, Input } from "antd";

const firstname = (props) => {
  return (
    <Form.Item
      name="firstname"
      rules={[
        { required: true, message: "Please input your Firstname!" },
        {
          required: true,
          pattern: new RegExp("^[A-Za-z -]+$"),
          message: "Wrong Format",
        },
      ]}
    >
      <Input placeholder="Firstname" />
    </Form.Item>
  );
};

export default firstname;