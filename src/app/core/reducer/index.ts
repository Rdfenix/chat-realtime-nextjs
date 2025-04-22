import { combineReducers } from "redux";
import UserReducer from "./user";
import RoomReducer from "./room";

const rootReducer = combineReducers({
  user: UserReducer,
  room: RoomReducer,
});

export default rootReducer;
