/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
import _ from "lodash";
import { useSelector } from "react-redux";
import { TOKEN, USER_LOGIN } from "../../../../util/settings/config";

export default function Header(props) {
  const { userLogin } = useSelector((state) => state.ManageUserReducer);

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <button
            className="self-center px-8 py-3 rounded"
            onClick={() => {
              history.push("/login");
            }}
          >
            Sign In{" "}
          </button>
          <button
            onClick={() => {
              history.push("/register");
            }}
            className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900"
          >
            {" "}
            Sign Up{" "}
          </button>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <button
          className="self-center px-8 py-3 rounded"
          onClick={() => {
            history.push("/profile");
          }}
        >
          Hello {userLogin.taiKhoan}
        </button>
        <button
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push("/home");
            window.location.reload();
          }}
          className="text-blue-400"
        >
          {" "}
          Log Out{" "}
        </button>
      </Fragment>
    );
  };

  return (
    <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black text-white fixed w-full z-10">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img
            className="h-14 min-w-max mx-2"
            src="https://khothietke.net/wp-content/uploads/2021/03/PNG00345-phim-truong-cuon-phim-png.png"
            alt="logoFilm"
          />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to="/home"
              className="flex items-center px-4 -mb-0.5 border-b-2 border-transparent text-violet-600 border-violet-600 text-white"
              activeClassName="border-b-2 border-white"
            >
              Showtimes
            </NavLink>
          </li>

          <li className="flex">
            <NavLink
              to="/contact"
              className="flex items-center px-4 -mb-0.5 border-b-2 border-transparent text-white"
              activeClassName="border-b-2 border-white"
            >
              Contact
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/news"
              className="flex items-center px-4 -mb-0.5 border-b-2 border-transparent text-white"
              activeClassName="border-b-2 border-white"
            >
              News
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {renderLogin()}
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-coolGray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
