/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import "./Film_Flip.css";
import { NavLink } from "react-router-dom";
import { Modal } from "antd";

export default function Film_Flip(props) {
  const { item } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  };

  const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      const handleResize = () => setWindowDimensions(getWindowDimensions());

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  };
  const { width } = useWindowDimensions();
  const convertLink = (url) => {
    return `https://www.youtube.com/embed/${getId(url)}`;
  };
  const getId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="flip-card mt-2">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            src={item.hinhAnh}
            alt="Avatar"
            style={{ width: 300, height: 300 }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://picsum.photos/75/75";
            }}
          />
        </div>
        <div
          className="flip-card-back"
          style={{ position: "relative", backgroundColor: "rgba(0,0,0,.9)" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0 }}>
            <img
              src={item.hinhAnh}
              alt="Avatar"
              style={{ width: 300, height: 300 }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/75/75";
              }}
            />
          </div>
          <div
            className="w-full h-full"
            style={{
              position: "absolute",
              backgroundColor: "rgba(0,0,0,.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <div className="rounded-full cursor-pointer">
                <PlayCircleOutlined
                  style={{ fontSize: "50px" }}
                  onClick={() => showModal()}
                />
              </div>
              <div className="text-2xl mt-2 font-bold w-auto px-10">
                {item.tenPhim}
              </div>

              <div className="mx-20 w-40 bg-orange-300 cursor-pointer py-2 bg-white rounded-lg my-2 text-success-50 font-bold">
                <NavLink to={`/detail/${item.maPhim}`}> BOOK TICKET</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        visible={isModalVisible}
        centered
        style={{ width: width / 100 }}
        footer
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <iframe
          style={{ width: "100%" }}
          height="400px"
          src={convertLink(item.trailer)}
        ></iframe>
      </Modal>
    </div>
  );
}
