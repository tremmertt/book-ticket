import { manageUserService } from "../../service/ManageUserService";
import {
  LOGIN_ACTION,
  SET_INFO_USER,
  SET_INFO_USER_BY_USERNAME,
  SET_USER_LIST,
} from "./type/ManageUserType";
import { history } from "../../App";
import Swal from "sweetalert2";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const loginAction = (infoLogin) => {
  return async (dispatch) => {
    try {
      console.log("info", infoLogin);
      const result = await manageUserService.login(infoLogin);

      if (result.status === 200) {
        dispatch({
          type: LOGIN_ACTION,
          infoLogin: result.data.content,
        });

        if (result.data.content.maLoaiNguoiDung === "QuanTri") {
          history.push("/admin");
        } else {
          history.push("/");
        }
      }

      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const getInfoUserAction = () => {
  return async (dispatch) => {
    try {
      const result = await manageUserService.getInfoUser();
      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_INFO_USER,
          infoUser: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const getUserListPaginationAction = (
  tuKhoa,
  isSearch = false,
  pageNumber = 1,
  pageSize = 10
) => {
  return async (dispatch) => {
    try {
      if (!isSearch) {
        const result =
          (await manageUserService.getUserListPagination(
            pageNumber,
            pageSize
          )) || [];
        console.log("result", result);
        if (result.status === 200) {
          dispatch({
            type: SET_USER_LIST,
            userList: result.data.content.items,
          });
        }
      } else {
        const result =
          (await manageUserService.getSearchUserListPagination(
            tuKhoa,
            pageNumber,
            pageSize
          )) || [];

        if (result.status === 200) {
          dispatch({
            type: SET_USER_LIST,
            userList: result.data.content.items,
          });
        }
      }
    } catch (errors) {
      console.log("result", errors.response?.data);
    }
  };
};

export const getUserListAction = (tuKhoa, isSearch = false) => {
  return async (dispatch) => {
    try {
      if (!isSearch) {
        const result = (await manageUserService.getUserList()) || [];
        console.log("result", result);
        if (result.status === 200) {
          dispatch({
            type: SET_USER_LIST,
            userList: result.data.content,
          });
        }
      } else {
        const result =
          (await manageUserService.getSearchUserList(tuKhoa)) || [];

        if (result.status === 200) {
          dispatch({
            type: SET_USER_LIST,
            userList: result.data.content,
          });
        }
      }
    } catch (errors) {
      console.log("result", errors.response?.data);
    }
  };
};

export const addUserAction = (infoUser) => {
  return async (dispatch) => {
    try {
      const result = await manageUserService.addUser(infoUser);
      if (result.status === 200) {
        Swal.fire({
          title: "Add successful !",
          icon: "success",
          confirmButtonColor: "#44c020",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(getUserListAction());
          }
        });
      }
      console.log("result", result);
    } catch (errors) {
      console.log("result", errors.response?.data);
      console.log("result", errors.response);
      Swal.fire({
        icon: "Add failed!",
        title: errors.response?.data.message,
        text: `${errors.response?.data.content}`,
      });
    }
  };
};

export const updateUserAction = (infoUser) => {
  return async (dispatch) => {
    try {
      const result = await manageUserService.updateUser(infoUser);
      if (result.status === 200) {
        Swal.fire({
          title: "Update Successfull!",
          icon: "success",
          confirmButtonColor: "#44c020",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(getUserListAction());
          }
        });
      }
      console.log("result", result);
    } catch (errors) {
      Swal.fire({
        icon: "error",
        title: errors.response?.data.message,
        text: `${errors.response?.data.content}`,
      });
      console.log(errors.response?.data);
    }
  };
};

export const deleteUserAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await manageUserService.deleteUser(taiKhoan);
      if (result.status === 200) {
        Swal.fire({
          title: " Delete Successful !",
          icon: "success",
          confirmButtonColor: "#44c020",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(getUserListAction());
          }
        });
      }
      console.log("result", result);
    } catch (errors) {
      Swal.fire({
        icon: "Delete Failed!",
        title: errors.response?.data.message,
        text: `${errors.response?.data.content}`,
      });
    }
  };
};

export const registerAction = (registerInfo) => {
  return async (dispatch) => {
    try {
      const resultRegister = await manageUserService.register(registerInfo);
      const logIn = {
        taiKhoan: registerInfo.taiKhoan,
        matKhau: registerInfo.matKhau,
      };

      const results1 = await manageUserService.login(logIn);

      if (resultRegister.status === 200 && results1.status === 200) {
        await dispatch({
          type: "GET_TOKEN_ACTION",
          token: results1.data.content,
        });
        await manageUserService.updateUser(registerInfo);
        // Swal.fire({
        //   title: "Register Successful!",
        //   text: "Please login.",
        //   icon: "success",
        //   confirmButtonColor: "#44c020",
        // }).then((result) => {
        //   if (result.isConfirmed) {

        //   }
        // });
        history.push("/home");
      }

      console.log("result", resultRegister);
    } catch (errors) {
      console.log("error", errors);
    }
  };
};

export const getInfoUsernameAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await manageUserService.getInfoUsername();
      if (result.status === 200) {
        await dispatch({
          type: SET_INFO_USER,
          infoUser: result.data.content,
        });
        await dispatch(hideLoadingAction);
      }

      console.log("result", result);
    } catch (errors) {
      dispatch(hideLoadingAction);
      console.log("errors", errors.response?.data);
    }
  };
};

export const getInfoUserByUsernameAction = (username) => {
  return async (dispatch) => {
    try {
      const result = await manageUserService.getInfoUserByUsername(username);
      console.log("result: ", result);
      if (result.status === 200) {
        dispatch({
          type: SET_INFO_USER_BY_USERNAME,
          infoUserByUsername: result.data.content,
        });
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
