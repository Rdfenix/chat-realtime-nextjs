import { all, call, take, takeLatest } from "redux-saga/effects";
import { WS_CONNECT } from "../../action/actionType";
import { io } from "socket.io-client";
import { EventChannel, eventChannel } from "redux-saga";

function initWesocket(): EventChannel<any> {
  const socket = io("http://localhost:3333");

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

const weboskcetSaga = all([takeLatest(WS_CONNECT, handelWsConnection)]);

export default weboskcetSaga;
