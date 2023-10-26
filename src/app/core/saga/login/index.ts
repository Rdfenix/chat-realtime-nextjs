import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_USER, SIGN_IN } from "../../action/actionType";
import { SignIn, User } from "@/app/shared/interface/login";
import { signInUser, getUser } from "../../http";
import { AxiosResponse } from "axios";
import { setUserAction } from "../../action";

type loginProps = {
  type: string;
  payload: SignIn;
};

type getUserProps = {
  type: string;
  payload: object;
};

type responseLoginProps = {
  user: User;
  message: string;
};

function* getLogin(action: loginProps) {
  try {
    const response: AxiosResponse<responseLoginProps> = yield call(
      signInUser,
      action.payload
    );

    if (response.data) {
      const { user } = response.data;
      yield localStorage.setItem("token", String(user._id));

      const currentUrl = window.location.href;
      const stringIndex = currentUrl.indexOf("signin");
      const urlUpdated = currentUrl.slice(0, stringIndex) + "main";

      yield window.location.replace(urlUpdated);
    }
  } catch (error: any) {
    console.log(error);
  }
}

function* getUserData(action: getUserProps) {
  try {
    const userId = String(localStorage.getItem("token"));
    const response: AxiosResponse<responseLoginProps> = yield call(
      getUser,
      userId
    );
    const user = response.data.user;
    yield put(setUserAction(user));
  } catch (error: any) {
    console.log(error);
  }
}

const signInSignUp = all([
  takeLatest(SIGN_IN, getLogin),
  takeLatest(GET_USER, getUserData),
]);

export default signInSignUp;
