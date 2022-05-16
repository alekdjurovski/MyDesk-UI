import React from "react";
import { useState, useEffect } from "react";
import { List, Card, Layout, Button } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import api from "../../helper/api";

const CardsSection = (props) => {
  const [loadingData, setLoading] = useState(true);
  const [dataConfRooms, setDataConfRooms] = useState([]);
  const [selectedCardInSection, setselectedCardInSection] = useState();
  const [dataDesks, setDataDesks] = useState([]);
  const [initialDesks, setInitnialDesks] = useState([]);
  const [initialConf, setInitialConf] = useState([]);
  const { Meta } = Card;

  function selectCard(e) {
    props.selectedCard(e);
    setselectedCardInSection(e);
  }

  const setDesks = (desks) => {
    if (props.available) {
      const filtered = desks.filter((item) => !item.reservationId);
      setDataDesks(filtered);
    } else setDataDesks(desks);
  };

  const setConference = (rooms) => {
    if (props.available) {
      const filtered = rooms.filter((item) => !item.reservationId);
      setDataConfRooms(filtered);
    } else setDataConfRooms(rooms);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await api
        .get("employee/office-desks/" + props.officeid)
        .then((response) => {
          setDesks(response.data);
          setInitnialDesks(response.data);
        })
        .catch((error) => {
          console.error("error message");
        });
      await api
        .get("employee/office-conferencerooms/" + props.officeid)
        .then((response) => {
          setConference(response.data);
          setInitialConf(response.data);
        })
        .catch((error) => {
          console.error("error message");
        });
      setLoading(false);
    };
    fetchData();
  }, [props.officeid, props.refresh]);

  useEffect(() => {
    setDesks(initialDesks);
    setConference(initialConf);
  }, [props.available]);
  return (
    <div>
      {loadingData && <div>Loading</div>}
      {!loadingData && (
        <div
          id="scrollableDiv"
          style={{
            height: 500,
            overflow: "auto",
            padding: "0 16px",
            // border: "2px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <br></br>
          <InfiniteScroll
            dataLength={dataConfRooms.length + dataDesks.length}
            scrollableTarget="scrollableDiv"
            display="flex"
          >
            <Layout style={{ background: "transparent" }}>
              <List
                grid={{ gutter: 0, column: 5 }}
                dataSource={dataDesks.concat(dataConfRooms)}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      border:
                        item === selectedCardInSection ? "solid 2px" : "none",
                    }}
                  >
                    <Card
                      onClick={() => selectCard(item)}
                      bodyStyle={{
                        backgroundColor:
                          item.reservationId != null ? "#f37076" : "#69e28d",
                      }}
                      hoverable={true}
                      bordered={true}
                    >
                      <Meta
                        title={
                          !item.categories ? (
                            <p style={{ fontSize: "0.8vw" }}>
                              Conf room {item.indexForOffice}
                            </p>
                          ) : (
                            <p style={{ fontSize: "0.8vw" }}>
                              Desk {item.indexForOffice}
                            </p>
                          )
                        }
                        description={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "start",
                            }}
                            className="cardContentInformation"
                          >
                            {item.capacity >= 0 ? (
                              <p
                                style={{ color: "#000000	", fontSize: "0.6vw" }}
                              >
                                Capacity: {item.capacity}
                              </p>
                            ) : (
                              <p
                                style={{
                                  color: "#000000	",
                                  fontSize: "0.6vw",
                                }}
                              >
                                Category: {item.categories}
                              </p>
                            )}
                          </div>
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </Layout>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};
export default CardsSection;
