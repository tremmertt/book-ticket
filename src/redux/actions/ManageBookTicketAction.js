import { manageBookTicketService } from "../../service/ManageBookTicketService";
import { manageUserService } from "../../service/ManageUserService";
import { SET_INFO_USER } from "./type/ManageUserType";
import { InfoBookTicket } from "../../_core/models/InfoBookTicket";
import {
  BOOK_TICKET_COMPLETE,
  CHANGE_TAB,
  SET_DETAIL_TICKET_ROOM,
  SET_QR_IMAGE,
} from "./type/ManageBookTicketType";
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

export const setQRimage = (indexInfoBookTicket) => {
  return async (dispatch) => {
    console.log("indexInfoBookTicket", indexInfoBookTicket);
    dispatch({
      type: SET_QR_IMAGE,
      indexInfoBookTicket: indexInfoBookTicket,
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
        }).then(async (result) => {
          if (result.isConfirmed) {
            // loading ticket info of user
            const result = await manageUserService.getInfoUser();
            if (result.data.statusCode === 200) {
              dispatch({
                type: SET_INFO_USER,
                infoUser: result.data.content,
              });
            }
          }
        });
      }

      await dispatch(getDetailTicketRoomAction(infoBookTicket.maLichChieu));

      // clear listSeatBooking
      await dispatch({
        type: BOOK_TICKET_COMPLETE,
      });

      // turn off loading
      await dispatch(hideLoadingAction);

      // transition to checkout tab
      dispatch({ type: CHANGE_TAB });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
