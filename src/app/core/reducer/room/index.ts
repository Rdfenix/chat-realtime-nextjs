import { Room } from "@/app/shared/interface/chat";
import { SET_CHAT_ROOMS, SET_MESSAGE_ROOM } from "../../action/actionType";

const initialState: Room = { rooms: [], messages: {} };

const RoomReducer = (
  state = initialState,
  action: { payload: Room; type: string }
) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CHAT_ROOMS:
      const newState = { ...state, rooms: payload.rooms };
      return newState;
    case SET_MESSAGE_ROOM:
      return state;
    default:
      return state;
  }
};

export default RoomReducer;
