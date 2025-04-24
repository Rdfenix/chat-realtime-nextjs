import { combineReducers } from "redux";
import UserReducer from "./user";
import RoomReducer from "./room";

const rootReducer = combineReducers({
  UserReducer,
  RoomReducer,
});

export default rootReducer;
