import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../helper/api";
import Layout, { Content } from "antd/lib/layout/layout";
import UserHeade from "../../components/Head/UserHead";
import { Button, Typography, List, Card, Input } from "antd";

import { Popconfirm, Row, Col } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import "../Offices/Offices.css";
import Title from "./Title";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffices } from "../../redux/Offices/offices";
import {
  openError,
  openNotification,
} from "../../components/notification/Notification";

const Offices = () => {
  const [inputFilter, setInputFilter] = useState("");

  const data = useSelector((state) => state.offices.offices);
  console.log(data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOffices());
  }, [dispatch]);

  const deleteFunc = (value) => {
    api
      .delete("admin/office/" + value)
      .then(() => {
        dispatch(fetchOffices());
        openNotification("You have successfully deleted the selected office");
      })
      .catch((error) => {
        error.response.status === 401
          ? openError("Your session has expired, please login again.")
          : openError(
              "An error occurred while deleting the office, please try again"
            );

        console.log(error);
      });
  };

  const handleChange = (e) => {
    setInputFilter(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault(event);
  };

  const addOfficeText = "Add office";

  return (
    <>
      <Layout>
        <UserHeade />
        <Layout>
          <Sidebar selected="2" />
          <Content
            style={{
              display: "flex",
              justifyContent: "top",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Row
              style={{
                background: "transparent",
                width: "80%",
                borderRadius: "14px",
                border: 0,
              }}
            >
              <Col span={24}>
                <Card
                  title={
                    <Title onSubmit={onSubmit} addOfficeText={addOfficeText} />
                  }
                  style={{
                    boxShadow: "0 2px 2px 1px #2c28283c",
                    padding: "10px",
                    borderRadius: 7,
                  }}
                >
                  <div style={{ overflowX: "scroll" }}>
                    <Input
                      style={{ width: 200 }}
                      onChange={handleChange}
                      data-cy="SearchOffice-Input"
                      placeholder="Search Office"
                    />
                    <List
                      bordered
                      style={{ minWidth: 400 }}
                      pagination={{ pageSize: 5, position: "bottom" }}
                      dataSource={data.filter(({ name }) =>
                        name.toLowerCase().includes(inputFilter.toLowerCase())
                      )}
                      renderItem={(office) => (
                        <List.Item style={{ marginBottom: 10 }}>
                          <Typography.Text mark></Typography.Text> {office.name}{" "}
                          <Popconfirm
                            title="Do you want to delete this office?"
                            onConfirm={() => deleteFunc(office.id)}
                            okText="Yes"
                            cancelText="No"
                            className="deleteButton"
                            shape="round"
                            placement="topRight"
                            icon={
                              <QuestionCircleOutlined
                                style={{ color: "red" }}
                              />
                            }
                          >
                            <Button
                              data-cy="deleteoffice-button"
                              type="primary"
                              danger
                              style={{
                                border: "0",
                                borderRadius: "5px",
                                boxShadow: " 0px 3px 6px #2C28281C",
                              }}
                            >
                              Delete
                            </Button>
                          </Popconfirm>
                          <Button
                            data-cy="editoffice-button"
                            type="primary"
                            className="editButton"
                            onClick={() => {
                              window.location =
                                "edit/" + office.name + "/" + office.id;
                            }}
                          >
                            Edit
                          </Button>
                        </List.Item>
                      )}
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
      <Row
        style={{
          marginTop: "2%",
        }}
        align="center"
      >
        <Col align="center" span={24}>
          <p
            style={{
              fontSize: "1.2em",
            }}
          >
            MyDesk ©2022 Created by MyDeskTeam
          </p>
        </Col>
      </Row>
    </>
  );
};

export default Offices;
