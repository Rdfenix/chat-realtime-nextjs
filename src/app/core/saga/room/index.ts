import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  CREATE_ROOM,
  DELETE_ROOM,
  GET_CHAT_ROOMS,
  GET_ROOM,
} from "../../action/actionType";
import { ChatRoom, Room } from "@/app/shared/interface/chat";
import { AxiosResponse } from "axios";
import { createRoom, deleteRoom, getRoom, getRooms } from "../../http";
import { setChatRoomsAction } from "../../action";
import { StateReducer } from "@/app/shared/interface/reduxInterface";

type getAllRoomProps = {
  type: string;
  payload: object;
};

type responseLoginProps = {
  rooms: ChatRoom[];
  message: string;
};

type roomProps = {
  type: string;
  payload: ChatRoom | string;
};

const getRoomState = (state: StateReducer) => state.RoomReducer;

function* getAllRooms() {
  try {
    const result: AxiosResponse<responseLoginProps> = yield call(getRooms);
    if (result.status === 200) {
      const rooms = result.data.rooms;
      yield put(setChatRoomsAction({ rooms, messages: {} }));
    }
  } catch (error: any) {
    console.log(error);
  }
}

function* createUserRoom(action: roomProps) {
  try {
    const room: ChatRoom = action.payload as ChatRoom;
    yield call(createRoom, room);
  } catch (error: any) {
    console.log(error);
  }
}

function* getOneRoom(action: roomProps) {
  try {
    const id: string = action.payload as string;
    const result: AxiosResponse<responseLoginProps> = yield call(getRoom, id);
    if (result.status === 200) {
      const roomState: Room = yield select(getRoomState);
      const { rooms } = result.data;
      const data = { ...roomState, rooms: [...roomState.rooms, rooms[0]] };
      yield put(setChatRoomsAction(data));
    }
  } catch (error: any) {
    console.log(error);
  }
}

function* deleteUserRoom(action: roomProps) {
  try {
    const id: string = action.payload as string;
    yield call(deleteRoom, id);
  } catch (error: any) {
    console.log(error);
  }
}

const roomsSaga = all([
  takeLatest(GET_CHAT_ROOMS, getAllRooms),
  takeLatest(CREATE_ROOM, createUserRoom),
  takeLatest(DELETE_ROOM, deleteUserRoom),
  takeLatest(GET_ROOM, getOneRoom),
]);

export default roomsSaga;
