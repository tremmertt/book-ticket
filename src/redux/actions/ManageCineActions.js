import { manageCineService } from "../../service/ManageCineService";
import { manageFilmService } from "../../service/ManageFilmService";
import { ManageCineReducer } from "../reducers/ManageCineReducer";
import {
  SET_CINE_SYSTEM,
  SET_DETAIL_FILM,
  SET_LIST_CINEMA,
} from "./type/ManageCineType";

export const getListCineSystemAction = () => {
  return async (dispatch) => {
    try {
      const result = await manageFilmService.getListCineSystem();

      console.log("getListCineSystem", result.data.content);
      if (result.status === 200) {
        dispatch({
          type: SET_CINE_SYSTEM,
          cineSystem: result.data.content,
        });
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const getListCinemaAction = () => {
  return async (dispatch) => {
    try {
      const result = await manageCineService.getListCinema();
      if (result.status === 200) {
        dispatch({
          type: SET_LIST_CINEMA,
          listCinema: result.data.content,
        });
      }
    } catch (err) {
      console.log("err", err.response?.data);
    }
  };
};

export const getListInfoDetailFilm = (id) => {
  return async (dispatch) => {
    try {
      const result = await manageCineService.getListInfoShowTime(id);
      console.log("result", result);

      dispatch({
        type: SET_DETAIL_FILM,
        filmDetail: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
