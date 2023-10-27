import { all, call, put, takeLatest } from "redux-saga/effects";
import { CREATE_ROOM, GET_CHAT_ROOMS } from "../../action/actionType";
import { ChatRoom } from "@/app/shared/interface/chat";
import { AxiosResponse } from "axios";
import { createRoom, getRooms } from "../../http";
import { setChatRoomsAction } from "../../action";

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
  payload: ChatRoom;
};

function* getAllRooms(action: getAllRoomProps) {
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
    const room = action.payload;
    yield call(createRoom, room);
  } catch (error: any) {
    console.log(error);
  }
}

const roomsSaga = all([
  takeLatest(GET_CHAT_ROOMS, getAllRooms),
  takeLatest(CREATE_ROOM, createUserRoom),
]);

export default roomsSaga;
