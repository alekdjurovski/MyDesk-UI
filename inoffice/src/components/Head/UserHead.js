import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { Header } from "antd/lib/layout/layout";
import jwt from "jwt-decode";

import HeaderImg from "./HeaderImg";
import avatar from "../../assets/avatar.png";
import { notification, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../utils/fetchEmployees";
import api from "../../helper/api";
import UserSearch from "../UserSearch/UserSearch";

const UserHead = (props) => {
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({});
  const [visible, setVisible] = useState(false);
  const [media, setMedia] = useState(window.matchMedia("(max-width: 820px)"));
  const getUsers = async () => {
    fetchEmployees(api, dispatch, notification);
  };

  useEffect(() => {
    if (employees.length === 0) {
      getUsers();
    }
  }, []);

  const config = {
    token: sessionStorage.getItem("msal.idtoken"),
    decoded: jwt(sessionStorage.getItem("msal.idtoken")),
  };
  const { employees } = useSelector((state) => state.employees);

  const findEmployee = (e) => {
    const foundEmployee = employees.find(
      ({ firstName, lastName }) => `${firstName} ${lastName}` === e
    );
    setVisible(true);
    setEmployee(foundEmployee);
  };
  return (
    <Header id="header">
      {/* Hello x user here without the my account tab, same as the admin page*/}

      <div>{props?.isHome && <HeaderImg />}</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "88%",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          {props?.isDashboard ? (
            <div>
              <UserSearch />
            </div>
          ) : (
            <div />
          )}
          <div>
            {!media.matches && (
              <img
                src={avatar}
                alt="avatar"
                style={{ width: 90, height: 50 }}
              />
            )}
            <NavLink className={"link"} to="/employee/reservations">
              {media.matches ? "Dashboard" : config.decoded.name}
            </NavLink>
            <NavLink
              className={"link"}
              to="/"
              onClick={() => {
                sessionStorage.clear();
                localStorage.clear();
                window.location = "/";
              }}
            >
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default UserHead;
