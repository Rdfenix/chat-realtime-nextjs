import {
  CREATE_ROOM,
  DELETE_ROOM,
  GET_CHAT_ROOMS,
  GET_ROOM,
  GET_USER,
  JOIN_ROOM,
  LEAVE_ROOM,
  LOGOUT,
  RESET_ROOM,
  SEND_WS_MESSAGE,
  SET_CHAT_ROOMS,
  SET_MESSAGE_ROOM,
  SET_USER,
  SIGN_IN,
  SIGN_UP,
  WS_CONNECT,
} from "@/app/core/action/actionType";
import { ChatRoom, ChatUserMessage, Room } from "@/app/shared/interface/chat";
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

export const getOneRoomAction = (payload: string) => ({
  type: GET_ROOM,
  payload,
});

export const deleteUserRoomAction = (payload: string) => ({
  type: DELETE_ROOM,
  payload,
});

export const sendMessageAction = (payload: ChatUserMessage) => ({
  type: SEND_WS_MESSAGE,
  payload,
});

export const leaveRoomAction = (payload: string) => ({
  type: LEAVE_ROOM,
  payload,
});

export const resetChatAction = () => ({
  type: RESET_ROOM,
});
