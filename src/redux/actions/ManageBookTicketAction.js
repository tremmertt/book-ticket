import { manageBookTicketService } from "../../service/ManageBookTicketService";
import { InfoBookTicket } from "../../_core/models/InfoBookTicket";
import {
  BOOK_TICKET_COMPLETE,
  CHANGE_TAB,
  SET_DETAIL_TICKET_ROOM,
  SET_QR_IMAGE,
} from "./type/ManageBookTicketType";
import { SET_BOOK_TICKET_USER } from "../actions/type/ManageUserType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

import Swal from "sweetalert2";

export const getDetailTicketRoomAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await manageBookTicketService.getDetailTicketRoom(
        maLichChieu
      );

      if (result.status === 200) {
        dispatch({
          type: SET_DETAIL_TICKET_ROOM,
          detailTicketRoom: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data);
    }
  };
};

export const setQRimage = (contentLink) => {
  return async (dispatch) => {
    dispatch({
      type: SET_QR_IMAGE,
      contentLink: contentLink,
    });
  };
};

export const bookTicketAction = (infoBookTicket = new InfoBookTicket()) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      console.log("infoBookTicket", infoBookTicket);

      const result = await manageBookTicketService.bookTicket(infoBookTicket);
      if (result.data.statusCode === 200) {
        Swal.fire({
          title: "Booking successfully!",
          icon: "success",
          confirmButtonColor: "#44c020",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch({
              type: SET_BOOK_TICKET_USER,
              infoBookTicket: { ...infoBookTicket },
            });
          }
        });
      }

      await dispatch(getDetailTicketRoomAction(infoBookTicket.maLichChieu));

      await dispatch({
        type: BOOK_TICKET_COMPLETE,
      });

      await dispatch(hideLoadingAction);

      dispatch({ type: CHANGE_TAB });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
