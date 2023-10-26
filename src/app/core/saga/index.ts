import { all } from "redux-saga/effects";
import signInSignUp from "./login";

export default function* rootSaga() {
  yield all([signInSignUp]);
}
