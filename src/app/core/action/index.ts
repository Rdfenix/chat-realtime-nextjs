import {
  CREATE_ROOM,
  GET_CHAT_ROOMS,
  GET_USER,
  JOIN_ROOM,
  LOGOUT,
  SET_CHAT_ROOMS,
  SET_MESSAGE_ROOM,
  SET_USER,
  SIGN_IN,
  SIGN_UP,
  WS_CONNECT,
} from "@/app/core/action/actionType";
import { ChatRoom, Room } from "@/app/shared/interface/chat";
import { SignIn, SignUp, User } from "@/app/shared/interface/login";

export const signinAction = (payload: SignIn): any => ({
  type: SIGN_IN,
  payload,
});

export const signUpAction = (payload: SignUp): any => ({
  type: SIGN_UP,
  payload,
});

export const logoutAction = (): any => ({
  type: LOGOUT,
});

export const getUserAction = (): any => ({
  type: GET_USER,
});

export const setUserAction = (payload: User): any => ({
  type: SET_USER,
  payload,
});

export const getChatRoomsAction = (): any => ({
  type: GET_CHAT_ROOMS,
});

export const setChatRoomsAction = (payload: Room): any => ({
  type: SET_CHAT_ROOMS,
  payload,
});

export const setMessagesAction = (payload: Room) => ({
  type: SET_MESSAGE_ROOM,
  payload,
});

export const connectWebsocketAction = (): any => ({
  type: WS_CONNECT,
});

export const jointWithWebsocketRoom = (payload: string) => ({
  type: JOIN_ROOM,
  payload,
});

export const createUserRoomAction = (payload: ChatRoom) => ({
  type: CREATE_ROOM,
  payload,
});
