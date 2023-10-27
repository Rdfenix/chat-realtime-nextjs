import { all, call, put, select, take, takeLatest } from "redux-saga/effects";
import { JOIN_ROOM, LEAVE_ROOM, WS_CONNECT } from "../../action/actionType";
import { io } from "socket.io-client";
import { EventChannel, eventChannel } from "redux-saga";
import { StateReducer } from "@/app/shared/interface/reduxInterface";
import { Room } from "@/app/shared/interface/chat";
import { setChatRoomsAction, setMessagesAction } from "../../action";

const socket = io("http://localhost:3333");

type ActiionRoomProps = {
  type: string;
  payload: string;
};

type ResponseWSMessage = {
  room: string;
  data: any;
  operation: string;
};

const roomState = (state: StateReducer) => state.RoomReducer;

const initWesocket = (): EventChannel<any> =>
  eventChannel((emitter) => {
    socket.on("connect", () => {
      console.log("a user connected");
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("message", (msg) => {
      return emitter(msg);
    });

    return () => {
      console.log("Socket off");
      socket.close();
    };
  });

function* handelWsConnection() {
  try {
    const channel: EventChannel<any> = yield call(initWesocket);

    while (true) {
      const action: ResponseWSMessage = yield take(channel);
      yield call(dataCenterDistribution, action);
    }
  } catch (error: any) {
    console.log(error);
  }
}

function* dataCenterDistribution(message: ResponseWSMessage) {
  const chatRooms: Room = yield select(roomState);
  if (message.room === "HALL") {
    const result: Room = addOrRemoveRoom(
      message.operation,
      message.data,
      chatRooms
    );
    yield put(setChatRoomsAction(result));
  } else {
    const result = {
      ...chatRooms,
      messages: {
        ...chatRooms.messages,
        [message.room]: [...chatRooms.messages[message.room], message.data],
      },
    };

    yield put(setMessagesAction(result));
  }
}

const addOrRemoveRoom = (operation: string, data: any, state: Room): Room => {
  let newState: Room = { ...state };
  if (operation === "DELETE") {
    newState = {
      ...newState,
      rooms: state.rooms.filter((room) => room._id !== data._id),
    };
  } else if (operation === "ADD") {
    newState = {
      ...newState,
      rooms: [...state.rooms, data],
    };
  }

  return newState;
};

function* userJoinRoom(action: ActiionRoomProps) {
  const roomName = action.payload;
  yield socket.emit("joinRoom", roomName);
}

function* userLeaveRoom(action: ActiionRoomProps) {
  const roomName = action.payload;
  yield socket.emit("leaveRoom", roomName);
}

const weboskcetSaga = all([
  takeLatest(WS_CONNECT, handelWsConnection),
  takeLatest(JOIN_ROOM, userJoinRoom),
  takeLatest(LEAVE_ROOM, userLeaveRoom),
]);

export default weboskcetSaga;
