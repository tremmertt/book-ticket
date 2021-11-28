/* eslint-disable react/jsx-pascal-case */
import React, { Component, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import {
  SET_FILM_NOW_PLAYING,
  SET_FILM_COMMING_SOON,
} from "../../redux/actions/type/ManageFilmType";
import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import styleSlick from "./MultipleRowSlick.module.css";
import {
  getListFilmNowPlayingAction,
  getListFilmCommingSoonAction,
} from "../../redux/actions/ManageFilmAction";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    ></div>
  );
}

const MultipleRowsSlick = (props) => {
  const dispatch = useDispatch();
  const [noActive, setNoActive] = useState(0);

  const { nowPlaying, commingSoon } = useSelector(
    (state) => state.ManageFilmReducer
  );

  let activeClassDC = noActive === 1 ? "active_Film" : "none_active_Film";
  let activeClassSC = noActive === 2 ? "active_Film" : "none_active_Film";

  const renderFilms = () => {
    console.log("noActive = 1;", noActive);
    let filmFilteredItems = [];
    switch (noActive) {
      case 0:
        filmFilteredItems = props.arrFilm.slice(0, 12);
        break;
      case 1:
        filmFilteredItems = nowPlaying.slice(0, 12);
        break;
      case 2:
        filmFilteredItems = commingSoon.slice(0, 12);
        break;
      default:
        filmFilteredItems = props.arrFilm.slice(0, 12);
        break;
    }
    return filmFilteredItems.map((item, index) => {
      return (
        <div className="mt-2" key={index}>
          <Film_Flip item={item} />
        </div>
      );
    });
  };

  console.log("activeSC", activeClassDC, nowPlaying.length);
  console.log("activeSC", activeClassSC, commingSoon.length);

  // const settings = {
  //   className: "rounded-lg center variable-width",
  //   centerMode: true,
  //   infinite: true,
  //   centerPadding: "80px",
  //   slidesToShow: 2,
  //   adaptiveHeight: true,
  //   speed: 500,
  //   rows: 2,
  //   slidesPerRow: 2,
  //   variableWidth: true,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  // };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div className="flex justify-center mb-10">
        <button
          className={`${
            styleSlick[activeClassDC]
          } px-8 py-3 font-semibold rounded  ${
            noActive === 1
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800 border-gray-800 border"
          } mr-2`}
          onClick={() => {
            setNoActive(1);
            dispatch(getListFilmNowPlayingAction());
          }}
        >
          {" "}
          NOW PLAYING{" "}
        </button>
        <button
          className={`${
            styleSlick[activeClassSC]
          } px-8 py-3 font-semibold rounded  ${
            noActive === 2
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800 border-gray-800 border"
          } `}
          onClick={() => {
            setNoActive(2);
            dispatch(getListFilmCommingSoonAction());
          }}
        >
          {" "}
          COMING SOON{" "}
        </button>
      </div>
      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
};

export default MultipleRowsSlick;
