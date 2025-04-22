import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_USER, SIGN_IN, SIGN_UP } from "../../action/actionType";
import { SignIn, SignUp, User } from "@/app/shared/interface/login";
import { signInUser, getUser, createUser } from "../../http";
import { AxiosResponse } from "axios";
import { setUserAction } from "../../action";

type loginProps = {
  type: string;
  payload: SignIn;
};

type registerProps = {
  type: string;
  payload: SignUp;
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

function* getUserData() {
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

function* getRegister(action: registerProps) {
  try {
    const data = action.payload;
    const response: AxiosResponse<responseLoginProps> = yield call(
      createUser,
      data
    );

    if (response.status === 200 && response.data.user) {
      const currentUrl = window.location.href;
      const stringIndex = currentUrl.indexOf("signon");
      const urlUpdated = currentUrl.slice(0, stringIndex) + "signin";

      yield window.location.replace(urlUpdated);
    }
  } catch (error: any) {
    console.log(error);
  }
}

const signInSignUpSaga = all([
  takeLatest(SIGN_IN, getLogin),
  takeLatest(GET_USER, getUserData),
  takeLatest(SIGN_UP, getRegister),
]);

export default signInSignUpSaga;
