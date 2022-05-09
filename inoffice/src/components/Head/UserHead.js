import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { Header } from "antd/lib/layout/layout";
import jwt from "jwt-decode";
import { FileOutlined } from "@ant-design/icons";

export default class UserHead extends Component {
  config = {
    token: localStorage.getItem("msal.idtoken"),
  };
  render() {
    if (jwt(this.config.token).roles[0] == "ADMIN") {
      return (
        <Header id="header">
          <NavLink className={"link"} id="inOfficeLogo" to="/employee/home">
            <FileOutlined className={"iconLogo"} /> inOffice
          </NavLink>
          {/* Hello x user here without the my account tab, no need */}
          <NavLink className={"link"} to="/employee/reservations">
            My account
          </NavLink>
          <NavLink
            className={"link"}
            to="/"
            onClick={() => {
              localStorage.clear();
              window.location = "/";
            }}
          >
            Log out
          </NavLink>
        </Header>
      );
    }
    return (
      <Header id="header">
        <NavLink className={"link"} id="inOfficeLogo" to="/employee/home">
          <FileOutlined className={"iconLogo"} /> inOffice
        </NavLink>
        {/* Hello x user here without the my account tab, same as the admin page*/}
        <NavLink className={"link"} to="/employee/reservations">
          My account
        </NavLink>
        <NavLink
          className={"link"}
          to="/"
          onClick={() => {
            localStorage.clear();
            window.location = "/";
          }}
        >
          Log out
        </NavLink>
      </Header>
    );
  }
}
