import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";
import { ManageBookTicketReducer } from "./reducers/ManageBookTicketReducer";
import { ManageCineReducer } from "./reducers/ManageCineReducer";
import { ManageFilmReducer } from "./reducers/ManageFilmReducer";
import { ManageUserReducer } from "./reducers/ManageUserReducer";

console.log("LoadingReducer", LoadingReducer);
const rootReducer = combineReducers({
  CarouselReducer,
  ManageFilmReducer,
  ManageCineReducer,
  ManageUserReducer,
  ManageBookTicketReducer,
  LoadingReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
