import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useSelector, useDispatch } from "react-redux";
import Film from "../../components/Film/Film";
import MultipleRowsSlick from "../../components/RSlick/MultipleRowsSlick";
import { getListFilmAction } from "../../redux/actions/ManageFilmAction";
import { getListCineSystemAction } from "../../redux/actions/ManageCineActions";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";

export default function Home(props) {
  const { arrFilm } = useSelector((state) => state.ManageFilmReducer);
  const { cineSystem } = useSelector((state) => state.ManageCineReducer);
  const dispatch = useDispatch();
  console.log("propsHome", props, cineSystem);

  // const renderFilms = () => {
  //   return arrFilm.map((phim, index) => {
  //     return <Film key={index} />;
  //   });
  // };

  useEffect(() => {
    dispatch(getListFilmAction());
    dispatch(getListCineSystemAction());
  }, []);

  return (
    <div>
      <HomeCarousel />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <MultipleRowsSlick arrFilm={arrFilm} />

          {/* <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
            {renderFilms()}
          </div> */}
        </div>
      </section>
      <div
        className="mr-10 ml-10 md:mr-20 md:ml-20 lg:mr-80 lg:ml-80"
        style={{ minWidth: "1000px !important" }}
      >
        <HomeMenu cineSystem={cineSystem} />
      </div>
    </div>
  );
}
