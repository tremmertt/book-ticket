import { Modal, Popover, Button } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../App";
import {
  EditOutlined,
  LogoutOutlined,
  HistoryOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import { GROUPID, TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
  getInfoUserAction,
  getInfoUsernameAction,
  getUserListAction,
  updateUserAction,
} from "../../redux/actions/ManageUserAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Profile.scss";
import moment from "moment";
import _ from "lodash";

export default function Profile(props) {
  const { infoUser } = useSelector((state) => state.ManageUserReducer);
  const { userList } = useSelector((state) => state.ManageUserReducer);

  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHistoryBookingModal, setIsHistoryBookingModal] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(getInfoUserAction());
    dispatch(getUserListAction());
  }, []);

  console.log("userList", userList);

  const filterUser = userList.filter(
    (user) => user.taiKhoan === infoUser.taiKhoan
  );
  console.log("filterUser.codeTypeUser", filterUser[0]);

  const typeUser = filterUser[0];
  console.log("typeUser", typeUser?.maLoaiNguoiDung);

  let codeTypeUser = typeUser?.maLoaiNguoiDung;

  if (codeTypeUser !== "QuanTri") {
    codeTypeUser = "KhachHang";
  }
  console.log(codeTypeUser);
  console.log("infoUser", infoUser);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: infoUser.taiKhoan,
      fullName: infoUser.hoTen,
      email: infoUser.email,
      phoneNumber: infoUser.soDT,
      password: infoUser.matKhau,
      codeTypeUser: codeTypeUser,
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string()
        .required("Not be empty !")
        .matches("^[A-Z a-z]+$", "Please enter the appropriate name!!!"),
      username: Yup.string().required("Not be empty!!!"),
      email: Yup.string().required("Not be empty!!!").email("Invalid!!!"),
      password: Yup.string()
        .required("Not be empty!!!")
        .min(6, "must be between 6-32 characters!!!")
        .max(32, "must be between 6-32 characters!!!"),
      phoneNumber: Yup.string()
        .required("Not be empty!!!")
        .min(10, "Please enter a valid phone number!!!")
        .max(11, "Please enter a valid phone number!!!")
        .matches("^[0-9]+$", "Please enter the phone number!!!"),
    }),

    onSubmit: async (values) => {
      values.maNhom = GROUPID;
      await dispatch(updateUserAction(values));
      await setIsModalVisible(false);
      await dispatch(getInfoUsernameAction);
    },
  });

  const renderTicketItem = () => {
    return infoUser.thongTinDatVe
      ?.map((ticket, index) => {
        const seatList = _.first(ticket.danhSachGhe);
        return (
          <div className="w-full mt-2" key={index}>
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <div className="flex-grow">
                <h2 className="text-gray-900 title-font font-medium">
                  {ticket.tenPhim}
                </h2>
                <p className="text-gray-500">
                  Address: {seatList.tenHeThongRap}
                </p>
                <p className="text-gray-500">
                  Theater: {seatList.tenCumRap} - Seat:{" "}
                  {ticket.seatList?.map((ghe, index) => {
                    return <span key={index}> {ghe.tenGhe} </span>;
                  })}
                </p>
                <p className="text-gray-500">
                  Time: {moment(ticket.ngayDat).format("hh:mm A")} - Day:{" "}
                  {moment(ticket.ngayDat).format("DD-MM-YYYY")}{" "}
                </p>
              </div>
            </div>
          </div>
        );
      })
      .reverse();
  };

  return (
    <div>
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
        {/*Main Col*/}
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            {/* Image for mobile view*/}
            <div
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
              style={{ backgroundImage: 'url("images/user.png")' }}
            />
            <h1 className="text-3xl font-bold pt-8 lg:pt-0">
              {infoUser.hoTen}
            </h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-yellow-700 opacity-25" />
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              Email: {infoUser.email}
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              Telephone: {infoUser.soDT}
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              Username: {infoUser.taiKhoan}
            </p>
            <div className="pt-5 flex items-center justify-between">
              {infoUser.maLoaiNguoiDung === "QuanTri" ? (
                <div className="">
                  <button
                    className="bg-black text-white duration-300 hover:bg-yellow-400 hover:text-black font-bold py-2 px-10 rounded-md"
                    onClick={() => {
                      history.push("/admin");
                    }}
                  >
                    Manage
                  </button>
                </div>
              ) : (
                ""
              )}

              <div>
                <Popover content="Edit">
                  <EditOutlined
                    onClick={showModal}
                    className="text-2xl hover:text-yellow-400 duration-300 mr-5"
                  />
                </Popover>
                <Popover content="History Booking">
                  <HistoryOutlined
                    onClick={() => {
                      setIsHistoryBookingModal(true);
                    }}
                    className="text-2xl hover:text-yellow-400 duration-300 mr-5"
                  />
                </Popover>
                <Popover content="Log Out">
                  <ImportOutlined
                    onClick={() => {
                      localStorage.removeItem(USER_LOGIN);
                      localStorage.removeItem(TOKEN);
                      history.push("/");
                      window.location.reload();
                    }}
                    className="text-2xl hover:text-yellow-400 duration-300 mr-5"
                  />
                </Popover>
              </div>
            </div>

            <Modal
              title="Update"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              className="updateProfile"
              footer={null}
            >
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Username{" "}
                    {formik.errors.username && formik.touched.username ? (
                      <span style={{ color: "red" }}>
                        <span className="text-black">:</span>{" "}
                        {formik.errors.username}{" "}
                      </span>
                    ) : null}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  ></input>
                </div>
                <div className="mt-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Full Name{" "}
                    {formik.errors.fullName && formik.touched.fullName ? (
                      <span style={{ color: "red" }}>
                        <span className="text-black">:</span>{" "}
                        {formik.errors.fullName}{" "}
                      </span>
                    ) : null}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="fullName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                  ></input>
                </div>
                <div className="mt-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Email{" "}
                    {formik.errors.email && formik.touched.email ? (
                      <span style={{ color: "red" }}>
                        <span className="text-black">:</span>{" "}
                        {formik.errors.email}{" "}
                      </span>
                    ) : null}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  ></input>
                </div>
                <div className="mt-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Telephone{" "}
                    {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
                      <span style={{ color: "red" }}>
                        <span className="text-black">:</span>{" "}
                        {formik.errors.phoneNumber}{" "}
                      </span>
                    ) : null}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="phoneNumber"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                  ></input>
                </div>
                <div className="mt-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Password{" "}
                    {formik.errors.password && formik.touched.password ? (
                      <span style={{ color: "red" }}>
                        <span className="text-black">:</span>{" "}
                        {formik.errors.password}{" "}
                      </span>
                    ) : null}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  ></input>
                </div>

                <div className="text-right mt-5">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-blue-700 hover:bg-blue-900"
                  >
                    Update
                  </Button>
                </div>
              </form>
            </Modal>

            <Modal
              title="History Booking"
              visible={isHistoryBookingModal}
              onOk={() => {
                setIsHistoryBookingModal(false);
              }}
              onCancel={() => {
                setIsHistoryBookingModal(false);
              }}
              footer={null}
            >
              <div
                className="scroll__bar__custom w-full"
                style={{ height: "400px", overflow: "auto" }}
              >
                {renderTicketItem()}
              </div>
            </Modal>
            {/* Use https://simpleicons.org/ to find the svg for your preferred product */}
          </div>
        </div>
        {/*Img Col*/}
        <div className="w-full lg:w-2/5">
          {/* Big profile image for side bar (desktop) */}
          <img
            src="https://images.unsplash.com/photo-1560109947-543149eceb16?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80"
            className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
            alt="..."
            style={{ height: "520px" }}
          />
          {/* Image from: http://unsplash.com/photos/MP0IUfwrn0A */}
        </div>
      </div>
    </div>
  );
}
