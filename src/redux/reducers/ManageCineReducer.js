import {
  SET_CINE_SYSTEM,
  SET_LIST_CINEMA,
} from "../actions/type/ManageCineType";

const stateDefalut = {
  cineSystem: [],
  listCinema: [],
};

export const ManageCineReducer = (state = stateDefalut, action) => {
  switch (action.type) {
    case SET_CINE_SYSTEM: {
      state.cineSystem = action.cineSystem;
      return { ...state };
    }

    case SET_LIST_CINEMA: {
      state.listCinema = action.listCinema;
      return { ...state };
    }

    default:
      return { ...state };
      break;
  }
};
