import { all, call, put, select, take, takeLatest } from "redux-saga/effects";
import {
  JOIN_ROOM,
  LEAVE_ROOM,
  LOGOUT_WS,
  SEND_WS_MESSAGE,
  WS_CONNECT,
} from "../../action/actionType";
import { io } from "socket.io-client";
import { EventChannel, eventChannel } from "redux-saga";
import { StateReducer } from "@/app/shared/interface/reduxInterface";
import {
  ChatMessage,
  ChatUserMessage,
  Room,
} from "@/app/shared/interface/chat";
import { setChatRoomsAction, setMessagesAction } from "../../action";

const socket = io(process.env.NEXT_PUBLIC_API_URL);

type ActionRoomProps = {
  type: string;
  payload: string;
};

type ActionRoomSendMessage = {
  type: string;
  payload: ChatUserMessage;
};

type ResponseWSMessage = {
  room: string;
  data: any;
  operation: string;
};

const roomState = (state: StateReducer) => state.RoomReducer;

const initWebsocket = (): EventChannel<any> =>
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

function* handleWsConnection() {
  try {
    const channel: EventChannel<any> = yield call(initWebsocket);

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
    const result = addNewUserMessage(message.room, message.data, chatRooms);
    yield put(setMessagesAction(result));
  }
}

const addNewUserMessage = (room: string, data: ChatMessage, state: Room) => {
  let newState: Room = { ...state };
  newState = {
    ...newState,
    messages: {
      ...newState.messages,
      [room]: newState.messages[room]
        ? [...newState.messages[room], data]
        : [data],
    },
  };
  return newState;
};

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

function* userJoinRoom(action: ActionRoomProps) {
  const roomName = action.payload;
  yield socket.emit("joinRoom", roomName);
}

function* userLeaveRoom(action: ActionRoomProps) {
  const roomName = action.payload;
  yield socket.emit("leaveRoom", roomName);
}

function* sendMessageToRoom(action: ActionRoomSendMessage) {
  const { message, operation, room } = action.payload;
  const data = { room, message, operation };
  yield socket.emit("sendMessage", data);
}

function* disconnectWs() {
  yield socket.disconnect();
}

const weboskcetSaga = all([
  takeLatest(WS_CONNECT, handleWsConnection),
  takeLatest(JOIN_ROOM, userJoinRoom),
  takeLatest(LEAVE_ROOM, userLeaveRoom),
  takeLatest(SEND_WS_MESSAGE, sendMessageToRoom),
  takeLatest(LOGOUT_WS, disconnectWs),
]);

export default weboskcetSaga;
