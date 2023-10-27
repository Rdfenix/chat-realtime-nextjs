import { all, call, take, takeLatest } from "redux-saga/effects";
import { JOIN_ROOM, LEAVE_ROOM, WS_CONNECT } from "../../action/actionType";
import { io } from "socket.io-client";
import { EventChannel, eventChannel } from "redux-saga";

const socket = io("http://localhost:3333");

type ActiionRoomProps = {
  type: string;
  room: string;
};

function initWesocket(): EventChannel<any> {
  return eventChannel((emitter) => {
    socket.on("connect", () => {
      console.log("a user connected");
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("message", (msg) => {
      const data = JSON.stringify(msg);
      return emitter(data);
    });

    return () => {
      console.log("Socket off");
      socket.close();
    };
  });
}

function* handelWsConnection() {
  try {
    const channel: EventChannel<any> = yield call(initWesocket);

    while (true) {
      const action: EventChannel<any> = yield take(channel);
      yield console.log(action);
    }
  } catch (error: any) {
    console.log(error);
  }
}

function* userJoinRoom(action: ActiionRoomProps) {
  const roomName = action.room;
  yield socket.emit("joinRoom", roomName);
}

function* userLeaveRoom(action: ActiionRoomProps) {
  const roomName = action.room;
  yield socket.emit("leaveRoom", roomName);
}

const weboskcetSaga = all([
  takeLatest(WS_CONNECT, handelWsConnection),
  takeLatest(JOIN_ROOM, userJoinRoom),
  takeLatest(LEAVE_ROOM, userLeaveRoom),
]);

export default weboskcetSaga;
