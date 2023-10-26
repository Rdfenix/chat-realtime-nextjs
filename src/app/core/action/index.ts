import {
  GET_CHAT_ROOMS,
  GET_USER,
  LOGOUT,
  SET_USER,
  SIGN_IN,
  SIGN_UP,
} from "@/app/core/action/actionType";
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
