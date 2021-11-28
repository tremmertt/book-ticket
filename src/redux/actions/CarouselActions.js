import axios from "axios";
import { manageFilmService } from "../../service/ManageFilmService";
import { DOMAIN } from "../../util/settings/config";
import { SET_CAROUSEL } from "./type/CarouselType";

export const getCarouselAction = () => {
  return async (dispatch) => {
    try {
      console.log("manageFilmService", manageFilmService);
      const result = await manageFilmService.getListBanner();
      console.log("result", result);
      dispatch({
        type: SET_CAROUSEL,
        arrImg: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
