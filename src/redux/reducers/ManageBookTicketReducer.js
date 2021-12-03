import { InfoShowTimes } from "../../_core/models/InfoTicketRoom";
import {
  BOOK_TICKET,
  BOOK_TICKET_COMPLETE,
  CHANGE_TAB,
  SET_DETAIL_TICKET_ROOM,
  SET_QR_IMAGE,
} from "../actions/type/ManageBookTicketType";

const stateDefault = {
  detailTicketRoom: new InfoShowTimes(),
  listSeatBooking: [],
  tabActive: "1",
};

export const ManageBookTicketReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_DETAIL_TICKET_ROOM: {
      state.detailTicketRoom = action.detailTicketRoom;
      return { ...state };
    }

    case SET_QR_IMAGE: {
      state.tabActive = "3";
      state.indexInfoBookTicket = action.indexInfoBookTicket;
      return { ...state };
    }

    case BOOK_TICKET: {
      let listUpdateSeat = [...state.listSeatBooking];

      let index = listUpdateSeat.findIndex(
        (SeatB) => SeatB.maGhe === action.seatChoose.maGhe
      );
      if (index !== -1) {
        listUpdateSeat.splice(index, 1);
      } else {
        listUpdateSeat.push(action.seatChoose);
      }
      // console.log(action);
      return { ...state, listSeatBooking: listUpdateSeat };
    }

    case BOOK_TICKET_COMPLETE: {
      state.listSeatBooking = [];
      return { ...state };
    }

    case CHANGE_TAB: {
      state.tabActive = "2";
      return { ...state };
    }

    case "CHANGE_TAB_ACTIVE": {
      state.tabActive = action.number;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
