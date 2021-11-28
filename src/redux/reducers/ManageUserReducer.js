import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
  GET_TOKEN_ACTION,
  LOGIN_ACTION,
  SET_INFO_USER,
  SET_USER_LIST,
  SET_INFO_USER_BY_USERNAME,
} from "../actions/type/ManageUserType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
  infoUserByUsername: {},
  infoUser: {},
  userList: [],
};

export const ManageUserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN_ACTION: {
      const { infoLogin } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(infoLogin));
      localStorage.setItem(TOKEN, infoLogin.accessToken);
      return { ...state, userLogin: infoLogin };
    }

    case GET_TOKEN_ACTION: {
      const { token } = action;
      localStorage.setItem(TOKEN, token.accessToken);
      return { ...state };
    }

    case SET_INFO_USER: {
      console.log("SET", action);
      return {
        ...state,
        infoUser: {
          ...action.infoUser,
          infoBookTicket: action.thongTinDatVe,
        },
      };
    }

    case SET_USER_LIST: {
      state.userList = action.userList;
      return { ...state };
    }

    case SET_INFO_USER_BY_USERNAME: {
      return {
        ...state,
        infoUserByUsername: action.infoUserByUsername,
      };
    }
    default:
      return { ...state };
  }
};
