import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { registerAction } from "../../redux/actions/ManageUserAction";
import { GROUPID } from "../../util/settings/config";
import logoImg from "../../assets/logoFilm.jpg";

export default function Register(props) {
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.ManageUserReducer);

  console.log("userLogin", userLogin);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUPID,
      maLoaiNguoiDung: "KhachHang",
      hoTen: "",
    },
    onSubmit: (values) => {
      const action = registerAction(values);
      dispatch(action);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="lg:w-1/2 xl:max-w-screen-sm"
    >
      <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          <NavLink to="/" className="w-1/3">
            <img src={logoImg} alt={logoImg} className="w-100" />
          </NavLink>
          <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
            MOVIE TICKET
          </div>
        </div>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2 className="text-center flex justify-center text-2xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold mb-18">
          Sign Up
        </h2>
        <div className="mt-12">
          <div>
            <div className="mt-8">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Username
              </div>
              <input
                name="taiKhoan"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your username"
              />
            </div>

            <div className="mt-8">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Full Name
              </div>
              <input
                name="hoTen"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your full name"
              />
            </div>

            <div className="mt-8">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Email
              </div>
              <input
                name="email"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mt-8">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Telephone
              </div>
              <input
                name="soDt"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="mt-8">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Password
              </div>
              <input
                name="matKhau"
                type="password"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="mt-10">
            <button
              className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
            font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
            shadow-lg"
            >
              {" "}
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
