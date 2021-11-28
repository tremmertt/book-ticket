import {
  SET_LIST_FILM,
  SET_FILM_NOW_PLAYING,
  SET_FILM_COMMING_SOON,
  SET_INFO_FILM,
  REMOVE_FILM,
} from "./type/ManageFilmType";
import { manageFilmService } from "../../service/ManageFilmService";
import { history } from "../../App";

export const getListFilmAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      const result = await manageFilmService.getListFilm((tenPhim = ""));
      dispatch({
        type: SET_LIST_FILM,
        arrFilm: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const getListFilmNowPlayingAction = () => {
  console.log("213123", 123);
  return async (dispatch) => {
    console.log("dispatch", dispatch);
    try {
      dispatch({
        type: SET_FILM_NOW_PLAYING,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const getListFilmCommingSoonAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_FILM_COMMING_SOON,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const addFilmUploadImgAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await manageFilmService.addFilmUploadImg(formData);
      alert("Add successfully!");
      console.log("result", result.data.content);
      dispatch(getListFilmAction());
      history.push("/admin/films");
    } catch (errors) {
      console.log(errors.respone?.data.message);
    }
  };
};

export const updateFilmUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      console.log("formdata: ", formData);
      let result = await manageFilmService.updateFlimUpload(formData);
      alert("Update successful !");
      console.log("result", result.data.content);

      dispatch(getListFilmAction());
      history.push("/admin/films");
    } catch (errors) {
      console.log(errors.respone?.data);
    }
  };
};

export const getInfoFilmAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await manageFilmService.getInfoFilm(maPhim);
      console.log(result.data.content);

      dispatch({
        type: SET_INFO_FILM,
        infoFilm: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const deleteFilmAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await manageFilmService.deleteFilm(maPhim);
      console.log(result.data.content);
      dispatch({
        type: REMOVE_FILM,
        id: maPhim,
      });
      alert("Delete successful !");
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
