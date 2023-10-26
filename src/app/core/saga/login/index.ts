import { all, call, takeLatest } from "redux-saga/effects";
import { SIGN_IN } from "../../action/actionType";
import { SignIn, User } from "@/app/shared/interface/login";
import { signInUser } from "../../http";
import { AxiosResponse } from "axios";

type loginProps = {
  type: string;
  payload: SignIn;
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

const signInSignUp = all([takeLatest(SIGN_IN, getLogin)]);

export default signInSignUp;
