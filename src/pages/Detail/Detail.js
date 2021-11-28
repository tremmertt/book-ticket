/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unreachable */
import React, { useEffect } from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../../assets/styles/cricle.css";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getListInfoDetailFilm } from "../../redux/actions/ManageCineActions";
import moment from "moment";
import { Rate } from "antd";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;

export default function Detail(props) {
  const filmDetail = useSelector((state) => state.ManageFilmReducer.filmDetail);
  console.log({ filmDetail });

  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;

    dispatch(getListInfoDetailFilm(id));
    window.scrollTo({ x: 0, y: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${filmDetail.hinhAnh})`,
        backgroundSize: "100%",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <CustomCard
        style={{
          paddingTop: 150,
          minHeight: "150vh",
          backgroundColor: "rgba(0,0,0,.5)",
        }}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="grid grid-cols-12">
          <div className="col-span-5 col-start-3">
            <div className="grid grid-cols-3 ">
              <img
                className="col-span-1 mt-20"
                src={filmDetail.hinhAnh}
                style={{ width: 300, height: 350 }}
                alt="123"
              />

              <div className=" col-span-2 ml-10" style={{ marginTop: "20%" }}>
                <p className="text-xl">
                  {" "}
                  Day Start :{" "}
                  {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}{" "}
                </p>
                <p className="text-3xl font-semibold my-5">
                  {" "}
                  {filmDetail.tenPhim}{" "}
                </p>
                <p className="text-lg">
                  {" "}
                  {filmDetail.moTa?.replace("<p>", "").replace("</p>", "")}{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-2 pt-12">
            <h1
              className="flex justify-center"
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {" "}
              RATING{" "}
            </h1>
            <h1 className="text-pink-600 text-2xl flex justify-center">
              <Rate
                allowHalf
                defaultValue={filmDetail.danhGia / 2}
                style={{ color: "#ff6090", fontSize: 30 }}
              />
            </h1>
            <div className={`c100 p${filmDetail.danhGia * 10} big mx-8 my-6`}>
              <span className="text-white">{filmDetail.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 ml-72 w-2/3 container px-5 py-5 bg-white">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Showtimes" key="1" style={{ minHeight: 300 }}>
              <div>
                <Tabs tabPosition={"left"}>
                  {filmDetail.heThongRapChieu?.map((htr, index) => {
                    return (
                      <TabPane
                        tab={
                          <div className="flex flex-row items-center justify-center ml-5 mr-2">
                            {" "}
                            <img
                              src={htr.logo}
                              alt={htr.logo}
                              className="rounded-full w-full"
                              style={{ width: 50 }}
                            />{" "}
                            <div className="text-center ml-5">
                              {htr.tenHeThongRap}
                            </div>
                          </div>
                        }
                        key={index}
                      >
                        {htr.cumRapChieu?.map((cine, index) => {
                          return (
                            <div className="mt-5" key={index}>
                              <div className="flex flex-row">
                                <img
                                  style={{ width: 60, height: 60 }}
                                  src={cine.hinhAnh}
                                  alt={cine.hinhAnh}
                                />
                                <div className="ml-2">
                                  <p
                                    style={{
                                      fontSize: 20,
                                      fontWeight: "bold",
                                      lineHeight: 1,
                                    }}
                                  >
                                    {" "}
                                    {cine.tenCumRap}{" "}
                                  </p>
                                  <p
                                    className="text-gray-500 font-light"
                                    style={{ marginTop: 0 }}
                                  >
                                    {" "}
                                    {cine.diaChi}{" "}
                                  </p>
                                </div>
                              </div>

                              <div className="info-show-times grid grid-cols-4">
                                {cine.lichChieuPhim
                                  ?.slice(0, 12)
                                  .map((showtime, index) => {
                                    return (
                                      <NavLink
                                        to={`/checkout/${showtime.maLichChieu}`}
                                        key={index}
                                        className="col-span-1 font-bold text-blue-400 ml-5"
                                      >
                                        {moment(
                                          showtime.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              </div>
            </TabPane>

            <TabPane tab="Information" key="2">
              <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                  <div className="flex flex-col text-center w-full mb-20">
                    <h2 className="text-2xl text-indigo-500 tracking-widest font-medium title-font mb-1">
                      INFORMATION
                    </h2>
                  </div>
                  <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                    <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 text-5xl">
                      {/* <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="sm:w-16 sm:h-16 w-10 h-10"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg> */}
                      <i class="fas fa-ticket-alt"></i>
                    </div>
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                        Movie Name
                      </h2>
                      <p className="leading-relaxed text-base">
                        {filmDetail.tenPhim}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                        Description
                      </h2>
                      <p className="leading-relaxed text-base">
                        {filmDetail.moTa
                          ?.replace("<p>", "")
                          .replace("</p>", "")}{" "}
                      </p>
                    </div>
                    <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 text-5xl">
                      <i class="fas fa-audio-description"></i>
                    </div>
                  </div>
                  <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
                    <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 text-5xl">
                      <i class="far fa-calendar-alt"></i>
                    </div>
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                        Day Start
                      </h2>
                      <p className="leading-relaxed text-base">
                        {moment(filmDetail.ngayKhoiChieu).format(
                          "DD.MM.YYYY hh:mm A"
                        )}{" "}
                      </p>
                    </div>
                  </div>
                  <button className="flex mx-auto mt-20 text-white bg-indigo-300 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-500 rounded text-lg">
                    <NavLink to={`/checkout/:id`}> BOOK TICKET</NavLink>
                  </button>
                </div>
              </section>
            </TabPane>

            <TabPane tab="Rating" key="3">
              <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                  <div className="flex flex-col text-center w-full mb-14">
                    <h1 className="sm:text-3xl text-2xl tracking-widest font-medium title-font text-gray-900">
                      USER RATING
                    </h1>
                  </div>
                  <div className="flex flex-wrap -m-4">
                    <div className="p-4 md:w-1/3">
                      <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                              <circle cx={12} cy={7} r={4} />
                            </svg>
                          </div>
                          <h2 className="text-gray-900 text-lg title-font font-medium">
                            Shooting Stars
                          </h2>
                        </div>
                        <div className="flex-grow">
                          <p className="leading-relaxed text-base">
                            I have never seen such a good movie. Wonderful !!
                          </p>
                          <div className="flex items-center flex-wrap ">
                            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                              <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                strokeWidth={2}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx={12} cy={12} r={3} />
                              </svg>
                              1.2K
                            </span>
                            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                              <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                strokeWidth={2}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                              >
                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                              </svg>
                              10
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:w-1/3">
                      <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                              <circle cx={12} cy={7} r={4} />
                            </svg>
                          </div>
                          <h2 className="text-gray-900 text-lg title-font font-medium">
                            Jocasta
                          </h2>
                        </div>
                        <div className="flex-grow">
                          <p className="leading-relaxed text-base">
                            Great movie deserves 10 points
                          </p>
                          <div className="flex items-center flex-wrap ">
                            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                              <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                strokeWidth={2}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx={12} cy={12} r={3} />
                              </svg>
                              2.8K
                            </span>
                            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                              <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                strokeWidth={2}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                              >
                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                              </svg>
                              6
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:w-1/3">
                      <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                              <circle cx={12} cy={7} r={4} />
                            </svg>
                          </div>
                          <h2 className="text-gray-900 text-lg title-font font-medium">
                            Phoebe
                          </h2>
                        </div>
                        <div className="flex-grow">
                          <p className="leading-relaxed text-base">
                            The movie is very good, you should go see it.
                          </p>
                          <div className="flex items-center flex-wrap ">
                            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                              <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                strokeWidth={2}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx={12} cy={12} r={3} />
                              </svg>
                              5.5K
                            </span>
                            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                              <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                strokeWidth={2}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                              >
                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                              </svg>
                              9
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </TabPane>
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
}
