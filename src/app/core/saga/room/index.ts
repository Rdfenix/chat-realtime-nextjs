import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_CHAT_ROOMS } from "../../action/actionType";
import { ChatRoom } from "@/app/shared/interface/chat";
import { AxiosResponse } from "axios";
import { getRooms } from "../../http";
import { setChatRoomsAction } from "../../action";

type getAllRoomProps = {
  type: string;
  payload: object;
};

type responseLoginProps = {
  rooms: ChatRoom[];
  message: string;
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

const roomsSaga = all([takeLatest(GET_CHAT_ROOMS, getAllRooms)]);

export default roomsSaga;
