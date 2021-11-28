import { Fragment, useEffect } from "react";
import { Route } from "react-router";
import movieImg from "../../assets/movieForm.png";

export const UserTemplate = (props) => {
  const { Component, ...restProps } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <div className="lg:flex">
              <Component {...propsRoute} />
              <div className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
                <div className="max-w-xl transform duration-200 hover:scale-110 cursor-pointer">
                  <img src={movieImg} alt={movieImg} className="w-full " />
                </div>
              </div>
            </div>
          </Fragment>
        );
      }}
    />
  );
};
