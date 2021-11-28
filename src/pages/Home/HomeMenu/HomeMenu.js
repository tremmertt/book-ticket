/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState } from "react";
import { Tabs, Radio, Space, Row, Col, Collapse } from "antd";
import moment from "moment";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { SELECTION_INVERT } from "antd/lib/table/hooks/useSelection";
import { history } from "../../../App";
import "./homeMenu.scss";
import { USER_LOGIN } from "../../../util/settings/config";
// import renderEmpty from "antd/lib/config-provider/renderEmpty";

const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function HomeMenu(props) {
  const { cineSystem } = props;

  const [state] = useState({
    tabPosition: "left",
  });

  const clickMovie = () => {
    Swal.fire({
      icon: "warning",
      text: "Please Login to book ticket!!!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/login");
      }
    });
  };

  const { tabPosition } = state;

  const renderCineSystem = () => {
    return cineSystem?.map((cine, index) => {
      return (
        <TabPane
          tab={
            <img
              src={cine.logo}
              className="rounded-full h-10"
              alt="logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://s3img.vcdn.vn/123phim/2018/09/f32670fd0eb083c9c4c804f0f3a252ed.png";
              }}
            />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition} className="tab-scroll-bar">
            {cine.lstCumRap?.map((cineMa, index) => {
              return (
                <TabPane
                  tab={
                    <div style={{ width: "320px", display: "flex" }}>
                      <img
                        className="w-14 h-16 rounded-md"
                        src={cineMa.hinhAnh}
                        alt="..."
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png";
                        }}
                      />
                      <div className="text-left ml-2">
                        <h1>{cineMa.tenCumRap}</h1>
                        <p className="text-black opacity-70 text-xs mb-0">
                          {cineMa.diaChi.length > 20
                            ? cineMa.diaChi.slice(0, 40) + "..."
                            : cineMa.diaChi}
                        </p>
                        <p className="text-red-400">[Detail]</p>
                      </div>
                    </div>
                  }
                  className="tab-scroll-bar pr-5"
                  key={index}
                >
                  {/* Load film */}

                  {cineMa.danhSachPhim.map((film, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="my-2">
                          <div className="flex">
                            <img
                              className="w-16 h-16 rounded-md"
                              src={film.hinhAnh}
                              alt={film.tenPhim}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://ss-images.saostar.vn/w800/2019/09/23/6102433/untitled-1.jpg";
                              }}
                            />
                            <div className="ml-5 pl-5">
                              <h1
                                className="text-xl mb-2 cursor-pointer"
                                onClick={() => {
                                  history.push(`/detail/${film.maPhim}`);
                                }}
                              >
                                {film.tenPhim}
                              </h1>
                              <p className="text-xs">8.0 IMDb - 2D/Digital</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-4 mt-5 ">
                            {film.lstLichChieuTheoPhim
                              ?.slice(0, 10)
                              .map((showTime, index) => {
                                if (localStorage.getItem(USER_LOGIN)) {
                                  return (
                                    <NavLink
                                      className="w-20 px-2 py-3 bg-white text-center hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow hover:text-black"
                                      to={`/checkout/${showTime.maLichChieu}`}
                                      key={index}
                                    >
                                      {moment(
                                        showTime.ngayChieuGioChieu
                                      ).format("hh:mm A")}
                                    </NavLink>
                                  );
                                } else {
                                  return (
                                    <a
                                      onClick={clickMovie}
                                      className="w-20 px-2 py-3 bg-white text-center hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow hover:text-black"
                                      key={index}
                                    >
                                      {moment(
                                        showTime.ngayChieuGioChieu
                                      ).format("hh:mm A")}
                                    </a>
                                  );
                                }
                              })}
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  const createRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const renderHeThongRapMobile = () => {
    return cineSystem?.map((cineSystem, index) => {
      return (
        <Collapse expandIconPosition="right" key={index}>
          <Panel
            header={
              <div className="titleCinemaMobile">
                <img
                  className="logoCinemasMobile"
                  src={cineSystem.logo}
                  alt={cineSystem.logo}
                />
                <div className="nameCinemasMobile">
                  {cineSystem.maHeThongRap}
                </div>
              </div>
            }
            key={index}
          >
            <Collapse expandIconPosition="right" className="cinemaChildMobile">
              {cineSystem?.lstCumRap.map((lcd, indexs) => {
                return (
                  <Panel
                    header={
                      <div className="titleCinemasChildMobile">
                        <img
                          className="logoCinemasChildMobile"
                          src={cineSystem.logo}
                          alt={cineSystem.logo}
                        />
                        <div className="infoCinemasChildMobile">
                          <div className="nameCinemasChildMobile">
                            {lcd.tenCumRap}
                          </div>
                          <div className="addCinemasChildMobile">
                            {lcd.diaChi}
                          </div>
                        </div>
                      </div>
                    }
                    key={indexs}
                  >
                    <Collapse expandIconPosition="right" className="filmMobile">
                      {lcd.danhSachPhim.map((dsp, indexsss) => {
                        return (
                          <Panel
                            showArrow={false}
                            header={
                              <div className="infoFilmCinemaMobile">
                                <img
                                  className="imgFilmMobile"
                                  src={dsp.hinhAnh}
                                  alt={dsp.hinhAnh}
                                />
                                <div className="infoFilmMobileDetail">
                                  <span className="typeAgeMobile">
                                    C{createRandomNumber(18, 12)}
                                  </span>
                                  <span className="nameFilmCinemaMobile">
                                    {dsp.tenPhim}
                                  </span>
                                  <div className="timeReviewFilmMobile">
                                    {createRandomNumber(120, 90)} minutes -{" "}
                                    {createRandomNumber(9.7, 3.4).toFixed(1)}{" "}
                                    IMDb
                                  </div>
                                </div>
                              </div>
                            }
                            key={indexsss}
                          >
                            <div
                              className="ml-2"
                              style={{ fontWeight: "600", paddingBottom: 15 }}
                            >
                              {createRandomNumber(3, 2)}D Digital
                            </div>

                            <div
                              key={indexsss + 300}
                              className="flex flex-wrap"
                            >
                              {dsp.lstLichChieuTheoPhim.map((ds, indexssss) => {
                                if (indexssss <= 6) {
                                  if (localStorage.getItem(USER_LOGIN)) {
                                    return (
                                      <NavLink
                                        className="movieTime"
                                        to={`/checkout/${ds.maLichChieu}`}
                                        key={index}
                                      >
                                        {moment(ds.ngayChieuGioChieu).format(
                                          "hh:mm A"
                                        )}
                                      </NavLink>
                                    );
                                  } else {
                                    return (
                                      <a
                                        onClick={clickMovie}
                                        className="movieTime"
                                        key={index}
                                      >
                                        {moment(ds.ngayChieuGioChieu).format(
                                          "hh:mm A"
                                        )}
                                      </a>
                                    );
                                  }
                                }
                              })}
                            </div>
                          </Panel>
                        );
                      })}
                    </Collapse>
                  </Panel>
                );
              })}
            </Collapse>
          </Panel>
        </Collapse>
      );
    });
  };

  return (
    <>
      <div className="movie__listCinemas">
        <Row className="hideOnMobile">
          <Col span={24}>
            <Tabs tabPosition={tabPosition}>{renderCineSystem()};</Tabs>
          </Col>
        </Row>
        <Row className="listCinemasMobile hideOnPC">
          <Col span={24}>
            <div>{renderHeThongRapMobile()}</div>
          </Col>
        </Row>
      </div>
    </>
  );
}
