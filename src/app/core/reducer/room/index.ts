import { Room } from "@/app/shared/interface/chat";
import {
  RESET_ROOM,
  SET_CHAT_ROOMS,
  SET_MESSAGE_ROOM,
} from "../../action/actionType";

const initialState: Room = { rooms: [], messages: {} };

const RoomReducer = (
  state = initialState,
  action: { payload: Room; type: string }
) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CHAT_ROOMS:
      return { ...state, rooms: payload.rooms };
    case SET_MESSAGE_ROOM:
      return { ...state, messages: payload.messages };
    case RESET_ROOM:
      return initialState;
    default:
      return state;
  }
};

export default RoomReducer;
