/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions/ManageUserAction";
import logoImg from "../../assets/logoFilm.jpg";

export default function Login(props) {
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.ManageUserReducer);

  console.log("userLogin", userLogin);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      desc: "",
    },
    onSubmit: (values) => {
      const action = loginAction(values);
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
        <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">
          Login
        </h2>
        <div className="mt-12">
          <div>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Email Address
              </div>
              <input
                name="taiKhoan"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Password
                </div>
                <div>
                  <a
                    className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                    cursor-pointer"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <input
                name="matKhau"
                type="password"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="mt-10">
              <button
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
            font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
            shadow-lg"
              >
                Log In
              </button>
            </div>

            {/* <div className="mt-10">
              <button
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
            font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
            shadow-lg"
              >
                Log In With Google
              </button>
            </div> */}
          </div>
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
            Don't have an account ?{" "}
            <NavLink
              to="register"
              className="cursor-pointer text-indigo-600 hover:text-indigo-800"
            >
              Sign up
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
}
