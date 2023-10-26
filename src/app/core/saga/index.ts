import { all } from "redux-saga/effects";
import signInSignUpSaga from "./login";
import roomsSaga from "./room";
import weboskcetSaga from "./weboskcet";

export default function* rootSaga() {
  yield all([signInSignUpSaga, roomsSaga, weboskcetSaga]);
}
